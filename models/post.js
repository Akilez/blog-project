var Backbone = require("backbone");
var query = require("../db.js");

var ADD = "INSERT INTO posts (title, slug, date, content, author) VALUES ($title, $slug, $date, $content, $author)";
var DELETE = "DELETE * FROM posts WHERE slug = $slug"
var SINGLE = "SELECT * FROM posts WHERE slug = $slug";

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
    if (data.title != "" && data.content != "") {
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
        if (!err) {
          complete(null, "Post sucessfully created!!");
        } else if(err.errno == 19) {
          complete(["Post title must be unique!"], null);
        }
      });
    } else {
      var errors = [];
      if (data.title == "") {
        errors.push("Title is blank, try again!");
      }
      if (data.content == "") {
        errors.push("Content is blank, try again!");
      }
      complete(errors, null)
    }
  },
  getPost: function(slug, complete) {
    console.log(query);
    var stmt = query.db.prepare(SINGLE);
    stmt.get({
      $slug: slug
    }, function(err, response) {
      if (err) console.error(err);
      if (response) {
        var newDate = new Date(response.date);
        response.date = newDate.toLocaleString();
      }
      complete(null, response);
    });
  }
});
