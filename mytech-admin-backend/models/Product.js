const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  productDescription: {
    type: String,
    required: true,
  },
  photo: [
  {
    path: {
      type: String,
      required: true
    }
  }
],

  basePrice: {
    type: Number,
    required: true,
  },
  discountPrecentage: {
    type: Number,
    default: 0,
  },
  taxClass: {
    type: String,
    required: true,
  },
  discountType: {
    type: String, 
    required: true,
  },
  vatAmount: {
    type: Number,
    default: 0,
  },
  sku: {
    type: String,
    required: true,
  },
  barcode: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  variations: [
    {
      variationType: { type: String, required: true },
      variation: { type: String, required: true },
    },
  ],
  height: {
    type: String,
    required: true,
  },
  weight: {
    type: String,
    required: true,
  },
  lenght: {
    type: String,
    required: true,
  },
  width: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    // type: mongoose.Schema.Types.ObjectId, 
    // ref: 'Category',
    required: false,
  },
  product_tags: {
    type: [String], 
    required: false,
  },

  status: {
    type: String, 
    // enum: ['active', 'inactive', 'draft'], 
    // default: 'active',
  },
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);
