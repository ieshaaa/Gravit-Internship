const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    ProdID: {
        type: String,
        required: true,
        unique: true
    },
    Prodname: {
        type: String,
        required: true
    },
    Prodcategory: {
        type: String,
        required: true
    },
    Proddate: {
        type: Date,
        required: true
    },
    Prodcompany: { 
        type: String,
        required: true
    },
    Prodwarranty: {
        type: String,
        enum: true || false
    }
    
    
});

const users = new mongoose.model("users",userSchema);


module.exports = users;