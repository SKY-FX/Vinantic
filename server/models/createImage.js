import { gfs } from "../mongoose";

const createImage = (newImageStream, fileName, fileType) => {
    const writeStream = gfs.createWriteStream({
        filename: fileName,
        mode: 'w',
        content_type: fileType
    });
    newImageStream.pipe(writeStream);
    writeStream.on('close', (file) => {
        console.log("Image créée avec succès.");
        return file;
    });
};

export default createImage;