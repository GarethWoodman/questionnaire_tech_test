
var Question = require('../models/question');
var Result = require('../models/result');

exports.category = function(req, res, next) {
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

exports.submit = function(req, res, next) {
  console.log(req.body.next)
  console.log(req.body.back)
  console.log(req.body.answer)
  
  var question = req.body.question;
  var correct_answer = req.body.correct_answer;

  console.log(question)
  console.log(correct_answer)
  // Checks if answer is correct and adds to score
  if(correct_answer === req.body.answer){
    req.session.score[question] = 1;
  } else {
    req.session.score[question] = 0;
  }

  console.log(req.session.questionNumber)

  if(req.session.questionNumber === 9){
    var result = new Result(
      {
          student_id: req.session.currentStudent._id,
          category_id: req.session.currentCategory._id,
          score: req.session.score,

      });

    console.log(result)

    result.save(function (err) {
      if (err) { return next(err); }
      console.log("submitted")
      res.redirect('/submitted');
  });
  } else {

    if(req.body.next){
      req.session.questionNumber += 1;
    } 
  
    if(req.body.back){
      req.session.questionNumber -= 1;
    }
  
    console.log(req.session.score)
  
    res.redirect('/questions')
  }

  
}

exports.current_question = function(req, res) {

  var i = req.session.questionNumber;
  var questions = req.session.questions;
  
  var prevQuestion = "";
  var nextQuestion = "";

  if(i < 1){
    prevQuestion = null;
  } else {
    prevQuestion = questions[i - 1]
  }

  if((i + 1) > 9){
    nextQuestion = null;
  } else {
    nextQuestion = questions[i + 1]
  }

  currentQuestion = questions[i]

  res.render('questions', {question: currentQuestion, next: nextQuestion, prev: prevQuestion})

};