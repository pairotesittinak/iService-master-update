require('rootpath')();
var express = require('express');
var app = express();
var session = require('express-session');
var bodyParser = require('body-parser');
var busboyBodyParser = require('busboy-body-parser');
var server = require('http').Server(app);
var io = require('socket.io')(server);
var expressJwt = require('express-jwt');
var config = require('config.json');
var mongoose = require('mongoose'),
    _ = require('lodash');
 mongoose.connect('mongodb://localhost/my_db'); 


app.use(express.static(__dirname + "/home"));
app.use(busboyBodyParser());

	app.set('view engine', 'ejs');
	app.set('views', __dirname + '/views');
	
	app.use(function(req, res, next) {
	  res.header("Access-Control-Allow-Origin", "*");
	  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	  next();
	});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({ secret: config.secret, resave: false, saveUninitialized: true }));

// use JWT auth to secure the api
app.use('/api', expressJwt({ secret: config.secret }).unless({ path: ['/api/users/authenticate', '/api/users/register'] }));

// Check Connect Users
// io.on('connection', function (socket) {
//   socket.emit('news', { hello: 'world' });
//   socket.on('my other event', function (data) {
//     console.log(data);
//   });
// });
// io.on('connection', function(socket){
//   console.log('a user connected');
//   socket.on('disconnect', function(){
//     console.log('user disconnected');
//   });
// });



var numClients = 0;

io.on('connection', function(socket) {  
    numClients++;
    io.emit('stats', { numClients: numClients });

    console.log('Connected clients:', numClients);

    socket.on('disconnect', function() {
        numClients--;
        io.emit('stats', { numClients: numClients });

        console.log('Connected clients:', numClients);
    });
});



// routes
app.use('/login', require('./controllers/login.controller'));
app.use('/register', require('./controllers/register.controller'));
app.use('/app', require('./controllers/app.controller'));
app.use('/api/users', require('./controllers/api/users.controller'));



require('./app/pr/pr.route')(app);
require('./app/postUsers/postUsers.route')(app);
// make '/app' default route
app.get('/', function (req, res) {
    return res.redirect('/app');
});
server.listen(3000, function () {
    console.log('Server listening at http://' + server.address().address + ':' + server.address().port);
});


// start server
// var server = app.listen(3000, function () {
//     console.log('Server listening at http://' + server.address().address + ':' + server.address().port);
// });