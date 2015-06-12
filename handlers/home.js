var Post = require("../models/post.js");
var Posts = require("../models/posts.js");

module.exports = function(req, reply) {
  console.log(req.payload);
  var posts = new Posts();
  posts.getAll(function(response) {
    //console.log("Got:", response);
    reply.view("index", {blog: response})
  });
}
