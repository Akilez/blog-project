var Backbone = require("backbone");
var query = require("../db.js");

var ADD = "INSERT INTO posts (title, slug, date, content, author) VALUES ($title, $slug, $date, $content, $author)"

module.exports = Backbone.Model.extend({
  defaults: {
    title: "",
    slug: "",
    content: "",
    author: "",
    date: ""
  },
  add: function(complete) {
    var data = this.toJSON();
    console.log(query);
    var stmt = query.db.prepare(ADD);
    var slug = data.title
                .toLowerCase()
                .replace(/'/g, '')
                .replace(/\W/g, "-");
    console.log(slug);
    stmt.run({
      $title: data.title,
      $slug: slug,
      $date: Date.now(),
      $content: data.content,
      $author: data.author
    }, function(err) {
      if (err) console.error(err);
      complete();
    })
  }
});
