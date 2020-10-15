
var Result = require('../models/result');
var Student = require('../models/student');
var Category = require('../models/category');

var async = require('async')

exports.list = function(req, res) {

  var category_students = []  

  async.parallel({
    students: function(callback) {
      Student.find({}, callback);
    },
    results: function(callback) {
      Result.find({}, callback);
    },
    categories: function(callback) {
      Category.find({}, callback);
    }
  },  function(err, student_results) {

        var student_list = [];
        var result_list = [];

        student_results.categories.forEach(function (category) {
          student_list = [];
          result_list = [];
          
          (student_results.results).forEach(function (result) {
            if(JSON.stringify(result.category_id) === JSON.stringify(category._id)){
              result_list.push(JSON.stringify(result.student_id))
            }
          });

          console.log('result_list', result_list)

          student_results.students.forEach(function (student) {
            if(result_list.includes(JSON.stringify(student._id))){
              student_list.push({name: student.name, submitted: "Yes"})
            } else {
              student_list.push({name: student.name, submitted: "No"})
            }
          })
          console.log('category', category)
          category_students.push({category: category.name, students: student_list});
        });
        
        console.log(category_students)

        res.render('results', { studentCategories: category_students, error: err, liveCategory: req.session.currentCategory});
  });
}