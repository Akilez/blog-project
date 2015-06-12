var Post = require("../models/post.js");

module.exports = function(req, reply) {
  console.log(req.payload);
  var post = new Post(req.payload);
  post.add(function(response) {
    //console.log(response);
    reply.view("add-new", {
      msgs: response,
      blog_title: req.payload.title,
      content: req.payload.content
    });
  });
}
