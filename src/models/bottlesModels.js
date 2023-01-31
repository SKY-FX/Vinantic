import { always, applySpec, length, map, pathOr, propOr } from "ramda";
import { isNotEmpty, isNotNilOrEmpty } from "ramda-adjunct";

export const onGetBottles = async ({ onHandle }) => {
  await fetch("/vinanticApi/getBottles")
    .then((res) => res.json())
    .then((data) => {
      console.info('onGetBottles', data);
      const result = propOr([], 'result', data);

      onHandle({
        label: 'GET_BOTTLES_FROM_BASE',
        gettedCount: length(result),
        bottles: result
      })
    });
};

export const onGetImages = async ({ onHandle }) => {
  await fetch("/vinanticApi/getImages")
    .then((res) => res.json())
    .then((data) => {
      console.info('onGetImages', data);
      const result = propOr([], 'result', data);

      onHandle({
        label: 'GET_IMAGES_FROM_BASE',
        gettedCount: length(result),
        images: result
      })
    });
};

export const onCreateBottle = async () => {
  await fetch("/vinanticApi/createBottle", {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ data: {
      name: 'Château Pétrus',
      price: '3350',
      year: '2000',
      quality: 'Très bonne',
      image: '',
    }}),
  })
    .then((res) => res.json())
    .then((data) => {
      console.info('onCreateBottle', data)
    });
};

export const onSetBottles = async ({ onHandle, winesList: bottles }) => {
  if (isNotEmpty(bottles)) {
    await fetch("/vinanticApi/setBottles", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: bottles}),
    })
      .then((res) => res.json())
      .then((data) => {
        const result = propOr([], 'result', data);
        console.info('onSetBottles', result);
        onHandle({
          label: 'SET_BOTTLES_TO_BASE',
          settedCount: length(result)
        });
      })
  }
};

export const onDeleteBottles = async ({ onHandle }) => {
  if (isNotNilOrEmpty(onHandle)) {
    await fetch("/vinanticApi/deleteBottles", {
      method: 'DELETE'
    })
      .then((res) => res.json())
      .then((data) => {
        const deletedCount = pathOr(0, ['result', 'deletedCount'], data)
        console.info('onDeleteBottles', { deletedCount });
        onHandle({
          label: 'DELETE_BOTTLES_IN_BASE',
          deletedCount
        });
      });
  }
};

export const onDeleteImages = async ({ onHandle }) => {
  if (isNotNilOrEmpty(onHandle)) {
    await fetch("/vinanticApi/deleteImages", {
      method: 'DELETE'
    })
      .then((res) => res.json())
      .then((data) => {
        const deletedCount = pathOr(0, ['result', 'deletedCount'], data)
        console.info('onDeleteImages', { deletedCount });
        onHandle({
          label: 'DELETE_IMAGES_IN_BASE',
          deletedCount
        });
      });
  }
};

export const onGetBottlesFromFile = ({ onHandle, event, XLSX, setError }) => {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = event => {
    const bstr = event.target.result;
    const workbook = XLSX.read(bstr, { type: 'binary' });
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet);

    const formattedWines = map(wine => {
      // const imageRef = toLower(prop('Référence', wine));
      // const imageFromFolder = find(propEq('name', imageRef))(imagesFromFolder);
      const updatedWine = applySpec({
        name: propOr('', 'Château'),
        year: propOr(0, 'Année'),
        price: propOr(0, 'Prix sur le marché'),
        quality: propOr('bonne', 'Qualité'),
        image: always('image') // () => propOr('', 'importedPhoto', imageFromFolder)
      })(wine);
      return updatedWine;
    })(jsonData)


    onHandle({
      label: 'GET_BOTTLES_FROM_FILE',
      wines: formattedWines
    });

  };

  reader.onerror = error => {
    setError(error);
  };

  reader.readAsBinaryString(file);
};

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