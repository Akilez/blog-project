var LoginModel = Backbone.Model.extend({
  defaults: {
    user: '',
    validLogin: "true"
  },
  logoutCmd: function() {
    this.set("user", '');
  },
  loginCmd: function() {
    var model = this;
    $.ajax({
      url: "/login",
      method: "POST",
      datatype: "json",
      data: $(".login form").serializeArray()
    })
    .done(function(response) {
      console.log(response);
      if (response.pass) {
        model.set("user", response.user);
      } else {
        model.set("validLogin", "false");
      }
    });
  }
});

var login = new LoginModel();

login.on("change:user", function(model, newValue) {
  console.log("The new value is:", newValue);
});

var LoginView = Backbone.View.extend({
  el: ".login",
  template: _.template($("#login-template").html()),
  initialize: function() {
    this.listenTo(this.model, "change:user", this.render);
  },
  events: {
    "click .submitLogin": "loginEvent",
    "click .logout": "logoutEvent"
  },
  loginEvent: function(e) {
    e.preventDefault();
    console.log("Attempting Login...");
    this.model.loginCmd();
  },
  logoutEvent: function(e) {
    e.preventDefault();
    this.model.logoutCmd();
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
