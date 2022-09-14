var mongoose = require("mongoose");
var Schema = mongoose.Schema;



var PostSchema = new Schema(
    {
        postId : {
            type: Number
        },

        caption : {
            type: String,
            required:[true,'The title of the post is required.']
        },

        instructions : {
            type: String,
            required:[true,'The title of the post is required.']
        },

        entryDate: {type:Date, default:Date.now}

    }
);


