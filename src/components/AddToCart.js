import React, { useState } from "react";
import PropTypes from 'prop-types';

const AddToCart = ({ onClose }) => {
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = event => {
    event.preventDefault();
    // Code pour ajouter le vin au panier avec la quantité sélectionnée
    console.info('AJOUT PANIER', quantity);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className='flex flex-col items-center'>
      <div className="w-full px-3 text-center">
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-zip">
            Quantité
        </label>
        <input
          className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id="grid-zip"
          type="number"
          min={1}
          defaultValue={1}
          placeholder="1"
          onChange={(event) => setQuantity(event.target.value)}
        />
      </div>
      <div className="mt-5">
        <button className="bg-indigo-500 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg hover:transition-opacity duration-500">
            Ajouter au panier
        </button>
      </div>
    </form>
  );
};

export default AddToCart;

AddToCart.propTypes = {
  onClose: PropTypes.func.isRequired
};