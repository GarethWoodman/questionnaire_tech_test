
var Student = require('../models/student');
var Question = require('../models/question');
const { detectSeries } = require('async');

exports.student_login = function(req, res) {
  console.log(req.body.pin)
  Student.find({pin: req.body.pin})
    .exec(function (err, student) {
      if(err || student.length === 0) { return res.redirect('/login') }
      console.log(student)
      req.session.currentStudent = student[0];
    })

  Question.find({category_id: req.session.currentCategory._id})
    .exec(function (err, questions) {
      if(err || questions.length === 0) { return res.redirect('/login')}
      console.log(questions)
      req.session.questions = questions
      req.session.questionNumber = 0
      req.session.score = {}
      res.redirect('/questions')
    })
}

