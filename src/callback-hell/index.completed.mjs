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
 * 완료: 이미지를 처리하는 부분에도 async/await을 적용합니다.
 * 원본 코드와 비교해서 코드를 읽어보면 어떤 느낌이 드시나요?
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
    let aspect = 1;

    try {
      const size = await gmReadSize(img);
      aspect = size.width / size.height;
    } catch(err) {
      console.log('Error identifying file size: ' + err);
      continue;
    }

    for (const width of WIDTHS) {
      const height = Math.round(width / aspect);
      const resizedPath = path.join(dest, 'w' + width + '_' + filename);
      console.log('resizing ' + filename + ' to ' + height + 'x' + height);

      try {
        await gmSaveResize(img, resizedPath, width, height);
      } catch(err) {
        console.log('Error writing file: ' + err);
      }
    }
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
