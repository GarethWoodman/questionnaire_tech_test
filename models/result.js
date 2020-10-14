var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ResultSchema = new Schema (
  {
    student: {type: Schema.Types.ObjectId, ref: 'Student', required: true},
    student: {type: Schema.Types.ObjectId, ref: 'Category', required: true},
    score: {type: Number},
  }
)

module.exports = mongoose.model('Result', ResultSchema);