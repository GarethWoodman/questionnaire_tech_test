var Category = require('../models/category');
var Result = require('../models/result');
var api = require('../api');

exports.category_selection = function(req, res) {
  console.log(req.body.category)
  Category.find({name: req.body.category})
    .exec(function (err, category) {
      if(err || category.length === 0) { return res.redirect('/categories') }
      api.updateCategory(category[0])
      res.redirect('/control_panel')
    })
}

exports.student_categories = function(req, res) {
  Category.find({})
    .exec(function (err, categoryList){
      if(err || categoryList.length === 0) { return res.redirect('/categories') }
      hasCompleted(req, res, categoryList);
    });
}

function hasCompleted(req, res, categoryList) {
  Result.find({category_id: api.currentCategory})
    .exec(function (err, results){
      let completed = false
      if(err || categoryList.length === 0) { return res.redirect('/categories') }
      results.forEach(function (result){ completed = (result.student_id == req.session.currentStudent._id) })
      res.render('student_categories', {categories: categoryList, liveCategory: api.currentCategory, completed: completed})
  });
}