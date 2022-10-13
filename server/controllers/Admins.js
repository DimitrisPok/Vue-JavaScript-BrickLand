var express =require('express');
var app = express();
const bodyParser = require('body-parser');

var mongoose = require('mongoose');
const router = express.Router();
const Admin = require('../schemas/Administrator');
const Post = require('../schemas/Post');
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
        return res.status(200).json(admin)
      })
    })
  })


  // put a specific admin
  /*
  router.put('/admins/:id', function(req, res, next) {
    var id = req.params.id;
    Admin.findById(id, function(err, admin) {
        if (err) { return next(err); }
        if (admin == null) {
            return res.status(404).json({"message": "admin not found"});
        }
        admin.adminName = req.body.adminName;
        admin.password = bcrypt.hashSync(req.body.password, 10),
        admin.email = req.body.email;
        admin.save();
        res.json(admin);
    });
  });
  */
    // put a specific admin, trying out here another put method
    
    router.put('/admins/:id', function(req, res, next) {
      var id = req.params.id;
      Admin.findById(id, function(err, admin) {
          if (err) { return next(err); }
          if (admin == null) {
              return res.status(404).json({"message": "admin not found"});
          }
          const newadmin = {
          adminName: req.body.adminName,
          password: bcrypt.hashSync(req.body.password, 10),
          email: req.body.email,
          }       
        Admin.findOneAndReplace({_id: id}, newadmin, {option: true}, function(err, admin) {
          if(err) {return res.status(500).send(err);}
          if(admin = null) {
            return res.status(404).json({"message" : "Admin not found"});
          }
          res.status(200).json(admin);
        });
      });
    });
  
  

router.get('/admins',function(req, res){
  Admin.find(function(err, admins) {
       if (err){return res.status(500).send(err);}
  res.status(201).json({"admins": admins});
  });
});

// delete all posts
router.delete('/posts', function(req, res, next) {
  Post.deleteMany(function(err, posts) {
      if (err) { return next(err); }
      if (posts == null) {
          return res.status(404).json(
                  {"message": "There are no posts!"});
      }
      res.status(201).json({"post": posts});
  });
});
router.delete('/admins/:id', function(req, res, next) {
  var id = req.params.id;
  Admin.findOneAndDelete({_id: id}, function(err, admin) {
      if (err) { return next(err); }
      if (admin == null) {
          return res.status(404).json(
                  {"message": "Admin not found"});
      }
      res.json(admin);
  });
});

//posts a post with and admin id


/*
//Delete a specific post with id
router.delete('/posts/:id', function(req, res, next) {
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
router.get('/posts/:id', function(req, res, next) {
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
  //Delete a specfic user

  we do not need this
router.get("/users/:id", function (req, res, next) {
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
*/

  module.exports = router;