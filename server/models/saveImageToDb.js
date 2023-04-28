const saveImageToDb = async (bottleData, importedPhoto) => {
  try {
    // // Create a write stream
    // const writestream = gfs.createWriteStream({
    //   filename: "ref_123.jpg",
    // });

    // // Write the image data to the stream
    // fs.createReadStream(importedPhoto).pipe(writestream);

    // // Handle the 'close' event
    // writestream.on("close", (file) => {
    //   bottleData.image = file._id;
    //   console.log(`Image saved to the database with id ${file._id}`);
    // });
  } catch (err) {
    // console.log(`Error: ${err.message}`);
    // throw err;
  }
};
