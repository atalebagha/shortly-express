var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

var User = db.Model.extend({
  tableName: 'users',
  initialize:  function () {
    this.on('creating', this.hashPassword, this);
  },
  links:  function () {
    return this.hasMany(Link);
  },
  hashPassword: function (model, attr, options) {
    return new Promise (function (resolve, reject){
      bcrypt.hash(model.attributes.password, 8, function (err, hash) {
        if (err) reject(err);
        model.set('password', hash);
        console.log(hash);
        resolve(hash);
      });

    })
  }

});

module.exports = User;
