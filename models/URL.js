const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Url = new Schema({
  original_url: { type: String, required: true },
  short_url: { type: Number, required: true, unique: true },
});

Url.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Url', Url);
