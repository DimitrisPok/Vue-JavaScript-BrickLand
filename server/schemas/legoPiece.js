var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var legoPiece = new Schema(
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