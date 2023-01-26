import React from 'react';
import { applySpec, find, isEmpty, map, prop, propEq, propOr, toLower, toString } from 'ramda';
import { useEffect, useState } from 'react';
import XLSX from "xlsx/dist/xlsx.full.min";

import { INPUT_XLS_PATH, VINANTIC_DESCRIPTION } from './components/constants';
import WineList from './components/VinanticPage';

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

  const onGetBottles = async () => {
    await fetch("/vinanticApi/getBottles")
      .then((res) => res.json())
      .then((data) => {
        console.info('onGetBottles', data)
      });
  };

  const onCreateBottle = async () => {
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

  const onSetBottles = async (bottles) => {
    await fetch("/vinanticApi/setBottles", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: bottles}),
    })
      .then((res) => res.json())
      .then((data) => {
        console.info('onSetBottles', data)
      })
  };
  const onDeleteBottles = async () => {
    await fetch("/vinanticApi/deleteBottles", {
      method: 'DELETE'
    })
      .then((res) => res.json())
      .then((data) => {
        console.info('onDeleteBottles', data)
      });
  }

  return (
    <div className='flex flex-col'>
      <button onClick={onCreateBottle}>CREATE BOTTLE</button>
      <button onClick={onGetBottles}>GET BOTTLES</button>
      <button onClick={onDeleteBottles}>DELETE BOTTLES</button>
      <button onClick={() => onSetBottles(winesList)}>SET BOTTLES</button>
      <WineList wines={winesList} description={VINANTIC_DESCRIPTION} />
    </div>
  );
}

export default App;
