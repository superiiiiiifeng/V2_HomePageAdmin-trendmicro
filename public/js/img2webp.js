const sharp = require('sharp'),
    fs = require('fs'),
    dir = './public',
    imagemin = require('imagemin'),
    imageminJpegtran = require('imagemin-jpegtran'),
    imageminPngquant = require('imagemin-pngquant');

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



// Promise.all([
//   new Promise(() => {
//       imagemin(['public/images/*.{jpg,png}'], {
//         destination: 'public/images-min',
//         plugins: [
//           imageminJpegtran(),
//           imageminPngquant({
//             quality: [0.1, 0.2]
//           })
//         ]
//       });
//       console.log('Images optimized');
//   }),
//   new Promise(() => {
//       processDir(dir);
//       console.log('finished2')
//   })
// ]);

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
    let pngSize = 0, jpgSize = 0, webpSize = 0, count = 0;
    processDir(dir);
  }
  catch (e) {
    console.log(e);
  }
}

processImages();