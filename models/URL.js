const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Url = new Schema({
  original_url: { type: String, required: true },
  short_url: { type: Number, required: true, unique: true },
});

module.exports = mongoose.model('Url', Url);
