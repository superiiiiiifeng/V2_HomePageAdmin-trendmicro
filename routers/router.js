var express = require('express');
var App = require('../models/App');
var AppComment = require('../models/AppComment');
var AppFeature = require('../models/AppFeature');
var Blog = require('../models/Blog');
var FAQ = require('../models/FAQ');
var User = require('../models/AdminUser');
var md5 = require('md5');//引入第三方模块md5对数据库进行加密

var fs = require('fs');

var router=express.Router();

const sharp = require('sharp'),
    dir = './public',
    imagemin = require('imagemin'),
    imageminJpegtran = require('imagemin-jpegtran'),
    imageminPngquant = require('imagemin-pngquant');

// images转webp格式
function processDir(dir) {
  const fstatus = fs.lstatSync(dir);
  if (fstatus.isDirectory()) {
    fs.readdir(dir, (err, files) => {
      console.log(`[folder] ${dir}`)
      files.forEach(f => processDir(`${dir}/${f}`));
    })
  } else if (dir.endsWith('.png')) {
    const output = dir.replace('.png', '.webp');
    console.log(`[${count}] png vs webp: ${pngSize} vs ${webpSize} ${(webpSize / pngSize * 100).toFixed(2)}%`)
    if (!fs.existsSync(output)) {
      console.log(`[file] ${dir}`)
      sharp(dir).toFile(output, (err) => {
        if (err) {
          console.error(err);
        } else {
          webpSize += fs.lstatSync(output).size;
        }
      });
    } else {
      console.log(`[exsit] ${dir}`);
    }
    pngSize += fstatus.size;
    count++;
  } else if (dir.endsWith('.jpg')) {
    const output = dir.replace('.jpg', '.webp');
    console.log(`[${count}] jpg vs webp: ${jpgSize} vs ${webpSize} ${(webpSize / jpgSize * 100).toFixed(2)}%`)
    if (!fs.existsSync(output)) {
      console.log(`[file] ${dir}`)
      sharp(dir).toFile(output, (err) => {
        if (err) {
          console.error(err);
        } else {
          webpSize += fs.lstatSync(output).size;
        }
      });
    } else {
      console.log(`[exsit] ${dir}`);
    }
    jpgSize += fstatus.size;
    count++;
  }
  else {
    console.log(`[pass] ${dir}`);
  }
}
let pngSize = 0, jpgSize = 0, webpSize = 0, count = 0;
async function processImages() {
  try {
    await imagemin(['public/images/*.{jpg,png}'], {
      destination: 'public/images-min',
      plugins: [
        imageminJpegtran(),
        imageminPngquant({
          quality: [0.1, 0.2]
        })
      ]
    });
    processDir(dir);
  }
  catch (e) {
    console.log(e);
  }
}

// 查

router.get('/',function(req,res) {
  App.find(req.query.id,function(err,App) {
    if(err) {
      return res.status(500).send('<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>404 Not Found!!!</title><style>center {font-size: 44px;color: red;height: 600px;line-height: 600px;}</style></head><body><center>读取文件错误或输入的参数有误！！！</center></body></html>');
    }
    res.render('index.html',{
      apps: App,
      user:req.session.user
    })
  })
});

// 增

router.get('/new',function(req,res) {
  res.render('new.html',{
    user:req.session.user
  })
});

const dirsArray= ['./public/img/App/','./public/img/AppComment/','./public/img/AppFeature/','./public/img/Blog/'];
function getDir(url) {
  if (url === '/newApp' || url === '/editAPP') {
    return dirsArray[0]
  } else if (url === '/newAppComment' || url === '/editAPPComment')  {
    return dirsArray[1]
  } else if (url === '/newAppComment' || url === '/editAPPComment')  {
    return dirsArray[2]
  } else {
    return dirsArray[3]
  }
}

function addNew(App,req,res) {
  try {
    var app=req.body;
    if (JSON.stringify(app) === '{}') {
      return app
    }
    deleteApp(App,app.appid,req,res);
    // console.log(app.appid instanceof Array);
    // console.log(req.files);
    var currentDir = getDir(req.originalUrl);
    for (let i in req.files) {
      if(req.files[i]instanceof Array) {
        app[i] = [];
        for (let j = 0; j < req.files[i].length; j++) {
          req.files[i][j].mv(currentDir + req.files[i][j].name);
          app[i].push(currentDir.slice(1) + req.files[i][j].name.replace('.jpg','.webp').replace('.png','.webp'));
        }
      } else {
        req.files[i].mv(currentDir + req.files[i].name);
        app[i] = currentDir.slice(1) + req.files[i].name.replace('.jpg','.webp').replace('.png','.webp');
      }
    }
    var len = app.appid instanceof Array ? app.appid.length : 1;
    if(len === 1) {
      new App(app).save(function(err) {
        if (err) {
          console.log(err);
          return res.status(500).send('<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>404 Not Found!!!</title><style>center {font-size: 44px;color: red;height: 600px;line-height: 600px;}</style></head><body><center>读取文件错误或输入的参数有误！！！</center></body></html>');
        }
        // res.redirect('/');
      })
    } else {
      for (let i = 0; i < len; i++) {
        var bpp = JSON.parse(JSON.stringify(app));
        for (let j in app) {
          bpp[j] = app[j][i];
        }
        new App(bpp).save(function(err) {
          if (err) {
            console.log(err);
            return res.status(500).send('<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>404 Not Found!!!</title><style>center {font-size: 44px;color: red;height: 600px;line-height: 600px;}</style></head><body><center>读取文件错误或输入的参数有误！！！</center></body></html>');
          }
          // res.redirect('/');
        })
      }
    }
    return app
  } catch (err) {
    res.status(500).send(err);
  }
}
router.post('/newApp', async(req,res) => {

  addNew(App,req,res);
  // console.log(app);
  // console.log('123----------------------------------------------------------------');

});
router.post('/newAppComment', async(req,res) => {

  addNew(AppComment,req,res);

});
router.post('/newAppFeature', async(req,res) => {

  addNew(AppFeature,req,res);

});
router.post('/newBlog', async(req,res) => {

  addNew(Blog,req,res);

});
router.post('/newFAQ', async(req,res) => {

  addNew(FAQ,req,res);
  await processImages();
  res.redirect('/');
  // console.log(123);
});

// 改

function findID(App,idd,res) {
  return new Promise((resolve,reject)=>{
    App.find({appid:idd},function(err,app) {
      if(err) {
        return res.status(500).send('<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>404 Not Found!!!</title><style>center {font-size: 44px;color: red;height: 600px;line-height: 600px;}</style></head><body><center>读取文件错误或输入的参数有误！！！</center></body></html>');
      }
      // console.log(app);
      resolve(app)
    })
  })
}
router.get('/edit',async(req,res) => {
  try {
    var idd=req.query.appid;
    var app = await findID(App,idd,res).then(data => {
      return data
    });
    var appComment = await findID(AppComment,idd,res).then(data => {
      return data
    });
    var appFeature = await findID(AppFeature,idd,res).then(data => {
      return data
    });
    var blog = await findID(Blog,idd,res).then(data => {
      return data
    });
    var faq = await findID(FAQ,idd,res).then(data => {
      return data
    });
    // console.log(app[0].appid);
    res.render('edit.html',{
      app:app[0],
      appComment:appComment,
      appFeature:appFeature,
      blog:blog,
      faq:faq,
      user:req.session.user
    })
  }
  catch (e) {
    console.log(e);
  }

});


function postEdit(App,req,res) {
  var app =req.body;
  var idd=app.dd;
  deleteApp(App,idd,req,res);
  delete app.dd;
  addNew(App,req,res);
}
router.post('/editApp',function(req,res) {
  var app =req.body;

  app.detail_img_url = app.detail_img_url===undefined ? app.detail_img_url_backup:app.detail_img_url;
  delete app.detail_img_url_backup;
  app.slider_bg_url = app.slider_bg_url===undefined ? app.slider_bg_url_backup:app.slider_bg_url;
  delete app.slider_bg_url_backup;
  app.icon_url = req.body.icon_url===undefined ? app.icon_url_backup:app.icon_url;
  delete app.icon_url_backup;

  postEdit(App,req,res);

});
router.post('/editAppComment',function(req,res) {

  postEdit(AppComment,req,res);

});
router.post('/editAppFeature',function(req,res) {

  var appFeature =req.body;

  appFeature.feature_icon_url = req.body.feature_icon_url===undefined ? appFeature.feature_icon_url_backup:appFeature.feature_icon_url;
  delete appFeature.feature_icon_url_backup;

  postEdit(AppFeature,req,res);

});
router.post('/editBlog',function(req,res) {

  var blog =req.body;

  blog.thumbnail_url = req.body.thumbnail_url===undefined ? blog.thumbnail_url_backup:blog.thumbnail_url;
  delete blog.thumbnail_url_backup;

  postEdit(Blog,req,res);

});
router.post('/editFAQ',async(req,res) => {

  postEdit(FAQ,req,res);
  await processImages();
  res.redirect('/')

});

// 删

function deleteApp(App,idd,req,res) {
  App.deleteMany({appid: idd},function(err) {
    if(err) {
      return res.status(500).send('<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>404 Not Found!!!</title><style>center {font-size: 44px;color: red;height: 600px;line-height: 600px;}</style></head><body><center>读取文件错误或输入的参数有误！！！</center></body></html>');
    }
  })
}
router.get('/delete',function(req,res) {
  var idd=req.query.appid;
  deleteApp(App,idd,req,res);
  deleteApp(AppComment,idd,req,res);
  deleteApp(AppFeature,idd,req,res);
  deleteApp(Blog,idd,req,idd,res);
  deleteApp(FAQ,idd,req,res);
  res.redirect('/')
});

// 打开登录页
router.get('/login',function(req,res) {
  res.render('login.html')
});
// 提交登录页
router.post('/login',function(req,res) {
  // 1.获得表单体数据
  // 2.查询数据库是否有该用户
  // 3.若有则比对密码，没有用户则报错
  // 4.密码错误，提示，密码成功，渲染首页
  var body=req.body;
  // console.log(body);
  User.findOne({email:body.email},function(err,data) {
    if(err) {
      return res.status(500).json({
        success:false,
        errCode:500,
        message:'Server Error...'
      })
    } else if(data) {
      const encryptPass = md5(md5(body.password))
      if(data.password===encryptPass) {
        //验证登录成功，则使用Session记录用户的登录状态
        // req.session.isLogin=true;
        //验证登录成功，则使用Session记录用户信息
        req.session.user=data;
        // console.log(req.session);
        return res.status(200).json({
          success:true,
          errCode:0,
          message:'Information is correct...'
        })
      }
      return res.status(200).json({
        success:true,
        errCode:1,
        message:'User does exist but error password...'
      })
    }
    return res.status(200).json({
      success:false,
      errCode:2,
      message:'User does not exist...'
    })
  })
  // res.render('index.html')
});
// 打开登录页
router.get('/login',function(req,res) {
  res.render('login.html')
});
// 退出
router.get('/logout',function(req,res) {
  // 清除登录状态
  // req.session.user=null;//删数据
  delete req.session.user;//删成员
  res.redirect('/')
});
// 注册
router.get('/register',function(req,res) {
  res.render('register.html')
});
router.post('/register',async function(req,res) {
  var body=req.body;
  try{
    if(await User.findOne({email:body.email})) {
      return res.status(200).json({
        success:false,
        errCode:1,
        message:'User has already existed...'
      })
    }
    //可以注册,则保存数据,并发回给服务端响应数据
    //保存前先对密码进行双重加密
    body.password=md5(md5(body.password));
    await new User(body).save();
    return res.status(200).json({
      success:true,
      errCode:0,
      message:'Register is ok...'
    })
  } catch(err) {
    return res.status(500).json({
      success:false,
      errCode:500,
      message:'Server Error...'
    })
  }
});

router.get('/file',function(req,res) {
  res.render('file.html', {
      user:req.session.user
    });
  });



module.exports=router;