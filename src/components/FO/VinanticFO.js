import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { filter, sortBy, prop, pipe, isEmpty } from "ramda";

import AddToCart from "./AddToCart";
import AddToCartModal from "./AddToCartModal";
import classNames from "classnames";
import { mapIndexed } from "ramda-adjunct";
import { onGetBottles } from "../../models/bottlesModels";
import { onGetImages } from "../../models/imagesModels";
import { getImageSource } from "../common";

const VinanticFO = ({ description }) => {
  const [imagesList, setImagesList] = useState([]);
  const [winesList, setWinesList] = useState([]);
  const [selectedWine, setSelectedWine] = useState({});
  const [isAddToCartModal, setIsAddToCartModal] = useState(false);
  const [query, setQuery] = useState("");
  const [sortedBy, setSortedBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [winesPerPage] = useState(50);
  const commonClass = classNames({
    "flex justify-center items-center bg-white opacity-5 transition-opacity duration-500":
      isAddToCartModal,
  });

  useEffect(() => {
    if (isEmpty(winesList) && isEmpty(imagesList)) {
      onGetBottles({ onHandle: onHandleGetBottles });
      onGetImages({ onHandle: onHandleGetImages });
    }
  }, [winesList, imagesList]);

  const onHandleGetBottles = ({ bottles }) => {
    setWinesList(bottles);
  };

  const onHandleGetImages = ({ images }) => {
    setImagesList(images);
  };

  const handleSearch = (event) => {
    setQuery(event.target.value);
    setCurrentPage(1);
  };

  const handleSort = (event) => {
    setSortedBy(event.target.value);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    setCurrentPage(1);
  };

  const filteredWines = pipe(
    filter((wine) => wine.name.toLowerCase().includes(query.toLowerCase())),
    sortBy(prop(sortedBy))
  )(winesList);

  if (sortOrder === "desc") {
    filteredWines.reverse();
  }

  const indexOfLastWine = currentPage * winesPerPage;
  const indexOfFirstWine = indexOfLastWine - winesPerPage;
  const currentWines = filteredWines.slice(indexOfFirstWine, indexOfLastWine);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredWines.length / winesPerPage); i++) {
    pageNumbers.push(i);
  }

  const onAddToCart = ({ wine }) => {
    setIsAddToCartModal(true);
    setSelectedWine(wine);
  };

  return (
    <>
      <div
        className={classNames(
          commonClass,
          "flex flex-col justify-center items-center text-center"
        )}
      >
        <div className="flex flex-col justify-center items-center w-2/3 border-b p-10">
          <h1 className="text-4xl my-20">VINANTIC</h1>
          <h2 className="mb-5">{prop("head", description)}</h2>
          <h2 className="mb-5">{prop("content_1", description)}</h2>
          <h2>{prop("content_2", description)}</h2>
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

          <div className="justify-center grid gap-5 2xl:grid-cols-5 xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1">
            {mapIndexed((bottle, idx) => {
              const imageSrc = getImageSource({ bottle, imagesList });

              return (
                <div key={`wineCard-${idx}`} className="rounded-3xl shadow-md">
                  <div className="bg-stone-100 flex flex-col border rounded-3xl h-full justify-between">
                    <div className="m-4">
                      {imageSrc && (
                        <img
                          src={imageSrc}
                          alt={bottle.name}
                          className="border-2 border-stone-300 rounded-3xl transition duration-1000 ease-in-out transform hover:scale-150"
                        />
                      )}
                      <div className="mt-7">
                        <p className="font-serif font-bold text-xl mb-2 text-gray-500">
                          {prop("name", bottle)}
                        </p>
                        <p className="font-serif text-gray-700 text-base-sm mt-2">
                          {prop("year", bottle)}
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 mb-5">
                      <button
                        onClick={() => onAddToCart({ bottle })}
                        className="border font-serif bg-gray-50 hover:bg-green-100 text-black font-medium py-3 px-6 rounded-xl hover: duration-500"
                      >
                        Ajouter au panier
                      </button>
                      <p className="font-serif text-gray-400 text-base-sm font-medium mt-2">
                        {prop("price", bottle)} €
                      </p>
                    </div>
                  </div>
                </div>
              );
            })(currentWines)}
          </div>

          <div className="my-4 flex justify-center">
            {mapIndexed((number, idx) => (
              <button
                key={`pagination-${idx}`}
                className={`bg-white text-gray-800 font-medium py-2 px-4 rounded-full m-2 ${
                  currentPage === number ? "bg-indigo-500 text-white" : ""
                }`}
                onClick={() => setCurrentPage(number)}
              >
                {number}
              </button>
            ))(pageNumbers)}
          </div>
        </div>
      </div>
      <>
        {isAddToCartModal && (
          <AddToCartModal
            isOpen={isAddToCartModal}
            onClose={() => setIsAddToCartModal(false)}
            selectedWine={selectedWine}
          >
            <AddToCart onClose={() => setIsAddToCartModal(false)} />
          </AddToCartModal>
        )}
      </>
    </>
  );
};

export default VinanticFO;

VinanticFO.propTypes = {
  description: PropTypes.object.isRequired,
};
