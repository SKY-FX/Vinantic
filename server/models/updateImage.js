import { gfs } from "../mongoose";

const updateImage = (imageId, newImageStream) => {
    gfs.replace(
        { _id: imageId },
        newImageStream,
        (err, updatedFile) => {
            if (err) throw err;
            console.log("Image mise à jour avec succès.");
        }
    );
};

export default updateImage;