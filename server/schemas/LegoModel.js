var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var legoModelSchema = new Schema(
    {
        modelName: { 
            type: String, 
            required:[true,'Name of the model is required'] 
        },

        creatorName: {
            type: String,
            default: "Anonymous"
        },

        legoPieces: {
            numberOfPieces:{type: Number},
            typeOfPieces: {type: Array}
        },

        categoryName: {
            type: String,
            default: "Is not categorized."
        },

        instructions: {
            type: Array
        }

    }

);
module.exports = mongoose.model("legoModels", legoModelSchema);