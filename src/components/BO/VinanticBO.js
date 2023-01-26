import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';

import { INPUT_XLS_PATH } from "../FO/constants";
import { applySpec, isEmpty, map, propOr } from "ramda";
import XLSX from "xlsx/dist/xlsx.full.min";
import { isNotEmpty } from "ramda-adjunct";


// import { filter, sortBy, prop, pipe } from "ramda";

// import AddToCart from "./AddToCart";
// import AddToCartModal from "./AddToCartModal";
// import classNames from 'classnames';
// import { mapIndexed } from "ramda-adjunct";
// import { onCreateBottle, onDeleteBottles, onGetBottles, onSetBottles } from "../../models/bottlesModels";

const VinanticBO = () =>
// const [selectedWine, setSelectedWine] = useState({});
// const [isAddToCartModal, setIsAddToCartModal] = useState(false);
// const [query, setQuery] = useState("");
// const [sortedBy, setSortedBy] = useState("name");
// const [sortOrder, setSortOrder] = useState("asc");
// const [currentPage, setCurrentPage] = useState(1);
// const [winesPerPage] = useState(10);
// const commonClass = classNames({ 'flex justify-center items-center bg-white opacity-5 transition-opacity duration-500': isAddToCartModal })

// const handleSearch = (event) => {
//   setQuery(event.target.value);
//   setCurrentPage(1);
// };

// const handleSort = (event) => {
//   setSortedBy(event.target.value);
//   setSortOrder(sortOrder === "asc" ? "desc" : "asc");
//   setCurrentPage(1);
// };

// const filteredWines = pipe(
//   filter((wine) =>
//     wine.name.toLowerCase().includes(query.toLowerCase())
//   ),
//   sortBy(prop(sortedBy))
// )(wines);

// if (sortOrder === "desc") {
//   filteredWines.reverse();
// }

// const indexOfLastWine = currentPage * winesPerPage;
// const indexOfFirstWine = indexOfLastWine - winesPerPage;
// const currentWines = filteredWines.slice(indexOfFirstWine, indexOfLastWine);

// const pageNumbers = [];
// for (let i = 1; i <= Math.ceil(filteredWines.length / winesPerPage); i++) {
//   pageNumbers.push(i);
// }

// const onAddToCart = ({ wine }) => {
//   setIsAddToCartModal(true);
//   setSelectedWine(wine);
// };



{
  const [winesList, setWinesList] = useState([]);
  const [setError] =  useState('');

  useEffect(() => {
    if (isNotEmpty(winesList)) console.info('winesList', winesList);
  }, [winesList]);

  const fetchXLSX = async ({ filePath, setList }) => {
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
            image: '' // () => propOr('', 'importedPhoto', imageFromFolder)
          })(wine);
          return updatedWine;
        })(sheetToJson)

        setList(formattedWines);
      }).catch(error => setError(error));
  };

  const handleGetXLSX = async () => {
    // const bottles = onGetBottles();
    // getImagesfromFolder();
    if (isEmpty(winesList)) {
      fetchXLSX({ filePath: INPUT_XLS_PATH, setList: setWinesList});
    }
  };

  return (<>
    {/* <button onClick={onCreateBottle}>CREATE BOTTLE</button> */}
    <button onClick={handleGetXLSX}>GET BOTTLES</button>
    {/* <button onClick={onDeleteBottles}>DELETE BOTTLES</button>
    <button onClick={() => onSetBottles(winesList)}>SET BOTTLES</button> */}

    {/* <div className={classNames(commonClass, "flex flex-col justify-center items-center text-center")}>
        <div className="flex flex-col justify-center items-center w-2/3 border-b p-10">
          <h1 className="text-4xl my-20">VINANTIC</h1>
          <h2 className="mb-5">{prop('head', description)}</h2>
          <h2 className="mb-5">{prop('content_1', description)}</h2>
          <h2>{prop('content_2', description)}</h2>
        </div>
        <div className="mt-10 px-20 w-full">
          <div className="flex mb-10">
            <input
              type="text"
              placeholder="Recherche..."
              className="border p-2"
              onChange={handleSearch}
            />
            <select
              className="border p-2 ml-5"
              value={sortedBy}
              onChange={handleSort}
            >
              <option value="name">Nom</option>
              <option value="year">Année</option>
              <option value="price">Prix</option>
            </select>
          </div>
          <div className="flex flex-col justify-center grid gap-16 2xl:grid-cols-6 xl:grid-cols-4 md:grid-cols-3 xs:grid-cols-2">
            { mapIndexed((wine, idx) =>
              <div key={`wineCartModal-${idx}`} className="max-w-sm rounded overflow-hidden shadow-lg">
                <div
                  key={`wineCard-${idx}`}
                  className="flex flex-col border h-full justify-between"
                >
                  <div>
                    <img src={prop('image', wine)} alt={wine.name}/>
                    <div className="px-6 py-4">
                      <div className="font-bold text-xl mb-2">{wine.name}</div>
                      <p className="text-gray-700 text-base-sm">{wine.year}</p>
                      <p className="text-gray-700 text-base-sm">{wine.price} €</p>
                    </div>
                  </div>

                  <div className="px-6 py-4">
                    <button onClick={() => onAddToCart({ wine } )} className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-4 rounded-full hover:transition-opacity duration-500">Ajouter au panier</button>
                  </div>
                </div>
              </div>
            )(currentWines)}
          </div>
          <div className="my-4 flex justify-center">
            {mapIndexed((number, idx) => (
              <button
                key={`pagination-${idx}`}
                className={`bg-white text-gray-800 font-medium py-2 px-4 rounded-full m-2 ${currentPage === number ? 'bg-indigo-500 text-white' : ''}`}
                onClick={() => setCurrentPage(number)}
              >
                {number}
              </button>
            ))(pageNumbers)}
          </div>
        </div>
      </div>
      <>
        { isAddToCartModal && <AddToCartModal
          isOpen={isAddToCartModal}
          onClose={() => setIsAddToCartModal(false)}
          selectedWine={selectedWine}
        >
          <AddToCart
            onClose={() => setIsAddToCartModal(false)}/>
        </AddToCartModal>
        }
      </> */}
  </>)
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