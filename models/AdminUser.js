const mongoose = require('mongoose');
var Schema=mongoose.Schema;

mongoose.connect('mongodb://localhost:27017/Homepage', {useNewUrlParser: true, useUnifiedTopology: true});
var userSchema = new Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
  });
module.exports=mongoose.model('User',userSchema,'AdminUser');
