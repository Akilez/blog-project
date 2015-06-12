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
          complete({
            err: "Post sucessfully created!!",
            type: "success"
          });
        } else if(err.errno == 19) {
          complete({
            err: "Post title must be unique!",
            type: "warning"
          });
        }
      });
    } else {
      var errors = [];
      if (data.title == "") {
        errors.push({
          err: "Title is blank, try again!",
          type: "danger"
        });
      }
      if (data.content == "") {
        errors.push({
          err: "Content is blank, try again!",
          type: "danger"
        });
      }
      complete(errors)
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
        var newDate = new Date(response[0].date);
        response[0].date = newDate.toLocaleString();
      }
      complete(response);
    });
  }
});
