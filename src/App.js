import React from 'react';
import { applySpec, find, isEmpty, map, prop, propEq, toLower, toString } from 'ramda';
import { useEffect, useState } from 'react';
import XLSX from "xlsx/dist/xlsx.full.min";

import { INPUT_XLS_PATH, VINANTIC_DESCRIPTION } from './components/constants';
import WineList from './components/VinanticPage';
// import createBottle from '../server/models/createBottle';

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

    fetch("/vinanticApi/createBottle", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: {
        name: 'Château Pétrus',
        price: '3350',
        year: '2000',
        quality: 'Très bonne',
        imageBuffer: '',
      }}),
    })
    .then((res) => res.json())
    .then((data) => {
      console.info('data', data)
    });

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
              return applySpec({
                name: prop('Château'),
                year: prop('Année'),
                price: prop('Prix sur le marché'),
                image: () => prop('importedPhoto', imageFromFolder)
              })(v)
            })(sheetToJson)

            setWinesList(formattedWines);
        }).catch(error => setError(error));
    };
    if (isEmpty(winesList)) fetchImages();
  }, [winesList]);
  return (
    <WineList wines={winesList} description={VINANTIC_DESCRIPTION} />
  );
}

export default App;
