import { equals, find, head, last, prop, propOr, split, toLower } from "ramda";
import { Buffer } from 'buffer';

export const getImageSource = ({ bottle, imagesList }) => {
  const imageRef = toLower(prop('ref', bottle));
  const foundedImage = find(image => {
    const imagePath = propOr('', 'filename', image);
    const splittedName = head(split('.', last(split("\\", imagePath))));
    if (equals(splittedName, imageRef)) return image
  })(imagesList);

  return foundedImage && `data:${foundedImage.contentType};base64,${Buffer.from(foundedImage.data.data).toString('base64')}`;
}