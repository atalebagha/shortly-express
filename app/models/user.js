var db = require('../config');
var Promise = require('bluebird');
var bcrypt = Promise.promisifyAll(require('bcrypt'));

var User = db.Model.extend({
  tableName: 'users',
  initialize:  function () {
    this.on('saving', this.hashPassword, this);
  },

  links:  function () {
    return this.hasMany(Link);
  },
  hashPassword: function(model, attrs, options) {
    return new Promise( function (resolve, reject) {
      bcrypt.hash(model.attributes.password, 7, function (err, hash) {
        if( err ) reject(err);
        model.set('password', hash);
        resolve(hash); // data is created only after this occurs
      });
    });
  }
});

module.exports = User;
