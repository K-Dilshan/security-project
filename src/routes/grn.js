const express = require('express');
const router = express.Router();
const GRN = require('../models/GRN');

// POST /api/grn/add
router.post('/add', async (req, res) => {
  console.log('Request body:', req.body);
  try {
    const { grnNumber, selectedDate, itemCode, itemName, vendorCode, vendorName,  quantity, uom, remarks } = req.body;

    if (!grnNumber || !selectedDate || !vendorCode || !vendorName || !itemCode || !quantity || !uom) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Create a new GRN
    const newGRN = new GRN({
      grnNumber,
      selectedDate,
      itemCode,
      itemName,
      vendorCode,
      vendorName,
      quantity,
      uom,
      remarks,
    });

    // Save GRN to the database
    await newGRN.save();
    res.status(201).json({ message: 'GRN entered successfully' });
  } catch (err) {
    console.error('Server error:', err.message);
    res.status(500).json({ error: 'Operation failed' });
  }
});

// GET /api/grn
router.get('/', async (req, res) => {
  try {
    const grns = await GRN.find(); 
    res.status(200).json(grns); 
  } catch (err) {
    console.error('Server error:', err.message);
    res.status(500).json({ error: 'Failed to fetch GRN entries' });
  }
});

module.exports = router;
