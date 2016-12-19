const UserModel = require('../models/UserModel');

module.exports = {

  //Modigy information contact
  update(req, res, next) {
    const { nickname, name, username } = req.body;

    UserModel.findOneAndUpdate(
      { _id: req.params.id },
      { nickname, name, username },
      { new: true, runValidators: true }
    ).exec()
      .then(user => res.json(user))
      .catch(next);
  },

  //Display information of the current contact
  show(req, res, next) {
    UserModel.findOne({
      _id: req.user._id
    })
      .exec()
      .then(user => res.json(user))
      .catch(next);
  },

  // REMOVE YOUR ACCOUT!
  remove(req, res, next) {
    UserModel.findOneAndRemove({
      user: req.user._id,
      _id: req.params.id
    })
      .exec()
      .then(list => res.json(list))
      .catch(next);
  }
}
