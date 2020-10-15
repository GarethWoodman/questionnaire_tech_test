
var Question = require('../models/question');

exports.submit = function(req, res) {
  console.log(req.body.next)
  console.log(req.body.bck)
  console.log(req.body.answer)
  console.log(req.body.question)
}

exports.current_question = function(req, res) {
  
  // if(!req.session.current_question) {
  //   req.session.current_question = 0
  // }

  // //current_question = question[0]
  // //next_question = question[1]
  // //prev_quesiton = nil

  // //current_question = question[1]
  // //next_question = question[2]
  // //prev_question = question[0]

  Question.findById(req.params.id)
    .exec(function (err, getQuestion) {
      if(err || getQuestion.length === 0) { return res.redirect('/login')}
      console.log(getQuestion)
      res.render('questions', {question: getQuestion} );
    })

};