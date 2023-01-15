/**
 * 폴더 내의 이미지 파일을 모두 읽어서 widths에 설정된 너비에 맞게 리사이징 한 이미지를 생성합니다.
 */
import fs  from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import gm from 'gm';

const source = path.join(path.dirname(fileURLToPath(import.meta.url)), 'assets');
const dest = path.join(path.dirname(fileURLToPath(import.meta.url)), 'resized');
const WIDTHS = [1024, 640, 320];

/**
 * Step 4: fs.readdir도 Promise 버전으로 바꾸고, top-level await을 사용하여 코드를 더 간결하게 만듭니다.
 * top-level await은 모듈에서만 사용할 수 있기 때문에 현재 파일을 모듈로 바꾸었습니다. (확장자도 변경됐습니다)
 */
try {
  const files = await fs.readdir(source);

  for (const filename of files) {
    console.log(filename);
    if (filename.startsWith('.')) {
      continue;
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
  }
} catch(err) {
  console.log('Error finding files: ' + err);
}

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
