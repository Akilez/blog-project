var User = require("../models/user.js");
var Auth = require("../models/auth.js");

module.exports = function(req, reply) {
  console.log(req.payload);
  var user = new User(req.payload);
  user.getUser(function(err, response) {
    console.log(err, response);
    if (response) {
      var hashed = require("../models/passwordHashIT.js")(req.payload.password, response.seed);
      console.log(hashed, response.password);
      if (hashed == response.password) {
        var auth = new Auth(response);
        auth.addAuth(function(err, response) {
          reply(response)
            .state("loggedIn", response, {
              isHttpOnly: true,
              encoding: 'base64json',
            });
        });
      }
    }
  });
}
