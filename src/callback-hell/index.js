/**
 * 폴더 내의 이미지 파일을 모두 읽어서 widths에 설정된 너비에 맞게 리사이징 한 이미지를 생성한다.
 */
const fs = require('node:fs');
const path = require('node:path');
const gm = require('gm');

const source = path.join(__dirname, 'assets');
const dest = path.join(__dirname, 'resized');
const WIDTHS = [1024, 640, 320];

fs.readdir(source, function (err, files) {
  if (err) {
    console.log('Error finding files: ' + err);
  } else {
    files.forEach(function (filename, fileIndex) {
      console.log(filename);
      if (!filename.startsWith('.')) {
        gm(path.join(source, filename)).size(function (err, size) {
          if (err) {
            console.log('Error identifying file size: ' + err);
          } else {
            console.log(filename + ' : ' + size);
            const aspect = size.width / size.height;
            WIDTHS.forEach(
              function (width, widthIndex) {
                let height = Math.round(width / aspect);
                console.log(
                  'resizing ' + filename + ' to ' + height + 'x' + height
                );
                this.resize(width, height).write(
                  path.join(dest, 'w' + width + '_' + filename),
                  function (err) {
                    if (err) console.log('Error writing file: ' + err);
                  }
                );
              }.bind(this)
            );
          }
        });
      }
    });
  }
});
