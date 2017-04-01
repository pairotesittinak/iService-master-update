// var schedule = require('node-schedule');
var fs = require('fs');
var mongoose = require('mongoose'),
    _ = require('lodash');
var Schema = mongoose.Schema;
var newsSchema = mongoose.Schema({
    topic: {type: Boolean, default: false },
    title: String,
    group_id: {type: String, default: 'all' },
    date: { 
      type: Date, 
      default: Date.now() 
    },
    author: String,
    userType: {type: String, default: 'all' },
    faculty: {type: String, default: 'all' },
    year: {type: String, default: 'all' },
    image: {type: Schema.Types.Object, ref: 'File' },
    description: String
    }, 
    {collection: 'News'}
    );
var newss = mongoose.model('newss', newsSchema);
var File = mongoose.model("File", new Schema({}, {strict: false}), "fs.files" );
var Grid = require('gridfs-stream');
Grid.mongo = mongoose.mongo;
var gfs = new Grid(mongoose.connection.db);

exports.create = function(req, res) {



var contentPush = req.body.title;
/////////Send Push//////////////

var sendNotification = function(data) {
  var headers = {
    "Content-Type": "application/json; charset=utf-8",
    "Authorization": "Basic MzU3Yzc4MzYtMmU3YS00MWZkLWFkYTMtM2M5MTAyOTMwYWRh"
  };

// var headers = req.body.title;
/////////Send Push//////////////
  var options = {
    host: "onesignal.com",
    port: 443,
    path: "/api/v1/notifications",
    method: "POST",
    headers: headers
  };
  
  var https = require('https');
  var req = https.request(options, function(res) {  
    res.on('data', function(data) {
      console.log("Response:");
      console.log(JSON.parse(data));
    });
  });
  
  req.on('error', function(e) {
    console.log("ERROR:");
    console.log(e);
  });
  
  req.write(JSON.stringify(data));
  req.end();
};

var message = { 
  app_id: "d0aa63da-446a-48bd-b039-2c5899d2da4a",
  contents: {"en": contentPush},
  included_segments: ["All"]
};

sendNotification(message);










var part = req.files.fieldname;

var item = {
  urlImage: "http://"+"localhost:3000/upload/" + part
};
      var dataFile = new File(item);
///////////////////SAVE///////////////////////////////
dataFile.save(function (err) {
  if (err) return handleError(err);
  var News1 = new newss({
        title: req.body.title,
        group_id: req.body.group_id,
        author: req.body.author,
        description: req.body.description,
        userType: req.body.userType,
        faculty: req.body.faculty,
        year: req.body.year,
        topic: req.body.topic,
        image: dataFile.urlImage

  });
  
  News1.save(function (err) {
    if (err) return handleError(err);
  });
});

///////////////////////////Send File //////////////////////////
                var writeStream = gfs.createWriteStream({
                    filename: part.name,
                    mode: 'w',
                    content_type:part.mimetype,
                    metadata: {
                    name: req.body.title
                      }
                });
 
                writeStream.on('close', function() {
                     return console.log('OK');
                     // res.redirect('/app/#/');
                });
                
                writeStream.write(part.data);
 
                writeStream.end();
 
};



exports.read = function(req, res) {
 
  gfs.files.find({ filename: req.params.filename }).toArray(function (err, files) {
 
      if(files.length===0){
      return res.status(400).send({
        message: 'File not found'
      });
      }
  
    res.writeHead(200, {'Content-Type': files[0].contentType});
    
    var readstream = gfs.createReadStream({
        filename: files[0].filename
    });
 
      readstream.on('data', function(data) {
          res.write(data);
      });
      
      readstream.on('end', function() {
          res.end();        
      });
 
    readstream.on('error', function (err) {
      console.log('An error occurred!', err);
      throw err;
    });
  });
 
};

    exports.showNews = function (req, res) {
    newss
    .find()
    .populate('File')
    .sort({date: -1})
    .exec(function (err, news) {
      if (err) return handleError(err);
      // console.log('The creator is %s', users);\
      console.log('User Get News')
      res.json(news);
    });
};

  exports.showNewsLib = function (req, res) {
    newss
    .find({group_id:'lib'})
    .populate('File')
    .sort({date: -1})
    .exec(function (err, news) {
      if (err) return handleError(err);
      // console.log('The creator is %s', users);\
      console.log('User Get News')
      res.json(news);
    });
};
  exports.showNewsIt = function (req, res) {
    newss
    .find({group_id:'it'})
    .populate('File')
    .sort({date: -1})
    .exec(function (err, news) {
      if (err) return handleError(err);
      // console.log('The creator is %s', users);\
      console.log('User Get News')
      res.json(news);
    });
};

 exports.getNews = function (req, res) {
    newss
    .findOne({
            title: req.param('title')
        })
    .exec(function (err, news) {
      if (err) {return handleError(err);}
      else{
      // console.log('The creator is %s', title);
      console.log('User Serch News')
      res.json(news);
    };  
  });
};



