const express = require('express');
const router = express.Router();
const GoodsIssue = require('../models/GoodIssue');

router.post('/add', async (req, res) => {
  try {
    const { goodIssueNum, selectedDate, itemCode, itemName, customerCode, customerName, quantity, uom, remarks } = req.body;

    if (!goodIssueNum || !selectedDate || !customerCode || !itemCode || !quantity || !uom) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Create a new Goods Issue
    const newGoodsIssue = new GoodsIssue({
      goodIssueNum,
      selectedDate,
      itemCode,
      itemName,
      customerCode,
      customerName,
      quantity,
      uom,
      remarks,
    });

    // Save Goods Issue to the database
    await newGoodsIssue.save();
    res.status(201).json({ message: 'Goods Issue entered successfully' });
  } catch (err) {
    console.error('Server error:', err.message);
    res.status(500).json({ error: 'Operation failed' });
  }
});

module.exports = router;
