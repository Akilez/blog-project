var User = require("../models/user.js");
var Auth = require("../models/auth.js");

module.exports = function(req, reply) {
  // decodes the username in cookie
  var user = new User();
  var username = new Buffer(req.state.loggedIn, 'base64').toString().replace(/"/g, "");
  user.set("name", username)
  user.getUser(function(err, response) {
    var auth = new Auth(response);
    auth.deleteAuth(function(err, response) {
      reply.redirect("/")
        .state("loggedIn", "", {
          isHttpOnly: true,
          encoding: 'base64json',
        });
    });
  });
}
