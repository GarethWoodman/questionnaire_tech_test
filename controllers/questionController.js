var Question = require('../models/question');
var Result = require('../models/result');
var api = require('../api')

// Load questions based on current category in session
exports.category = function(req, res, next) {
  Question.find({category_id: api.currentCategory._id})
    .exec(function (err, questions) {
      if(err || questions.length === 0) { return res.redirect('/login')}
      storeSessions(req, questions)
      res.redirect('/questions')
    })
}

// Store submitted answers for each question
exports.submit = function(req, res, next) {  
  var question = req.body.question;
  var correct_answer = req.body.correct_answer;

  // If answer is correct store 1 to score, otherwise 0
  correct_answer === req.body.answer ? (req.session.score[question] = 1) : req.session.score[question] = 0;
    
  // If it's the last question store the result and go to the 'submtted' page
  // Else go to next or previous question based on user interaction
  if(req.session.questionNumber === 9){
    storeResult(req, res)
  } else {
    req.body.next ? (req.session.questionNumber += 1) : (req.session.questionNumber -= 1);
    res.redirect('/questions')
  }  
}

// Load current question in session
exports.current_question = function(req, res) {
  var i = req.session.questionNumber
  var currentQuestion = req.session.questions[i]
  var prevQuestion = i > 0

  res.render('questions', {question: currentQuestion, prev: prevQuestion})
};


// Helper Methods
function storeSessions(req, questions) {
  req.session.questions = questions
  req.session.questionNumber = 0
  req.session.score = {}
}

function storeResult(req, res) {
  var result = new Result(
    {
      student_id: req.session.currentStudent._id,
      category_id: api.currentCategory._id,
      score: req.session.score,
    });
    result.save(function (err) {
      if (err) { return next(err) }
      res.redirect('/submitted')
    })
}