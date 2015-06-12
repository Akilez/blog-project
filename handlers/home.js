var Post = require("../models/post.js");
var Posts = require("../models/posts.js");

module.exports = function(req, reply) {
  console.log(req.payload);
  if (req.params.title) {
    var post = new Post();
    post.getPost(req.params.title, function(response) {
      console.log("Got:", response);
      if (response) {
        reply.view("index", {blog: response});
      } else {
        reply.redirect("/", {
          msgs: [{
            err: "The requested post does not exist!!",
            type: "warning"
          }]
        });
      }
    });
  } else {
    var posts = new Posts();
    posts.getAll(function(response) {
      console.log("Got:", response);
      reply.view("index", {blog: response})
    });
  }
}
