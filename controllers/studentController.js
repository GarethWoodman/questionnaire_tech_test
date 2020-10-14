const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

var Student = require('../models/student');

var async = require('async')

exports.student_login = function(req, res) {
  console.log(req.body.pin)
  Student.find({pin: req.body.pin})
    .exec(function (err, student) {
      if(err || student.length === 0) { return res.redirect('/login') }
      console.log(student)
      req.session.currentStudent = student[0];
      res.redirect('questions')
    })
}

