import React, { useState, useEffect } from "react";
import axios from "axios";
import { map, prop } from "ramda";

const API_KEY = "33033230-53536bcc8125f9964e82f8dbb";
const apiSearch = "vin";

const ImageSearch = () => {
  const [searchTerm, setSearchTerm] = useState("vin");
  const [images, setImages] = useState([]);

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const fetchImages = async () => {
      const response = await axios.get(
        `https://pixabay.com/api/?key=${API_KEY}&q=${apiSearch}&image_type=photo`
      );
      const images = map(prop("largeImageURL"), response.data.hits);
      setImages(images);
    };
    if (searchTerm) {
      fetchImages();
    }
  }, [searchTerm]);

  return (
    <div>
      <input type="text" onChange={handleSearch} value={searchTerm} />
      <ul>
        {images.map(image => (
          <li key={image}>
            <img src={image} alt={searchTerm} />
          </li>
        ))}
      </ul>
    </div> );
};

export default ImageSearch;
