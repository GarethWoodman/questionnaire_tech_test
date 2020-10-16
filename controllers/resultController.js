var Result = require('../models/result');
var Student = require('../models/student');
var Category = require('../models/category');

var async = require('async')

exports.list = function(req, res) {
  var categoryResults = []  

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
  },  function(err, studentResults) {

        // Loop through each category
        studentResults.categories.forEach(function (category) {
          var studentList = [];
          var resultList = [];
          
          // Push result for category in resultList
          (studentResults.results).forEach(function (result) {
            if(JSON.stringify(result.category_id) === JSON.stringify(category._id)){
              resultList.push(JSON.stringify(result.student_id))
            }
          });

          // If student has submitted answers for category store in studentList
          studentResults.students.forEach(function (student) {
            if(resultList.includes(JSON.stringify(student._id))){
              studentList.push({name: student.name, submitted: "Yes"})
            } else {
              studentList.push({name: student.name, submitted: "No"})
            }
          })

          // Push Category along with list of students and their results
          categoryResults.push({category: category.name, students: studentList});
        });
      
        res.render('results', { studentCategories: categoryResults, error: err, liveCategory: req.session.currentCategory});
  });
}