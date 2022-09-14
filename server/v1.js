//testing out post and these get methods.................................

//Instead of storing the camels we create in a database,we use local memory to do so in this array
// We change it later to a database

//We need to accordingto the lecture recordings, we want the client to return a json object that contains the camels(or whatever)
var express =require('express');
var app = express();
const bodyParser = require('body-parser');
var mongoose = require('mongoose');
const router = express.Router();




//trying to import admin here
const Admin = require('../server/schemas/Administrator');

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

module.exports = router;