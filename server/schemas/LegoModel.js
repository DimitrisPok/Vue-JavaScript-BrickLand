var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var legoModel = new Schema(
    {
        modelName: { type: String },

        creatorName: {type: String},

        legoPieces: {
            numberOfPieces:{type: Number},
            typeOfPieces: {type: Array}
        },

        categoryName: {type: String},

        instructions: {type: Array}

    }

);