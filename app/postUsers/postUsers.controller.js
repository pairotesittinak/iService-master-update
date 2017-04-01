var fs = require('fs');
var mongoose = require('mongoose'),
    _ = require('lodash');
var Schema = mongoose.Schema;

/////////////// Model ///////////////////
var ionicUsersSchema = mongoose.Schema({
    username: String,
    password: String,
    firstname: String,
    lastname: String,
    faculty: String,
    year: String,
    userType: String,
    ckLogin: {
      type: Boolean,
      default: false
    },
    date: { 
      type: Date, 
      default: Date.now() 
    },
    // Photo: {type: Schema.Types.Object, ref: 'File' }
    }, 
    {collection: 'ionicUsers'}
    );
var ionicUsers = mongoose.model('ionicUsers', ionicUsersSchema);
///////////////////////MODEL NEWS///////////////////////////


var postNewsSchema = mongoose.Schema({
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
    // image: {type: Schema.Types.Object, ref: 'File' },
    image:{ type: String, required: true },
    description: String
    }, 
    {collection: 'News'}
    );
var News = mongoose.model('News', postNewsSchema);


///////////////////////////////////////////////////////


var File = mongoose.model("FileIonic", new Schema({}, {strict: false}), "fs.files" );
var Grid = require('gridfs-stream');
Grid.mongo = mongoose.mongo;
var gfs = new Grid(mongoose.connection.db);


exports.createNews = function(req, res) {
  var News1 = new News({
        title: req.body.title,
        group_id: req.body.group_id,
        author: req.body.author,
        description: req.body.description,
        userType: req.body.userType,
        faculty: req.body.faculty,
        year: req.body.year,
        topic: req.body.topic,
        image: req.body.image
  });
  
  News1.save(function (err, data) {
    if (err) return handleError(err);
    console.log('ok', data);
  });
};






exports.create2 = function(req, res) {




var part = req.files.fieldname;

var item = {
  urlImage: "http://localhost:3000/postNews/" + part
};
      var dataFile = new File(item);
///////////////////SAVE///////////////////////////////
dataFile.save(function (err) {
  if (err) return handleError(err);
  var News1 = new News({
        title: req.body.title,
        group_id: req.body.group_id,
        author: req.body.author,
        description: req.body.description,
        userType: req.body.userType,
        faculty: req.body.faculty,
        year: req.body.year,
        topic: req.body.topic,
        image: req.body.imageUrl

  });
  
  News1.save(function (err, data) {
    if (err) return handleError(err);
    console.log(data);
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



    exports.createUsers = 	function(req, res) {
      var item = {
     username: req.body.username,
      password: req.body.password,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      faculty: req.body.faculty,
      year: req.body.year,
      userType: req.body.userType
      };

      var data = new ionicUsers(item);
      data.save(function (err) {
  if (err) return handleError(err);
});
    res.send(item);
};

//////////////check Online//////////////////
exports.checkUsers = function(req, res){
  var ck = req.body.ckLogin;
ionicUsers.update({username:req.param('username')}, { $set: { ckLogin : ck }}, function (err, user) {
  if (err) return handleError(err);
  console.log(user);
  console.log('OK');
});    
}
exports.getUserOnline = function (req, res) {
    ionicUsers
    .find({
            ckLogin : true
        })
    .count()
    .exec(function (err, users) {
      if (err) {return handleError(err);}
      else{
              console.log('The creator is %s', users);
      res.json(users);
    };  
  });
};




 exports.getUser = function (req, res) {
    ionicUsers
    .findOne({
            username: req.param('username')
        })
    .exec(function (err, users) {
      if (err) {return handleError(err);}
      else{
              console.log('The creator is %s', users);
      res.json(users);
    };  
  });
};


    exports.getUserAll = function (req, res) {
    ionicUsers
    .find()
    // .populate('File')
    // .sort({date: -1})
    .exec(function (err, users) {
      if (err) return handleError(err);
      console.log('The creator is %s', users);
      res.json(users);
    });


    };

    exports.updateUsers = function(req, res){
  var first = req.body.firstname;
  var  last  = req.body.lastname;
  var  fac = req.body.faculty;
  var  yy =  req.body.year;
  var userT  =  req.body.userType;
ionicUsers.update({username:req.param('username')}, { $set: { firstname: first, lastname : last, faculty : fac,
userType : userT , year : yy }}, function (err, user) {
  if (err) return handleError(err);
  console.log(user);
  console.log('OK');
});
    }

    exports.deleteUsers = function(req, res){
      ionicUsers.remove({ username:req.param('username')}, function (err) {
      if (err) {
        return handleError(err)
      }
      else {
        console.log('OK');
      }
      // removed!
  });
      // next();
}


    exports.getNews = function (req, res) {
    News
    .find()
    // .populate('File')
    .sort({date: -1})
    .exec(function (err, news) {
      if (err) return handleError(err);
      // console.log('The creator is %s', users);\
      console.log('User Get News')
      res.json(news);
    });
};

  exports.getNewsLib = function (req, res) {
    News
    .find({group_id:'lib'})
    // .populate('File')
    .sort({date: -1})
    .exec(function (err, news) {
      if (err) return handleError(err);
      // console.log('The creator is %s', users);\
      console.log('User Get News')
      res.json(news);
    });
};
  exports.getNewsIt = function (req, res) {
    News
    .find({group_id:'it'})
    // .populate('File')
    .sort({date: -1})
    .exec(function (err, news) {
      if (err) return handleError(err);
      // console.log('The creator is %s', users);\
      console.log('User Get News')
      res.json(news);
    });
};