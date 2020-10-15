var express = require('express');
var router = express.Router();

var student_controller = require('../controllers/studentController')
var category_controller = require('../controllers/categoryController')
var question_controller = require('../controllers/questionController')
var result_controller = require('../controllers/resultController')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Student Login form
router.get('/login', function(req, res, next) {
  res.render('login');
})

router.post('/login', student_controller.student_login)

// router.get('/questions', function(req, res, next) {
//   res.render('questions', { student: req.session.currentStudent, cateogry: req.session.currentCategory });
// })

router.get('/questions', question_controller.current_question);

router.get('/category_questions', question_controller.category);

router.get('/categories', function(req, res, next) {
  res.render('categories')
})

router.post('/categories', category_controller.category_selection);

router.get('/control_panel', function(req, res, next) {
  res.render('control_panel')
})

router.post('/submit', question_controller.submit)

router.get('/submitted', function(req, res, next) {
  res.render('answers_submitted')
})

router.get('/student_categories', category_controller.student_categories)

router.get('/results', result_controller.list)

module.exports = router;
