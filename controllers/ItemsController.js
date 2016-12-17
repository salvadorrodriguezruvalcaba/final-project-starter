const ItemModel = require('../models/ItemModel');
const ListModel = require('../models/ListModel');

module.exports = {
  create(req, res, next) {
    const listId = req.body.list;
    const userId = req.user._id;

    // Declare a variable to set our created item to
    let newItem;

    // Declare a variable to set our found list on
    let foundList;

    // Make sure that the list we want this item to be attached to exist
    // and is owned by the current user
    ListModel.findOne({
      user: userId,
      _id: listId,
    })
      .exec()
      .then(list => {
        // If we didn't find a list, it either does not
        // exist, or the user does not own it
        if (!list) {
          return res.status(401).json('Cannot add item to this list');
        }

        // Assign our list to our foundList variable
        foundList = list;

        // Create a new ItemModel and save it
        return new ItemModel({
          text: req.body.text,
          user: userId,
          list: listId,
        }).save();
      })
      // After the item saves, update our list
      .then(item => {
        // Assign our item to our newItem variable
        newItem = item;

        // Update the list array of items with the new id
        foundList.items.push(newItem._id);

        // Save the list
        return foundList.save();
      })
      // After the list saves return our item
      .then(() => res.json(newItem))

      // Catch any error that occurs along the way
      .catch(next);
  },

  remove(req, res, next) {
    const userId = req.user._id;
    const itemId = req.params.id;

    let foundItem;

    ItemModel.findOne({ user: userId, _id: itemId })
      .exec()
      .then(item => {
        foundItem = item;
        return ListModel.findOne({user: userId, _id: item.list}).exec()
      })
      .then(list => {
        list.items = list.items.filter(item => item.equals(foundItem._id));
        return list.save();
      })
      .then(() => foundItem.remove())
      .then(item => res.json(item))
      .catch(next);

    // ItemModel.findOneAndRemove({ user: req.user._id, _id: req.params.id })
    //   .exec()
    //   .then(item => res.json(item))
    //   .catch(next);
  }
}
