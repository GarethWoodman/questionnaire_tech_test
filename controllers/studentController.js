
var Student = require('../models/student');

exports.student_login = function(req, res) {
  Student.find({pin: req.body.pin})
    .exec(function (err, student) {
      if(err || student.length === 0) { return res.redirect('/login') }
      req.session.currentStudent = student[0];
      res.redirect('/student_categories')
    })
}

