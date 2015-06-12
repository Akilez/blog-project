var Post = require("../models/post.js");
var Posts = require("../models/posts.js");
var User = require("../models/user.js");

module.exports = function(req, reply) {
  console.log(req.payload);
  var user = new User(req.payload);
  user.add(function(response) {
    console.log("Register response:", response)
    var hasErrors = false;
    response.forEach(function(element, index, array) {
      console.log("Message Element:", element);
      if (element.type != "success") {
        hasErrors = true;
      }
    });
    if (hasErrors) {
      reply.view("register", {
        msgs: response,
        name: req.payload.name
      });
    } else {
      var posts = new Posts();
      posts.getAll(function(posts) {
        reply.redirect("/", {
          blog: posts,
          msgs: response
        });
      });
    }
  });
}
