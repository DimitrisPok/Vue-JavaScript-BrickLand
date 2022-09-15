var express =require('express');
var app = express();
const bodyParser = require('body-parser');
var mongoose = require('mongoose');
const router = express.Router();
const Admin = require("../schemas/Administrator");

router.get('/admins',function(req, res){
    res.json({type:'GET'});
});



module.exports = router;