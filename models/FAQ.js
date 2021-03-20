const mongoose = require('mongoose');
var Schema=mongoose.Schema;

mongoose.set('useFindAndModify', false);
mongoose.connect('mongodb://localhost:27017/Homepage', {useNewUrlParser: true, useUnifiedTopology: true});
module.exports = mongoose.model('FAQ',new Schema({
  //Blog
  appid:{
    type: String,
    required: true
  },
  question:{
    type: String,
    required: true
  },
  language:{
    type: Number,
    required: true
  },
  answer:{
    type: String,
    required: true
  }

}),'FAQ');

