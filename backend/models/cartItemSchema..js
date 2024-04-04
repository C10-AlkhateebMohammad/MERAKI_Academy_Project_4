const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
 
  createdAt: {
    type: Date,
    default: Date.now
  },
  
  userId:{
    type:mongoose.Schema.Types.ObjectId,ref : "User",
  }
});

module.exports = mongoose.model("Cart", cartItemSchema);