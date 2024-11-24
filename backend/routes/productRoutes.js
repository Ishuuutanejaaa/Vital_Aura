// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const Medicine = require('../model/Medicine');

// Get all products
router.get('/products', async (req, res) => {
  try {
    const products = await Medicine.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Search products
router.get('/search', async (req, res) => {
  const { query } = req.query; // query will hold the search term

  try {
    const products = await Medicine.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
      ],
    });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
