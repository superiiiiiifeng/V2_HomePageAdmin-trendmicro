const mongoose = require('mongoose');
var Schema=mongoose.Schema;

mongoose.set('useFindAndModify', false);
mongoose.connect('mongodb://localhost:27017/Homepage', {useNewUrlParser: true, useUnifiedTopology: true});
module.exports = mongoose.model('AppFeature',new Schema({
  //AppFeature
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
  feature_icon_url:{
    type: String,
    required: true
  },
  description:{
    type: String,
    required: true
  },
}),'AppFeature');

