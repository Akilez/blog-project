var async = require("async");
var sqlite = require("sqlite3");
var db;

var database = {
  connection: null,
  init: function(done) {
    db = new sqlite.Database("posts.db", function(err) {
      if(err) {
        console.error("Database not opened!");
        process.exit(1);
      }

      async.parallel([
        function(next) {
          db.run("CREATE TABLE IF NOT EXISTS posts (title, slug, date, content, author)", next);
        },
        function(next) {
          db.run("CREATE TABLE IF NOT EXISTS users (name, password, role)", next);
        }
      ], function(err) {
        if (done) done(err);
      });
    })
  }
}
