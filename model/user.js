const mongoose=require('mongoose');
const validator=require('validator');
const userSchema=new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
name:{
    type:String,
    required:true
},
email:{
    type:String,
    required:true,
    //unique: true,
    lowercase:true,

},

password:{type:String,
    required: true,
    minlength:8

},

timestamp:{type:Date}



});

const User= mongoose.model('User',userSchema);

module.exports = User;