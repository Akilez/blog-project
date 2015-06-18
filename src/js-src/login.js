var LoginModel = Backbone.Model.extend({
  defaults: {
    user: ''
  },
  authenticate: function () {
    console.log("Authenticating....");
    var model = this;
    $.ajax({
      url: "/auth",
      method: "POST",
      datatype: "json",
    }).done(function(response) {
      console.log(response);
      model.set("user", response);
    });
  },
  loginCmd: function() {
    var model = this;
    $.ajax({
      url: "/login",
      method: "POST",
      datatype: "json",
      data: $(".login form").serializeArray()
    }).done(function(response) {
      console.log(response);
      model.set("user", response);
    });
  }
});

var login = new LoginModel();
login.authenticate();

var LoginView = Backbone.View.extend({
  el: ".login",
  template: _.template($("#login-template").html()),
  initialize: function() {
    this.listenTo(this.model, "change:user", this.render);
  },
  events: {
    "click .submitLogin": "loginEvent",
  },
  loginEvent: function(e) {
    e.preventDefault();
    console.log("Attempting Login...");
    this.model.loginCmd();
  },
  render: function() {
    var data = this.model.toJSON();
    this.$el.html(this.template(data));
  }
});

var view = new LoginView({
  model: login
});
view.render();
