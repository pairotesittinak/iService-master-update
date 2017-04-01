// var users = require('./index.controller');


module.exports = function (app) {
         app.route('/app/#/home')
         .get(users.getUser);

};