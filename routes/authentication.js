const express = require('express');
const router = express.Router();
const User = require('../models/UserModel');
const bcrypt = require('bcrypt-nodejs');

const jwt = require('jwt-simple');
const passport = require('passport');
const signinStrategy = passport.authenticate('signinStrategy', {
      session: false
});

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ userId: user.id, iat: timestamp }, process.env.SECRET);
}

router.post('/signin', signinStrategy, function(req, res, next) {

  res.json({ token: tokenForUser(req.user) });

  // If no username or password was supplied return an error
  // const { username, password } = req.body;
  //
  //
  // if (!username || !password) {
  //   return res.status(422)
  //     .json({ error: 'You must provide an username and password' });
  // }
  //
  // User.findOne({ username }).exec()
  //   .then((existingUser) => {
  //     // If the user NO exist return an error on sign up
  //     if (!existingUser) {
  //       return res.status(422).json({ error: 'Username do not exist' });
  //     }
  //
  //     // If the user exist so we can continue with the password validation
  //     if (existingUser) {
  //       // If the user exist create the user to compare with the database
  //       // User bcrypt to has their password
  //       bcrypt.genSalt(10, function(salt) {
  //         bcrypt.hash(password, salt, null, function(err, hashedPassword) {
  //
  //           if (err) {
  //             return next(err);
  //           }
  //           // Create a new user with the supplied username, and the hashed password
  //           const user = new User({ username, password: hashedPassword });
  //           // compare the users
  //           if (!existingUser.password !== user) {
  //             return res.status(422)
  //               .json({ error: 'The username or password is incorrect!' });
  //           }
  //        });
  //      });
  //      }
  //    })
  //    .catch(err => next(err));

});


router.post('/signup', function(req, res, next) {

  const { nickname, username, password } = req.body;

  // If no username or password was supplied return an error
  if (!username || !password) {
    return res.status(422)
      .json({ error: 'You must provide an username and password' });
  }

  // Look for a user with the current user name

  User.findOne({ username }).exec()
    .then((existingUser) => {
      // If the user exist return an error on sign up
      if (existingUser) {
        return res.status(422).json({ error: 'Username is in use' });
      }

      // If the user does not exist create the user
      // User bcrypt to has their password, remember, we never save plain text passwords!
      bcrypt.genSalt(10, function(salt) {
        bcrypt.hash(password, salt, null, function(err, hashedPassword) {

          if (err) {
            return next(err);
          }

          // Create a new user with the supplied username, and the hashed password
          const user = new User({ nickname, username, password: hashedPassword });

          // Save and return the user
          user.save()
            .then(user => res.json({ token: tokenForUser(user) }));
            // .then(user => res.json(user));

       });
     });
    })
    .catch(err => next(err));
});

module.exports = router;
