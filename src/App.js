import React from 'react';
import { applySpec, find, isEmpty, map, prop, propEq, propOr, toLower, toString } from 'ramda';
import { useEffect, useState } from 'react';
import XLSX from "xlsx/dist/xlsx.full.min";

import { INPUT_XLS_PATH, VINANTIC_DESCRIPTION } from './components/FO/constants';
// import { onCreateBottle, onDeleteBottles, onGetBottles, onSetBottles } from './models/bottlesModels';
// import VinanticFO from './components/FO/VinanticFO';
import VinanticBO from './components/BO/VinanticBO';

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
  const [setError] =  useState('');

  useEffect(() => {
    const fetchImages = async () => {
      fetch(INPUT_XLS_PATH)
        .then(res => res.arrayBuffer())
        .then(ab => {
        /* Get xlsx data list */
          const wb = XLSX.read(ab, { type: "array" });
          const ws = wb.Sheets["Feuille1"];
          const sheetToJson = XLSX.utils.sheet_to_json(ws);

          const formattedWines = map(wine => {
            const imageRef = toLower(prop('Référence', wine));
            const imageFromFolder = find(propEq('name', imageRef))(imagesFromFolder);
            const updatedWine = applySpec({
              name: propOr('', 'Château'),
              year: propOr(0, 'Année'),
              price: propOr(0, 'Prix sur le marché'),
              quality: propOr('bonne', 'Qualité'),
              image: () => propOr('', 'importedPhoto', imageFromFolder)
            })(wine);

            return updatedWine;
          })(sheetToJson)

          setWinesList(formattedWines);
        }).catch(error => setError(error));
    };

    if (isEmpty(winesList)) fetchImages();
  }, [winesList]);



  return (
    <div className='flex flex-col h-screen border-4 border-red-200'>
      <VinanticBO wines={winesList} description={VINANTIC_DESCRIPTION} />
    </div>
  );
}

export default App;
