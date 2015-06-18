var Backbone = require("backbone");
var query = require("../db.js");

var ADD = "INSERT INTO users (name, password, seed, role) VALUES ($name, $password, $seed, $role)";
var GET = "SELECT * FROM users WHERE name = $name";

module.exports = Backbone.Model.extend ({
  defaults: {
    name: "",
    password: "",
    role: "",
    seed: "dlkgf9u4kmnvxd9fo8y4o5kncff98dxuyr4ok5n908dfn"
  },
  add: function(complete) {
    var data = this.toJSON();
    if (!data.name || !data.password) {
      var messages=[];
      if (!data.name) {
        messages.push("Username cannot be blank!");
      }
      if (!data.password) {
        messages.push("Password cannot be blank!");
      }
      complete(messages, null);
      return;
    }
    var stmt = query.db.prepare(ADD);
    var hashed = require("./passwordHashIT.js")(data.password, data.seed);
    stmt.run({
      $name: data.name,
      $password: hashed,
      $seed: data.seed,
      $role: data.role
    }, function (error) {
      if (error) {
        console.log(error);
        if (error.errno == 19) {
          complete(["That username is already taken!"], null);
        } else {
          complete([error], null);
        }
      } else {
        complete(null, ["User Registered Successfully!"]);
      }
    });
  },
  getUser: function (complete) {
    var data = this.toJSON();
    var stmt = query.db.prepare(GET);
    stmt.get({
      $name: data.name,
    }, function(err, result) {
      complete(err, result);
    });
  }
});
