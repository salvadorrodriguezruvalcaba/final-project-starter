const express = require('express');
const UserController = require('../controllers/UserController');

const router = express.Router();

// Get information
router.get('/api/secret', UserController.show);

// Update information
router.post('/api/secret/:id', UserController.update);

// Delete a single Item
router.delete('/api/secret/:id', UserController.remove);

module.exports = router;
