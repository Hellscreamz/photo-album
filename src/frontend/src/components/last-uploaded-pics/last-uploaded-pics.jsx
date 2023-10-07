/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './LastUploadedPics.css'
function LastTenPhotos() {
    const [photos, setPhotos] = useState([]);

    useEffect(() => {
      axios.get('http://localhost:3000/get-last-ten-photos')
        .then((response) => {
          setPhotos(response.data);
        })
        .catch((error) => {
          console.error('Error fetching photos:', error);
        });
    }, []);

    return (
      <div>
        <h2>Last 10 Photos</h2>
        <div className="photo-list">
          {photos.map((photo) => (
            <div key={photo.id} className="photo-item">
              <img src={photo.imageData} alt={`Photo ${photo.id}`} />
            </div>
          ))}
        </div>
      </div>
    );
}

export default LastTenPhotos;
