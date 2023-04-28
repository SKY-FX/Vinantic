const jpeg = require("jpeg-js");
const fs = require("fs");
const Buffer = require("buffer");
const generatePixels = require("../../src/components/routes/Mandelbrot/generatePixels");

const writeImageInFile = async ({ mandelbrotParams, path }) => {
  const { maxIterations, escapeRadius, step, selectedRange } = mandelbrotParams;

  try {
    const createdPixels = generatePixels({
      maxIterations,
      escapeRadius,
      step,
      selectedRange,
    });
    const width = createdPixels[0].length;
    const height = createdPixels.length;

    // const frameData = new Buffer(width * height * 4);
    const rawData = new Uint8Array(width * height * 4);
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        const pixelIndex = (i * width + j) * 4;
        rawData[pixelIndex + 0] = createdPixels[i][j];
        rawData[pixelIndex + 1] = createdPixels[i][j];
        rawData[pixelIndex + 2] = createdPixels[i][j];
        rawData[pixelIndex + 3] = 255;
      }
    }

    console.info("rawData", rawData);
    const imageData = jpeg.encode(
      {
        data: rawData,
        width,
        height,
      },
      100
    );

    console.info("params", {
      maxIterations,
      escapeRadius,
      step,
      selectedRange,
      path,
    });

    fs.writeFileSync(path, imageData.data, {
      encoding: "binary",
    });
    return `Fichier sauvegardé à l'url ${path}`;
  } catch (err) {
    return err;
  }
};

module.exports = writeImageInFile;
