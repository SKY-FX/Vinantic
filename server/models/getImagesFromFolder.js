const fs = require('fs');
const path = require('path');
const { concat, map } = require('ramda');
const Image = require('../schemas/image');

const IMAGES_ROOT_PATH = '../../src/assets/images/';
const FOLDER_PATH = path.resolve(__dirname, '../../src/assets/images');


const setImagesFromFolder = () => new Promise((resolve, reject) => {
  fs.readdir(FOLDER_PATH, (err, files) => {
    if (err) {
      reject(err);
    } else {
      const images = files.filter(file => path.extname(file).toLowerCase() === '.jpg');

      map(image => {
        const concatPath = concat(IMAGES_ROOT_PATH, image);
        const imagePath = path.resolve(__dirname, concatPath);
        saveImage(imagePath);
      })(images);

      resolve(images);
    }
  });
});

const saveImage = async (filePath) => {
  try {
    const file = fs.readFileSync(filePath);
    const [, extension] = filePath.split('.');
    const contentType = `image/${extension}`;

    const image = new Image({
      filename: filePath,
      contentType,
      data: file
    });

    await image.save();
    console.log(`Image saved to the database : ${filePath}`);
  } catch (error) {
    console.error(error);
  }
};

module.exports = setImagesFromFolder;
