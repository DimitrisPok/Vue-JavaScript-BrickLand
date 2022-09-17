//testing out post and these get methods.................................

//Instead of storing the camels we create in a database,we use local memory to do so in this array
// We change it later to a database

//We need to accordingto the lecture recordings, we want the client to return a json object that contains the camels(or whatever)
var express =require('express');
var app = express();
const bodyParser = require('body-parser');
var mongoose = require('mongoose');
const router = express.Router();



//creating image method here to test

var imgModel = require('./model');
var fs = require('fs');
var path = require('path');
require('dotenv/config');

var multer = require('multer');
  
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
  
var upload = multer({ storage: storage });

app.get('/image', (req, res) => {
    imgModel.find({}, (err, items) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred', err);
        }
        else {
            res.render('imagesPage', { items: items });
        }
    });
});

app.post('/image', upload.single('image'), (req, res, next) => {
  
    var obj = {
        name: req.body.name,
        desc: req.body.desc,
        img: {
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
            contentType: 'image/png'
        }
    }
    imgModel.create(obj, (err, item) => {
        if (err) {
            console.log(err);
        }
        else {
            // item.save();
            res.redirect('/');
        }
    });
});



//.....................................










//trying to import admin here
const Admin = require('../schemas/Administrator');

router.post('/admins', function(req, res){
    Admin.create(req.body).then(function(admin){
        res.send(admin);
    });
});



router.get('/admins', function(req,res){
    res.send({type:'GET'});
});

//one way of doing a post 
/*
app.post('/admins', function(req, res){
    console.log(req.body);
    var admin = new Admin(req.body);
    //mongoose method
    admin.save()
    res.send({
        type: POST,
        userName: req.body.userName,
        password: req.body.password,
        email: req.body.email

    });

});
*/


//..................................

const LegoModel = require("../schemas/LegoModel");


router.post("/legoModels", function(req,res){
    LegoModel.create(req.body).then(function(legoModel){
        res.send(legoModel);
    });
});

router.get("/legoModel", function(req,res){
    res.send({type: 'GET'});
});

app.use(bodyParser.json());

var camels = [];

router.post('/camels', function(req, res){
    console.log("The post was succesfull");
    var new_camel ={
        "_id": camels.length,
        "color": req.body.color,
        "position": req.body.position

    };

    //change line 123 when implementing a database
    camels.push(new_camel);
    res.status(201).json(new_camel);
});


router.get('/camels', function(req,res) {
    console.log("we got te request");
    res.json({'camels': camels});
});


router.get('/camels/:id', function(req, res) {
    res.json(camels[req.params.id]);
});


router.put('/camels/:id', function(req, res) {
    var id = req.params.id;
    var updated_camel = {
        "_id": id,
        "color": req.body.color,
        "position": req.body.position
    }
    camels[id] = updated_camel;
    res.json(updated_camel);
});


router.patch('/camels/:id', function(req, res) {
    var id = req.params.id;
    var camel = camels[id];
    var updated_camel = {
        "_id": id,
        "color": (req.body.color || camel.color),
        "position": (req.body.position || camel.position)
    };
    camels[id] = updated_camel;
    res.json(updated_camel);
});

router.delete('/camels/:id', function(req, res, next){
    User.findByIdAndDelete({_id: req.params.id}).then(function(user){
        res.send(user);
    }); 
    res.json({type:'DELETE'});
})

module.exports = router;