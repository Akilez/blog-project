var Post = require("../models/post.js");
var auth = require("./authenticate.js");

module.exports = function(req, reply) {
  // decodes the username in cookie
  auth(req, reply, function(err, response) {
    if (response) {
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
    } else {
      reply.view("add-new", {
        msgs: [{
          err: "You are not logged in!",
          type: "danger"
        }],
        blog_title: req.payload.title,
        content: req.payload.content
      });

    }
  });
}
