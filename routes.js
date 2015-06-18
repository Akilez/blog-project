module.exports = [
  {
    path:"/{title?}",
    method:"GET",
    handler: require("./handlers/home")
  },
  {
    path:"/add",
    method:"GET",
    handler: require("./handlers/add.js")
  },
  {
    path:"/add",
    method:"POST",
    handler: require("./handlers/add_new.js")
  },
  {
    path:"/auth",
    method:"POST",
    handler: require("./handlers/authenticate.js")
  },
  {
    path:"/login",
    method:"POST",
    handler: require("./handlers/login.js")
  },
  {
    path:"/logout",
    method:"GET",
    handler: require("./handlers/logout.js")
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
    handler: require("./handlers/register.js")
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
]
