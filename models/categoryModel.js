const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: { type: String, required: true, maxLength: 100, unique: true },
  desc: { type: String, required: true, maxLength: 400 },
});

CategorySchema.virtual('url').get(function () {
  return `/inventory/category/${this._id}`;
});

//can use collate method to check duplciate category insensitive char

module.exports = mongoose.model('Category', CategorySchema);
