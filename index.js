var hapi = require("hapi");
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

server.route({
  path: "/",
  method: "GET",
  handler: function(req, reply) {
    reply.view("index", {title: "Simple Blog Site"});
  }
});

server.route({
  method: "GET",
  path: "/assets/{param*}",
  handler: {
    directory: {
      path: "public"
    }
  }
});
