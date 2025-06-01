const mongoose = require('mongoose');

const GoodsIssueSchema = new mongoose.Schema({
    goodIssueNum: {
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
    customerCode: {
      type: String,
      required: true,
    },
    customerName: {
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
  
  module.exports = mongoose.model('GoodIssue', GoodsIssueSchema);