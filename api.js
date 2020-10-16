var fetch = require('cross-fetch');
var Category = require('./models/category');

class Api {
  static async get() {
    this.URL = "https://api-questionnaire-test.herokuapp.com/objects/0"
    const response = await fetch(this.URL)
    this.data = await response.json()
    this.getCategory()
  }

  static async getCategory() {
    this.currentCategory = await Category.find({name: this.data.live_category})
    this.currentCategory = this.currentCategory[0]
  }

  static async updateCategory(category) {
    this.currentCategory = category
    
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