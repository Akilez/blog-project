var Post = require("../models/post.js");
var Auth = require("./authenticate.js");

module.exports = function(req, reply) {
  Auth(req, reply, function(err, response) {
    console.log("Authenticating...", response);
    if (response) {
      reply.view("add-new");
    } else {
      reply.view("index", {
        msgs: [{
          err: "Please log in first!",
          type: "warning"
        }]
      });
    }
  });
}
