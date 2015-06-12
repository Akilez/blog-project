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
      results.forEach(function(element, index, array) {
        var newDate = new Date(element.date);
        element.date = newDate.toLocaleString();
      });
      complete(results);
    });
  }
});
