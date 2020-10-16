var express = require('express');
var router = express.Router();
var api = require('../api');

var student_controller = require('../controllers/studentController')
var category_controller = require('../controllers/categoryController')
var question_controller = require('../controllers/questionController')
var result_controller = require('../controllers/resultController')

// Home Page
router.get('/', function(req, res, next) {
  api.get(req)
  res.render('index', { title: 'Express' });
});

// Student Login form
router.get('/login', function(req, res, next) {
  res.render('login');
})
router.post('/login', student_controller.student_login)

// Load Questions from category
router.get('/category_questions', question_controller.category);

// Question Form
router.get('/questions', question_controller.current_question);
router.post('/submit', question_controller.submit)

// Load submission page after all answers submitted
router.get('/submitted', function(req, res, next) {
  res.render('answers_submitted')
})

// Category Selection Form
router.get('/categories', function(req, res, next) {
  res.render('categories')
})
router.post('/categories', category_controller.category_selection);

// Load Category Selection for student
router.get('/student_categories', category_controller.student_categories)

// Load Control Panel for teacher
router.get('/control_panel', function(req, res, next) {
  res.render('control_panel')
})

// Load all student results along with their categories
router.get('/results', result_controller.list)

module.exports = router;
