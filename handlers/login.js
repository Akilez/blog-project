var User = require("../models/user.js");

module.exports = function(req, reply) {
  console.log(req.payload);
  var user = new User(req.payload);
  user.getUser(function(err, response) {
    console.log(err);
    var hashed = require("../models/passwordHashIT.js")(req.payload.password, response.seed);
    console.log(hashed, response.password);
    if (hashed == response.password) {
      reply({
        user: response.name,
        pass: true
      });
    } else {
      reply({
        user: response.name,
        pass: false
      });
    }
  });
}
