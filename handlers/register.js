var Post = require("../models/post.js");
var Posts = require("../models/posts.js");
var User = require("../models/user.js");

module.exports = function(req, reply) {
  console.log(req.payload);
  var user = new User(req.payload);
  user.add(function(err, response) {
    var messages = [];
    if (err) {
      err.forEach(function(element, index, array) {
        messages.push({
          err: element,
          type: "danger"
        });
      });

      reply.view("register", {
        msgs: messages,
        name: req.payload.name
      });
    } else {
      messages.push({
        err: response,
        type: "success"
      });
      var posts = new Posts();
      posts.getAll(function(posts) {
        reply.view("index", {
          blog: posts,
          msgs: messages
        });
      });
    }
  });
}
