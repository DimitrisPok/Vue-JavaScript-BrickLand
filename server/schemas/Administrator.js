var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var AdministratorSchema = new Schema(
    {
        userName : {type: String},
        password : {type: String},
        email : {type: String},
    }
);

const Admin = mongoose.model('admin', AdministratorSchema);
module.exports = Admin;