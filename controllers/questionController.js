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
  console.log(correct_answer)
  console.log(req.body.answer)

  // If answer is correct store 1 to score, otherwise 0
  correct_answer === req.body.answer ? (req.session.score[question] = 1) : req.session.score[question] = 0;
  console.log(req.session.score)
    
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

  // Shuffle incorrect answers and add correct answer to an array
  let currentAnswers = Object.create(currentQuestion.incorrect_answers);
  currentAnswers.push(currentQuestion.correct_answer)
  currentAnswers = currentAnswers.sort(() => Math.random() - 0.5)

  console.log('currentQuestion After', currentQuestion)
  console.log('answers', currentAnswers)


  res.render('questions', {question: currentQuestion, answers: currentAnswers, prev: prevQuestion})
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