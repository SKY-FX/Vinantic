import { length, pathOr, propOr } from "ramda";
import { isNotNilOrEmpty } from "ramda-adjunct";

export const onSetImagesFromFolder = async ({ onHandle }) => {
  await fetch("/vinanticApi/setImagesFromFolder", {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ data: ''}),
  })
    .then((res) => res.json())
    .then((data) => {
      const result = propOr([], 'result', data);
      onHandle({
        label: 'SET_IMAGES_TO_BASE',
        imagesPathes: result
      });
    })
};

export const onGetImages = async ({ onHandle }) => {
  await fetch("/vinanticApi/getImages")
    .then((res) => res.json())
    .then((data) => {
      const result = propOr([], 'result', data);

      onHandle({
        label: 'GET_IMAGES_FROM_BASE',
        gettedCount: length(result),
        images: result
      })
    });
};

export const onDeleteImages = async ({ onHandle }) => {
  if (isNotNilOrEmpty(onHandle)) {
    await fetch("/vinanticApi/deleteImages", {
      method: 'DELETE'
    })
      .then((res) => res.json())
      .then((data) => {
        const deletedCount = pathOr(0, ['result', 'deletedCount'], data)
        onHandle({
          label: 'DELETE_IMAGES_IN_BASE',
          deletedCount
        });
      });
  }
};

export const onWriteImage = async ({ onHandle, mandelbrotParams }) => {
  if (isNotNilOrEmpty(onHandle) && isNotNilOrEmpty(mandelbrotParams)) {
    await fetch("/vinanticApi/writeImageInFile", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: {
        mandelbrotParams,
        path: './tototata.jpeg'
      }}),
    })
      .then((res) => res.json())
      .then((data) => {
        const isWritedFile = propOr(false, 'result', data)
        onHandle({
          label: 'WRITE_IMAGES_IN_FILE',
          isWritedFile
        });
      });
  }
};