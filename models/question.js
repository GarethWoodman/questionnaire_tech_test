var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var QuestionSchema = new Schema(
  {
    category_id: {type: Schema.Types.ObjectId, ref: 'Category', required: true},
    content: {type: String, required: true},
    incorrect_answers: [{type: String, required: true}],
    correct_answer: {type: String, required: true},
  }
);

module.exports = mongoose.model('Question', QuestionSchema);