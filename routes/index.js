var express = require('express');
var router = express.Router();

var student_controller = require('../controllers/studentController')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Student Login form
router.get('/login', function(req, res, next) {
  res.render('login');
})

router.post('/login', student_controller.student_login)

router.get('/questions', function(req, res, next) {
  res.render('questions', { student: req.session.currentStudent });
})

module.exports = router;
