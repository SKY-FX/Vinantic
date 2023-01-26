import { always, applySpec, length, map, pathOr, propOr } from "ramda";
import { isNotEmpty, isNotNilOrEmpty } from "ramda-adjunct";

export const onGetBottles = async ({ onHandle }) => {
  await fetch("/vinanticApi/getBottles")
    .then((res) => res.json())
    .then((data) => {
      console.info('onGetBottles', data);
      const result = propOr([], 'result', data);
      // if (isNotEmpty(result)) setWinesList(result);
      onHandle({
        label: 'GET',
        gettedCount: length(result)
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
          label: 'SET',
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
          label: 'DELETE',
          deletedCount
        });
      });
  }
};

export const onFetchXLSX = async ({ filePath, onHandle, setError, XLSX }) => {
  fetch(filePath)
    .then(res => res.arrayBuffer())
    .then(ab => {
    /* Get xlsx data list */
      const wb = XLSX.read(ab, { type: "array" });
      const ws = wb.Sheets["Feuille1"];
      const sheetToJson = XLSX.utils.sheet_to_json(ws);

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
      })(sheetToJson)


      onHandle({
        label: 'SET_FROM_FILE',
        wines: formattedWines
      });
      // setList(formattedWines);


    }).catch(error => setError(error));
};