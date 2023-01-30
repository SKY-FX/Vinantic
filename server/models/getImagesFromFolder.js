const fs = require('fs');
const path = require('path');

const FOLDER_PATH = path.resolve(__dirname, '../../src/assets/images');


const getImagesFromFolder = () => new Promise((resolve, reject) => {
  fs.readdir(FOLDER_PATH, (err, files) => {
    if (err) {
      reject(err);
    } else {
      const images = files.filter(file => path.extname(file).toLowerCase() === '.jpg');
      console.info('getImagesFromFolder', { FOLDER_PATH, images });
      resolve(images);
    }
  });
});

module.exports = getImagesFromFolder;
