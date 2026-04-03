const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { 
  getInventory, 
  addProduct, 
  updateProduct, 
  deleteProduct 
} = require('../controllers/inventoryController');

// @route    GET /api/inventory
// @desc     Get all products (with predictive logic)
router.get('/', auth, getInventory);

// @route    POST /api/inventory
// @desc     Add a new product
router.post('/', auth, addProduct);

// @route    PUT /api/inventory/:id
// @desc     Update product stock/details
router.put('/:id', auth, updateProduct);

// @route    DELETE /api/inventory/:id
// @desc     Remove a product
router.delete('/:id', auth, deleteProduct);

module.exports = router;