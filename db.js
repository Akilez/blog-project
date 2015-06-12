var async = require("async");
var sqlite = require("sqlite3");

var wrapper = {
  db: null,
  init: function(done) {
    wrapper.db = new sqlite.Database("posts.db", function(err) {
      var db = this;
      if(err) {
        console.error("Database not opened!");
        process.exit(1);
      }

      async.parallel([
        function(next) {
          db.run("CREATE TABLE IF NOT EXISTS posts (title, slug PRIMARY KEY, date, content, author)", next);
        },
        function(next) {
          db.run("CREATE TABLE IF NOT EXISTS users (name PRIMARY KEY, password, seed, role)", next);
        }
      ], function(err) {
        if (done) done(err);
      });
    })
  }
}

module.exports = wrapper;
