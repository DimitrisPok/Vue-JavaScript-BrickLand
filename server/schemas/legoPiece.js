var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var legoPiece = new Schema(
    {
        TypeOfPiece : {type : String}
    }
);