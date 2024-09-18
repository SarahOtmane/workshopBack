const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
    name:{
        type : String,
        required : true,
        unique : true,
    },
    options:{
        type : Array,
        required : true
    },
    price:{
        type : Number,
        required : true
    },
});

module.exports = mongoose.model('User', userSchema);