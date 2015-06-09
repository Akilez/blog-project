var hapi = require("hapi");
var Post = require("./models/post.js");
var server = new hapi.Server();
server.connection({ port: 8000});

server.start(function() {
  console.log("Server is started.")
});

server.views({
  path: "views/templates",
  layoutPath: "views",
  layout: "default",
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
    path: "/",
    method: "GET",
    handler: function(req, reply) {
      reply.view("index", {title: "Simple Blog Site"});
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
        reply.view("add-new", {err: "Post successfully created!"})
      })
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
