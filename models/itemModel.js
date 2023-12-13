const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name: { type: String, required: true },
  desc: { type: String, required: true, maxLength: 400 },
  category: [{ type: Schema.Types.ObjectId, ref: 'Category', required: true }],
  price: { type: Schema.Types.Decimal128, required: true },
  stock: { type: Number, default: 0 },
});

ItemSchema.virtual('url').get(function () {
  return `inventory/item/${this._id}`;
});

module.exports = mongoose.model('Item', ItemSchema);
