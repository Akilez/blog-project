module.exports = [
  {
    path:"/{title?}",
    method:"GET",
    handler: require("./handlers/home")
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
    handler: require("./handlers/add_new.js")
  },
  {
    path:"/login",
    method:"POST",
    handler: require("./handlers/login.js")
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
