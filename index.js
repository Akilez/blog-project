var hapi = require("hapi");
var Post = require("./models/post.js");
var Posts = require("./models/posts.js");
var server = new hapi.Server();
server.connection({ port: 8000});

server.start(function() {
  console.log("Server is started.")
});

server.views({
  path: "views/templates",
  layoutPath: "views",
  layout: "default",
  layoutKeyword: "pageContent",
  engines: {
    html: require("handlebars")
  },
  isCached:false,
  context: {
    dev: true
  }
});

server.route([
  {
    path:"/{title?}",
    method:"GET",
    handler: function(req, reply) {
      console.log(req.payload);
      if (req.params.title) {
        var post = new Post();
        post.getPost(req.params.title, function(response) {
          console.log("Got:", response);
          if (response) {
            reply.view("index", {blog: response});
          } else {
            reply.view("blog", {err: "The requested post does not exist!!"});
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
  },
  {
    path:"/add",
    method:"GET",
    handler: function(req, reply) {
      reply.view("add-new")
    }
  },
  {
    path:"/add",
    method:"POST",
    handler: function(req, reply) {
      console.log(req.payload);
      var post = new Post(req.payload);
      post.add(function() {
        reply.view("add-new", {
          msgs: [
            {err: "Post successfully created!", type: "success"}
          ]
        });
      });
    }
  },
  {
    path:"/register",
    method:"GET",
    handler: function(req, reply) {
      reply.view("register")
    }
  },
  {
    path:"/register",
    method:"POST",
    handler: function(req, reply) {
      console.log(req.payload);
      var post = new Post(req.payload);
      post.add(function(error) {
        if (error) {
          reply.view("index", {
            msgs: [
              {err: error, type: "danger"}
            ]
          });
        } else {
          reply.view("index", {
            msgs: [
              {err: "Registered Successfully!", type: "success"}
            ]
          });
        }
      });
    }
  },
  {
    method: "GET",
    path: "/assets/{param*}",
    handler: {
      directory: {
        path: "public"
      }
    }
  }
]);

var query = require("./db.js");
query.init(function(){
  console.log("Database is Running!");
})
