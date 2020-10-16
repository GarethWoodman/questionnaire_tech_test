var fetch = require('cross-fetch');
var Category = require('./models/category');

class Api {
  static async get(req) {
    this.URL = "https://api-questionnaire-test.herokuapp.com/objects/0"
    const response = await fetch(this.URL)
    this.data = await response.json()
    this.getCategory(req)
  }

  static async getCategory(req) {
    console.log(this.data.live_category)
    Category.find({name: this.data.live_category})
      .exec(function (err, category) {
        console.log(category)
        req.session.currentCategory = category[0]
      })
  }

  static async updateCategory(category) {
    fetch(this.URL, {
      method: 'PATCH',
      body: JSON.stringify({
        "id": 0,
        "live_category": category.name
      }),
      headers: {
        "Content-type": "application/json",
      }
    })
  }
}

module.exports = Api;