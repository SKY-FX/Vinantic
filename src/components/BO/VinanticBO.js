import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';

import { INPUT_XLS_PATH } from "../FO/constants";
import { equals, length } from "ramda";
import XLSX from "xlsx/dist/xlsx.full.min";
import { isNotEmpty } from "ramda-adjunct";
import { onDeleteBottles, onFetchXLSX, onGetBottles, onSetBottles } from "../../models/bottlesModels";

const VinanticBO = () => {
  const [winesList, setWinesList] = useState([]);
  const [setError] =  useState('');
  const [warning, setWarning] =  useState('');
  const [isWaiting, setIsWaiting] =  useState(false);

  useEffect(() => {
    if (isNotEmpty(winesList)) console.info('winesList', winesList);
  }, [winesList]);

  const handleGetXLSX = async () => {
    onFetchXLSX({ onHandle, filePath: INPUT_XLS_PATH, setError, XLSX });
  };

  const handleSetBottles = async () => {
    if (isNotEmpty(winesList)) {
      onSetBottles({ onHandle, winesList });
      setIsWaiting(true);
    }
  };

  const handleDeleteBottles = async () => {
    onDeleteBottles({ onHandle });
    setIsWaiting(true);
  };

  const handleGetBottles = async () => {
    onGetBottles({ onHandle });
    setIsWaiting(true);
  };

  const onHandle = ({ label, deletedCount, gettedCount, settedCount, wines }) => {
    if (equals(label, 'DELETE')) {
      setWarning(`La base de donnée est vide. ${deletedCount} bouteilles ont été supprimées`);
      console.info('onHandle', label);
    } else if (equals(label, 'GET')) {
      setWarning(`La base de donnée est composé de ${gettedCount} bouteille(s)`);
      console.info('onHandle', label);
    } else if (equals(label, 'SET')) {
      setWarning(`La base de donnée a été mis à jour de ${settedCount} bouteille(s)`);
      console.info('onHandle', label);
    } else if (equals(label, 'SET_FROM_FILE')) {
      setWinesList(wines);
      console.info('onHandle', label);
    }
    setIsWaiting(false);
  }

  return (
    <div className="flex flex-col h-screen">
      { isWaiting
        ? <div className="flex flex-row justify-center items-center h-screen">
          <div role="status">
            <svg aria-hidden="true" className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-green-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
        : <>
          <div className="flex justify-around my-10">
            <button className='border p-5 text-xl w-48' onClick={handleGetXLSX}>GET BOTTLES FROM FILE</button>
            <div className="flex flex-col">
              <button className='border p-5 text-xl w-48' onClick={handleDeleteBottles}>DELETE BOTTLES FROM BASE</button>
              { isNotEmpty(winesList) && <button className='border p-5 text-xl w-48' onClick={handleSetBottles}>SET BOTTLES TO BASE</button>}
              <button className='border p-5 text-xl w-48' onClick={handleGetBottles}>GET BOTTLES FROM BASE</button>
            </div>
          </div>

          <div className="w-full text-center p-5 border-b-2">
            <>
              { isNotEmpty(winesList)
                ? <p>Il y a { length(winesList) } bouteilles de vins référencées dans le fichier</p>
                : <p>Aucune bouteille a envoyer en base ! Importez depuis un fichier.</p>
              }
              {isNotEmpty(warning) && <p>{warning}</p>}
            </>
          </div>
        </>
      }
    </div>

  )
};

// const getImagesfromFolder = async () => {
//   const imagesFromFolder = [{}];
//   for (let i = 1; i <= 53; i++) {
//     const refNumber = (toString(i)).padStart(4, '0');
//     try {
//       imagesFromFolder.push({
//         name: `ref_${refNumber}`,
//         importedPhoto: require(`./assets/images/ref_${refNumber}.jpg`)
//       });
//     } catch (error) {
//       if (error.code === 'MODULE_NOT_FOUND') {
//         console.error(`File not found: ref_${refNumber}.jpg`);
//       } else {
//         throw error;
//       }
//     }
//   }
// };

export default VinanticBO;

VinanticBO.propTypes = {
  wines: PropTypes.array.isRequired,
  description: PropTypes.object.isRequired
};