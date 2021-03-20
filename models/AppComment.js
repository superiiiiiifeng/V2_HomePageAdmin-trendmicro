const mongoose = require('mongoose');
var Schema=mongoose.Schema;

mongoose.set('useFindAndModify', false);
mongoose.connect('mongodb://localhost:27017/Homepage', {useNewUrlParser: true, useUnifiedTopology: true});
module.exports = mongoose.model('AppComment',new Schema({
  //AppComment
  appid:{
    type: String,
    required: true
  },
  username:{
    type: String,
    required: true
  },
  language:{
    type: Number,
    required: true
  },
  content:{
    type: String,
    required: true
  },
}),'AppComment');

