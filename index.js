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
  layoutKeyword: "pageContent",
  engines: {
    html: require("handlebars")
  },
  isCached:false,
  context: {
    dev: true
  }
});

server.route(require("./routes.js"));

var query = require("./db.js");
query.init(function(){
  console.log("Database is Running!");
})
