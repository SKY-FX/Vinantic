import { applySpec, find, isEmpty, map, pipe, pluck, prop, propEq, tap, toLower, toString } from 'ramda';
import { useEffect, useState } from 'react';
import XLSX from "xlsx/dist/xlsx.full.min";

import { INPUT_XLS_PATH, VINANTIC_DESCRIPTION } from './components/constants';
import WineList from './components/VinanticPage';

/* Get images data list */
// const getImagesfromFolder = async () => {
  const imagesFromFolder = [{}];
  for (let i = 1; i <= 53; i++) {
    const refNumber = (toString(i)).padStart(4, '0');
    try {
      imagesFromFolder.push({
        name: `ref_${refNumber}`,
        importedPhoto: require(`./assets/images/ref_${refNumber}.jpg`)
      });
    } catch (error) {
      if (error.code === 'MODULE_NOT_FOUND') {
        console.error(`File not found: ref_${refNumber}.jpg`);
      } else {
        throw error;
      }
    }
  }
// };


const App = () => {
  const [winesList, setWinesList] = useState([]);
  const [error, setError] =  useState('');

  useEffect(() => {
    const fetchImages = async () => {
        fetch(INPUT_XLS_PATH)
          .then(res => res.arrayBuffer())
          .then(ab => {

            /* Get xlsx data list */
            const wb = XLSX.read(ab, { type: "array" });
            const ws = wb.Sheets["Feuille1"];
            const sheetToJson = XLSX.utils.sheet_to_json(ws);

            /* Get imagesfromFolder */
            // const imagesfromFolder = awaitgetImagesfromFolder();

            const formattedWines = map(v => {
              const imageRef = toLower(prop('Référence', v));

              const imageFromFolder = find(propEq('name', imageRef))(imagesFromFolder);
              console.info('imageref', imageFromFolder);
              return applySpec({
                name: prop('Château'),
                year: prop('Année'),
                price: prop('Prix sur le marché'),
                image: () => prop('importedPhoto', imageFromFolder)
              })(v)
            })(sheetToJson)

            setWinesList(formattedWines);

            console.info('formattedWines', {sheetToJson, formattedWines, imagesFromFolder});

        }).catch(error => setError(error));
    };
    if (isEmpty(winesList)) fetchImages();
  }, [winesList]);

  console.info('winesList', winesList);
  return (
      <WineList wines={winesList} description={VINANTIC_DESCRIPTION} />
  );
}

export default App;
