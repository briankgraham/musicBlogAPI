var Bookshelf = require('bookshelf');
var path = require('path');

var db = Bookshelf.initialize({
  client: 'sqlite3',
  connection: {
    host: '127.0.0.1',
    user: 'your_database_user',
    password: 'password',
    database: 'kewlBlogsDB',
    charset: 'utf-8',
    filename: path.join(__dirname, '../db/kewlBlogs.sqlite')
  }
});

db.knex.schema.hasTable('users').then(function (exists) {
  if (!exists) {
    db.knex.schema.createTable('users', function (user) {
      user.increments('id').primary();
      user.string('username', 50);
      user.string('password', 50);
    }).then(function (table) {
      console.log("User table created successfully", table);
    });
  }
});

module.exports = db;
