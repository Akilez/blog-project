var Backbone = require("backbone");
var query = require(../db.js);

var ADD = "SELECT INTO users (name, password, seed, role) VALUES ($name, $password, $seed, $role)";

module.exports = Backbone.Model.extend ({
  defaults {
    name: "",
    password: "",
    role: "",
    seed: "dlkgf9u4kmnvxd9fo8y4o5kncff98dxuyr4ok5n908dfn"
  },
  add: function(complete) {
    var data = this.toJSON();
    var stmt = query.db.prepare(ADD);
    var hashed = require(./passwordHashIT.js)(data.password, data.seed);
    stmt.run({
      $name: data.name,
      $password: hashed,
      $seed: data.seed,
      $role: data.role
    }, function (err) {
      if (err) console.log(err);
      complete(err):
    });
  }
});
