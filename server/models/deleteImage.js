import { gfs } from "../mongoose";

const deleteImage = (imageId) => {
    gfs.remove({ _id: imageId }, (err) => {
        if (err) throw err;
        console.log('Image supprimée avec succès.');
    });
}

export default deleteImage;