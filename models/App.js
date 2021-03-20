const mongoose = require('mongoose');
var Schema=mongoose.Schema;

mongoose.set('useFindAndModify', false);
mongoose.connect('mongodb://localhost:27017/Homepage', {useNewUrlParser: true, useUnifiedTopology: true});
module.exports = mongoose.model('App',new Schema({
  appid:{
    type: String,
    required: true
  },
  type:{
    type: Number,
    required: true
  },
  language:{
    type: Number,
    required: true
  },
  name:{
    type: String,
    required: true
  },
  title:{
    type: String,
    required: true
  },
  subtitle:{
    type: String,
    required: true
  },
  description:{
    type: String,
    required: true
  },
  store_download_link:{
    type: String,
    required: true
  },
  download_link:{
    type: String,
    required: true
  },
  detail_img_url:{
    type: String,
    required: true
  },
  slider_bg_url:{
    type: String,
    required: true
  },
  icon_url:{
    type: String,
    required: true
  },
  enable_slide:{
    type: Boolean,
    required: true
  },
}),'App');

