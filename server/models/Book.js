const mongoose = require('mongoose');
const bookItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true }, 
  inStock: { type: Boolean, default: true }, 
});
const BookItem = mongoose.model('BookItem', bookItemSchema);

module.exports = BookItem;

