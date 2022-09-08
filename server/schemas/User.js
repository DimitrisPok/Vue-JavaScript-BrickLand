var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var UserSchema = new Schema(
    {
        userName : {type: String},

        password : {type: String},

        email : {type: String},
        
        likedPosts : {type: Array}
    }
);
