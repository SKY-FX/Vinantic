import React, { useState } from 'react';
import { pipe, ifElse, prop } from 'ramda';

const AddToCartModal = ({ isOpen, onClose, selectedWine, children }) => {
  const [isVisible, setIsVisible] = useState(isOpen);

  const handleClose = () => {
    setIsVisible(false);
    onClose();
  };

  const showModal = pipe(
    ifElse(
      () => isVisible,
      () => (
        <div className="fixed top-0 left-0 h-full w-full flex items-center justify-center transition-opacity duration-500">
          <div className="bg-black rounded-lg py-10 px-16 2xl:w-2/6 xl:w-2/5 md:w-3/5 xs:w-4/5">
            <div className="text-center">
              <h2 className="text-xl font-medium text-white">Ajout au panier</h2>
            </div>
            <div className='my-10 rounded-lg p-10 border bg-white'>
              <div className="flex flex-col text-center mb-5 border-b border-black">
                <p className="text-gray-600">{prop('name', selectedWine)}</p>
                <p className="text-gray-600">{prop('price', selectedWine)} €</p>
                <p className="text-gray-600">{prop('year', selectedWine)}</p>
                <img src={prop('image', selectedWine)} alt={prop('name', selectedWine)} className="w-full h-full py-5" />
              </div>
              <div className='pt-5'>
                {children}
              </div>
            </div>
            <div className="flex justify-center items-center">
              <button onClick={handleClose} className="bg-black hover:bg-indigo-700 text-white py-1 px-4 rounded-full hover:transition-opacity duration-500">
                  Continuer les achats
              </button>
              <div onClick={handleClose} className="cursor-pointer">
                <p className="inline-block text-indigo-500 hover:text-indigo-700 ml-4 hover:transition-opacity duration-500">Voir le panier</p>
              </div>
            </div>
          </div>
        </div>
      ),
      () => null
    )
  );

  return showModal();
};

export default AddToCartModal;