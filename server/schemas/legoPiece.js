var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var legoPieceSchema = new Schema(
    {
        category : {
            type: String
        },

        subCategory : {
            type: String
        },

        elementId : {
            type: Number
        },

        DesignId : {
            type: Number
        }
    }
);
module.exports = mongoose.model("legoPieces", legoPieceSchema);