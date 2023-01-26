import { gfs } from "../mongoose";

const getImage = (imageId) => {
  gfs.findOne({ _id: imageId }, (err, file) => {
    if (err) throw err;
    if (!file) {
      console.log("Aucune image trouvée.");
      return;
    }
    // Retourne un flux de données pour l'image trouvée
    return file.stream;
  });
};

export default getImage;