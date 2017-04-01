
var user = require('./index.controller');

module.exports = function (app) {

app.route('/upload')
    .post(user.create);
app.route('/showNews')
    .get(user.showNews);
app.route('/showNews/it')
    .get(user.showNewsIt);
app.route('/showNews/lib')
    .get(user.showNewsLib);
app.route('/upload/:filename')
    .get(user.read);
app.route('/showNews/:title')
    .get(user.getNews);


};

