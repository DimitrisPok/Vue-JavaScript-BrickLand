var express =require('express');
var app = express();
const bodyParser = require('body-parser');

var mongoose = require('mongoose');
const router = express.Router();
const Admin = require('../schemas/Administrator');
const Post = require('./Posts');
const User = require('./Users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

router.post('/admin1', function(req,res, next){
    var admin = new Admin(req.body);
    admin.save(function(err){
        if (err){return res.status(500).send(err);}
    res.status(201).json({"admin": admin});
    });
});

router.post('/AdminSignup', async (req,res, next) => {
  
    const registeredAdmin = await Admin.findOne({email: req.body.email}, function(err, regAdmin){
      if(err){res.status(500).send(err)}
      if(regAdmin){
        return res.status(409).json({
          title : 'error',
          error: 'email in use'
        })
      }
      console.log(regAdmin)
    })
  
    if(!registeredAdmin){
    const newAdmin = new Admin({
      adminName: req.body.adminName,
      password: bcrypt.hashSync(req.body.password, 10),
      email: req.body.email,
    })
    newAdmin.save(err => {
      if (err) {
        return res.status(500).send(err)
      }
      return res.status(200).json({
        title: 'signup success'
      })
    })
    return console.log(newAdmin);
  }}
);

router.post('/AdminLogin', (req,res, next) => {
    console.log(req.body)
    Admin.findOne({
      email: req.body.email
    },
    (err,admin) => {
      if (err) return res.status(500).json({
        title: 'server error',
        error: err
      })
      if (!admin) {
        return res.status(401).json({ 
         title: 'admin not found',
         error: 'invalid credentials' 
        });
      }
      // incorrect password
      if (!bcrypt.compareSync(req.body.password, admin.password)) {
        return res.status(401).json({
          title: 'login failed',
          error: 'invalid credentials'
        })
      }
      // if all is good, create a token and send to frontend
      let token = jwt.sign({ adminId: admin._id}, 'secretkey123456789');
      return res.status(200).json ({
        title: 'login succes',
        token: token
      })
    })
})

// grabbing Admin info 
router.get('/admin', (req, res, next) => {
    let token = req.headers.token // token
    jwt.verify(token, 'secretkey123456789', (err, decoded) => {
      if (err) return res.status(401).json({
        title: 'unauthorized'
      })
      // token is valid 
      Admin.findOne({ _id: decoded.adminId }, (err, admin) => {
        if (err) return console.log(err)
        return res.status(200).json({
          title: 'Admin grabbed',
          admin: {
            name: admin.name,
            email: admin.email 
          }
        })
      })
    })
})
  

//Delete a specific post with id
router.delete('/api/posts/:id', function(req, res, next) {
    var id = req.params.id;
    Post.findOneAndDelete({_id: id}, function(err, post) {
        if (err) { return next(err); }
        if (post == null) {
            return res.status(404).json(
                    {"message": "post not found"});
        }
        res.json(post);
    });
});

//Get a specific post with an id
router.get('/api/posts/:id', function(req, res, next) {
    var id = req.params.id;
    Post.findById(req.params.id, function(err, post) {
        if (err) { return next(err); }
        if (post == null) {
            return res.status(404).send(
                    {"message": "post not found"});
        }
        res.send(post);
        console.log(post);
    });
});
//Deleta a specific user
router.delete('/api/users/:id', function(req, res, next) {
    var id = req.params.id;
    User.findOneAndDelete({_id: id}, function(err, user) {
        if (err) { return next(err); }
        if (user == null) {
            return res.status(404).json(
                    {"message": "User not found"});
        }
        res.json(user);
    });
  });

  //Delete a specfic user
router.get("/api/users/:id", function (req, res, next) {
    User.findOne({ _id: req.params.id })
      .populate("posts")
      .populate("reviews")
      .exec(function (err, user) {
        if (err) {
          return res.status(500).send(err);
        }
        return res.status(200).send(user);
      });
      
  });

  module.exports = router;