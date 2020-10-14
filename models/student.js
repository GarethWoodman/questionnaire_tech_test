var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var StudentSchema = new Schema(
  {
    pin: {type: Number, required: true, maxlength: 6},
    first_name: {type: String, required: true, maxlength: 100},
    family_name: {type: String, required: true, maxlength: 100},
  }
);

// Virtual for student's full name
StudentSchema
  .virtual('name')
  .get(function () {
    return this.first_name + ' ' + this.family_name;
  });

module.exports = mongoose.model('Student', StudentSchema);