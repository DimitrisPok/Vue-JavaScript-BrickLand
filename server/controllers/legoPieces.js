var express =require('express');
var app = express();
const bodyParser = require('body-parser');
var mongoose = require('mongoose');
const router = express.Router();
const LegoPiece = require("../schemas/legoPiece");


router.post("/legoPieces",function (req,res){
    var legoPiece = new LegoPiece(req.body);
    legoPiece.save(function(err){
        if(err){return res.status(500).send(err);}
    });
    res.status(201).json(legoPiece);
    console.log(legoPiece);
});


router.get('/LegoPieces',function(req, res){
    LegoPiece.find(function(err, LegoPiece){
        if(err){
            return res.status(500).send(err);
        }
    res.json({"legoPiece": LegoPiece});
    });
});

router.delete("/legoPieces", function (req, res) {
    LegoPiece.deleteMany(function (err, LegoPiece) {
      if (err) {
        return res.status(500).send(err);
      }
      console.log("Deleted all");
      res.status(200).json(LegoPiece);
    });
  });

module.exports = router;