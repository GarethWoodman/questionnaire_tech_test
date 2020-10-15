
var Result = require('../models/result');
var Student = require('../models/student');

var async = require('async')

exports.list = function(req, res) {

  var result_list = []
  var student_list = []

  async.parallel({
    students: function(callback) {
      Student.find({}, callback);
    },
    results: function(callback) {
      Result.find({category_id: req.session.currentCategory._id}, callback);
    }
  },  function(err, student_results) {
        (student_results.results).forEach(function (result) {
          result_list.push(JSON.stringify(result.student_id))
        });

        student_results.students.forEach(function (student) {
          if(result_list.includes(JSON.stringify(student._id))){
            student_list.push({name: student.name, submitted: "Yes"})
          } else {
            student_list.push({name: student.name, submitted: "No"})
          }
        })

        console.log(student_list)

        res.render('results', { students: student_list, error: err});
  });
}