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
 * Step 2: this 대신 img 변수를 사용하여 코드를 조금 더 명확하게 보이도록 수정합니다.
 * 추가로 몇 가지 변수를 도입하여 코드를 더 읽기 쉽게 만듭니다.
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
    gm(sourceFile).size(function (err, size) {
      if (err) {
        console.log('Error identifying file size: ' + err);
        return;
      }

      console.log(filename + ' : ' + size);
      const aspect = size.width / size.height;
      const img = this;

      WIDTHS.forEach((width) => {
        const height = Math.round(width / aspect);
        const resizedPath = path.join(dest, 'w' + width + '_' + filename);

        console.log('resizing ' + filename + ' to ' + height + 'x' + height);

        img.resize(width, height).write(resizedPath, (err) => {
          if (err) console.log('Error writing file: ' + err);
        });
      });
    });
  });
});
