const mongoose = require('mongoose');
var Schema=mongoose.Schema;

mongoose.set('useFindAndModify', false);
mongoose.connect('mongodb://localhost:27017/Homepage', {useNewUrlParser: true, useUnifiedTopology: true});
module.exports = mongoose.model('Blog',new Schema({
  //Blog
  appid:{
    type: String,
    required: true
  },
  title:{
    type: String,
    required: true
  },
  language:{
    type: Number,
    required: true
  },
  sex:{
    type: Number,
    required: true
  },
  description:{
    type: String,
    required: true
  },
  content:{
    type: String,
    required: true
  },
  creator:{
    type: String,
    required: true
  },
  thumbnail_url:{
    type: String,
    required: true
  },
  tags:{
    type: String,
    required: true
  }

}),'Blog');

