var Post = require("../models/post.js");

module.exports = function(req, reply) {
  console.log(req.payload);
  var post = new Post(req.payload);
  post.add(function(err, response) {
    var messages = [];
    if (err) {
      err.forEach(function(element, index, array) {
        messages.push({
          err: element,
          type: "danger"
        });
      });
    } else {
      messages.push({
        err: response,
        type: "success"
      });
    }
    
    reply.view("add-new", {
      msgs: messages,
      blog_title: req.payload.title,
      content: req.payload.content
    });
  });
}
