var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ResultSchema = new Schema (
  {
    student_id: {type: Schema.Types.ObjectId, ref: 'Student', required: true},
    category_id: {type: Schema.Types.ObjectId, ref: 'Category', required: true},
    score: {type: Object},
  }
)

module.exports = mongoose.model('Result', ResultSchema);