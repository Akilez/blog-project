var Backbone = require("backbone");
var Post = require("./post");
var query = require("../db.js");

var ALL = "SELECT * FROM posts ORDER BY date DESC"

module.exports = Backbone.Collection.extend({
  model: Post,
  getAll: function(complete) {
    var self = this;
    var stmt = query.db.prepare(ALL);
    stmt.all(function(err, results){
      self.add(results);
      self.each(function(post) {
        console.log(post.get("date"));
        var jDate = Date(post.get("date"));
        console.log(jDate);
        post.set("date", jDate.toString());
      });
      complete(results);
    });
  }
});
