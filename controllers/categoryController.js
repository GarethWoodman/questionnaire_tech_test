
var Category = require('../models/category');

exports.category_selection = function(req, res) {
  console.log(req.body.category)
  Category.find({name: req.body.category})
    .exec(function (err, category) {
      console.log(category)
      if(err || category.length === 0) { return res.redirect('/categories') }
      req.session.currentCategory = category[0]
      res.redirect('/control_panel')
    })
}

exports.student_categories = function(req, res) {
  Category.find({})
    .exec(function (err, categoryList){
      if(err || categoryList.length === 0) { return res.redirect('/categories') }
      res.render('student_categories', {categories: categoryList, liveCategory: req.session.currentCategory})
    });
}