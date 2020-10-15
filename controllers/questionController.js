
var Question = require('../models/question');

exports.submit = function(req, res) {
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

  if(req.session.questionNumber === 9){
    //redirect to submission page;
  }

  if(req.body.next){
    req.session.questionNumber += 1;
  } 

  if(req.body.back){
    req.session.questionNumber -= 1;
  }

  console.log(req.session.score)

  res.redirect('/questions')
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