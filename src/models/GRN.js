const mongoose = require('mongoose');

const GRNSchema = new mongoose.Schema({
  grnNumber: {
    type: String,
    required: true,
  },
  selectedDate: {
    type: Date,
    default: Date.now,
  },
  itemCode: {
    type: String,
    required: true,
  },
  itemName: {
    type: String,
    required: true,
  },
  vendorCode: {
    type: String,
    required: true,
  },
  vendorName: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  uom: {
    type: String,
    required: true,
  },
  remarks: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('GRN', GRNSchema);
