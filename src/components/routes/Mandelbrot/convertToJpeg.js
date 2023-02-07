import { isNotNilOrEmpty } from 'ramda-adjunct';
import { onWriteImage } from '../../../models/imagesModels';

export const convertToJpeg = ({ onHandle, mandelbrotParams }) => {
  if (isNotNilOrEmpty(mandelbrotParams) && isNotNilOrEmpty(onHandle)) {
    onWriteImage({ onHandle, mandelbrotParams });
  }
};
