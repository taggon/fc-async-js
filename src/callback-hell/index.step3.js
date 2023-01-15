/**
 * 폴더 내의 이미지 파일을 모두 읽어서 widths에 설정된 너비에 맞게 리사이징 한 이미지를 생성합니다.
 */
const fs = require('node:fs');
const path = require('node:path');
const gm = require('gm');

const source = path.join(__dirname, 'assets');
const dest = path.join(__dirname, 'resized');
const WIDTHS = [1024, 640, 320];

/**
 * Step 3: GM의 resize 함수를 Promise를 사용하도록 변경합니다.
 */
fs.readdir(source, function (err, files) {
  if (err) {
    console.log('Error finding files: ' + err);
    return;
  }

  files.forEach(function (filename, fileIndex) {
    console.log(filename);
    if (filename.startsWith('.')) {
      return;
    }

    const sourceFile = path.join(source, filename);
    const img = gm(sourceFile);

    gmReadSize(img)
      .then(size => {
        console.log(filename + ' : ' + size);
        const aspect = size.width / size.height;
        return aspect;
      })
      .catch(err => {
        console.log('Error identifying file size: ' + err);
      })
      .then(aspect => {
        return Promise.all(
          WIDTHS.map(width => {
            const height = Math.round(width / aspect);
            const resizedPath = path.join(dest, 'w' + width + '_' + filename);
            console.log('resizing ' + filename + ' to ' + height + 'x' + height);

            return gmSaveResize(img, resizedPath, width, height);
          })
        );
      })
      .catch(err => {
        console.log('Error writing file: ' + err);
      });
  });
});

function gmReadSize(img) {
  return new Promise((resolve, reject) => {
    img.size((err, size) => {
      if (err) {
        reject(err);
      } else {
        resolve(size);
      }
    });
  });
}

function gmSaveResize(img, resizedPath, width, height) {
  return new Promise((resolve, reject) => {
    img.resize(width, height).write(resizedPath, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}
