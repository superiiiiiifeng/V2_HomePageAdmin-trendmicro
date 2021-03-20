var express=require('express');
var path=require('path');
var router=require('./routers/router');
var bodyParser=require('body-parser');
var session = require('express-session');//中间件
var fileUpload = require('express-fileupload');
var cors = require('cors');

var glob = require('glob');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var compress = require('compression');
var methodOverride = require('method-override');

//创建服务器
var app=express();

app.use(cors());

app.use(fileUpload({
    createParentPath: true
}));

// 采用express的API可以直接公开指定目录提供静态资源
app.use('/public/',express.static(path.join(__dirname,'./public/')));
app.use('/node_modules/',express.static(path.join(__dirname,'./node_modules/')));

//配置使用express-art-template模板引擎
app.engine('html', require('express-art-template'));
app.set('views',path.join(__dirname,'./views/'));

//配置body-parser第三方插件
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(cookieParser());
app.use(compress());
app.use(methodOverride());


//配置使用express-session中间件，默认session数据是内存存储的，关闭浏览器后再打开就会丢失原数据，因此真正生产环境会对该数据进行持久化存储(可利用数据库)
app.use(session({
    secret: 'keyboard cat',//配置加密字符串，即在原有加密基础上，再拼接此字符串去加密
    resave: false,
    saveUninitialized: true//无论是否使用session，默认均有一个密钥
  }));

// 挂载路由
//将路由容器加载到app服务器中
app.use(router);

// 配置404错误处理中间件
app.use(function(req,res) {
    res.render('404.html')
});

app.listen(8421,function() {
    console.log('app is running...');
});