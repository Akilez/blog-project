var User = require("../models/user.js");
var Auth = require("../models/auth.js");

module.exports = function(req, reply, callback) {
  // decodes the username in cookie
  var user = new User();
  var username = new Buffer(req.state.loggedIn, 'base64').toString().replace(/"/g, "");
  //console.log(username);
  user.set("name", username)
  user.getUser(function(err, response) {
    console.log("User to authenticate:", response);
    var auth = new Auth(response);
    auth.getAuth(function(err, response) {
      if (callback) {
        console.log("issueing callback")
        callback(err, response);
      } else {
        if (response) {
          reply(response.name)
          .state("loggedIn", response.name, {
            isHttpOnly: true,
            encoding: 'base64json',
          });
        }
      }
    });
  });
}
