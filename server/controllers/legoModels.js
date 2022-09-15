var express =require('express');
const router = express.Router();
const LegoModel = require("../schemas/LegoModel");

router.post("/legoModels",function (req,res){
    var legoModel = new LegoModel(req.body);
    legoModel.save(function(err){
        if(err){return res.status(500).send(err);}
        console.log(legoModel);
        res.status(201).json(legoModel);
    });  
});

router.get('/legoModels',function(req, res){
    LegoModel.find(function(err, legoModel){
        if(err){
            return res.status(500).send(err);
        }
    res.json({"legoModel": legoModel});
    });
})

/*router.get('/legoModels',function(req, res){
    legoModel.find(function(err, creatorName){
      if(err){
        return res.status(500).send(err);
    }
res.json({"legoModel": LegoModel});
    });
});*/


router.delete("/legoModels", function (req, res) {
    LegoModel.deleteMany(function (err, legoModel) {
      if (err) {
        return res.status(500).send(err);
      }
      console.log("Deleted all");
      res.status(200).json(legoModel);
    });
  });

router.delete("/legoModels/:id", function (req, res, next) {
    var id = req.params.id;
    LegoModel.findByIdAndDelete(id, function (err, legoModel) {
      if (err) {
        return res.status(500).send(err);
      }
      if (legoModel == null) {
        return res.status(404).json({ message: "LegoModel not found." });
      }
      console.log("Legomodel successfully deleted :", legoModel.name);
      res.status(200).json(legoModel);
    });
  });

module.exports = router;