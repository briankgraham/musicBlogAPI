var db = require('./config');
var Promise = require('bluebird');

var User = db.Model.extend({
  tableName: 'users'
});

module.exports = User;
