var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ReviewSchema = new Schema(
    {

        comment : {
            type: String,
            default: "no comment"
        },
        
        user: { 
            type: Schema.Types.ObjectId, 
            ref: "user" 
        },

        post: { 
            type: Schema.Types.ObjectId, 
            ref: "post" 
        }

    },
    { timestamps : true },


);

const review = mongoose.model('review', ReviewSchema);
module.exports = review;
