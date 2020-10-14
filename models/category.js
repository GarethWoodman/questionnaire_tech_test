var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CategorySchema = new Schema(
  {
    name: {type: String, required: true, maxlength: 30}
  }
);

module.exports = mongoose.model('Category', CategorySchema);