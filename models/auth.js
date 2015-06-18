var Backbone = require("backbone");
var query = require("../db.js");

var ADD = "INSERT INTO auth (name, secret) VALUES ($name, $secret)";
var GET = "SELECT * FROM auth WHERE name = $name";
var DELETE = "DELETE FROM auth WHERE name = $name";

module.exports = Backbone.Model.extend ({
  defaults: {
    name: "",
    secret: ""
  },
  addAuth: function(complete) {
    var data = this.toJSON();
    this.deleteAuth(function(err, response) {
      var addStmt = query.db.prepare(ADD);
      addStmt.run({
        $name: data.name,
        $secret: data.secret
      }, function (err, response) {
        complete(err, data.name);
      });
    });    
  },
  getAuth: function (complete) {
    var data = this.toJSON();
    var stmt = query.db.prepare(GET);
    stmt.get({
      $name: data.name,
    }, function(err, response) {
      complete(err, response);
    });
  },
  deleteAuth: function (complete) {
    var data = this.toJSON();
    var stmt = query.db.prepare(DELETE);
    stmt.run({
      $name: data.name,
    }, function(err, response) {
      complete(err, response);
    });
  }
});
