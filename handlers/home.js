var Post = require("../models/post.js");
var Posts = require("../models/posts.js");

module.exports = function(req, reply) {
  console.log(req.params.title);
  if (req.params.title) {
    var post = new Post();
    post.getPost(req.params.title, function(err, response) {
      console.log("Got:", response);
      if (response) {
        reply.view("index", {blog: response});
      } else {
        reply.view("404");
      }
    });
  } else {
    var posts = new Posts();
    posts.getAll(function(err, response) {
      console.log("Got all:", response);
      reply.view("index", {blog: response})
    });
  }
}
