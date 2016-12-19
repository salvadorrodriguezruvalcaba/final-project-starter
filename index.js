// dotenv allows us to declare environment variables in a .env file, \
// find out more here https://github.com/motdotla/dotenv
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const axios = require('axios');

const port = process.env.PORT || 3001;

// Require our custom strategies
require('./services/passport');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/todo-list-app')
  .then(() => console.log('[mongoose] Connected to MongoDB'))
  .catch(() => console.log('[mongoose] Error connecting to MongoDB'));

const app = express();

const authenticationRoutes = require('./routes/authentication');
const listRoutes = require('./routes/list');
const itemRoutes = require('./routes/item');
// const UsersRoutes = require('./routes/UserRoutes');
const authStrategy = passport.authenticate('authStrategy', {
      session: false
});

app.use(bodyParser.json());
app.use('/api', authenticationRoutes);
app.use('/api/lists', authStrategy, listRoutes);
app.use('/api/items', authStrategy, itemRoutes);
// app.use('/api/secret', authStrategy, UsersRoutes);

app.use((err, req, res, next) => {
  return res.status(500).send(`Error: ${err}`);
});

app.get('/api/secret', authStrategy, function(req, res, next) {
  res.send(`User: ${req.user.username}`);
});

app.get('/movies', function(req, res, next) {
    axios.get(`http://www.omdbapi.com/?t=${attribute.title}&plot=short&r=json`)
    .then(resp => {
        return res.json(resp.data);
    })
    .catch(err => res.json(err));
});


app.listen(port, () => {
  console.log(`Listening on port:${port}`);
});
