
var user = require('./postUsers.controller');

module.exports = function (app) {

app.route('/postNews')
    .post(user.createNews);
app.route('/postNews2')
    .post(user.create2);
    app.route('/postNews/:filename')
    .get(user.read);
//////////Show News/////////
app.route('/getNews')
    .get(user.getNews);
app.route('/getNews/it')
    .get(user.getNewsIt);
app.route('/getNews/lib')
    .get(user.getNewsLib);
///////////////Check USer Online//////////
app.route('/check/role/:username')
    .post(user.checkUsers);
app.route('/checkrole')
    .get(user.getUserOnline);




app.route('/postUsers')
    .post(user.createUsers);
// app.route('/postUsers')
//     .post(user.createUsers);
// app.route('/postUsers/:filename')
//     .get(user.read);
// app.route('/test')
// 	.get(user.test);
app.route('/all/users')
	.get(user.getUserAll);
app.route('/g/:username')
	.get(user.getUser);
app.route('/g/delete/:username')
	.delete(user.deleteUsers);
app.route('/g/update/:username')
	.post(user.updateUsers);
};