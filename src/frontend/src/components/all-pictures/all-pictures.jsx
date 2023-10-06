/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AllPictures() {
  const [pictures, setPictures] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    // Function to fetch pictures for the current page
    const fetchPictures = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/get-all-pictures?page=${currentPage}`);
        setPictures(response.data.pictures);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error('Error fetching pictures:', error);
      }
    };

    fetchPictures();
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      <h2>All Pictures</h2>
      <div className="picture-list">
        {pictures.map((picture) => (
          <div key={picture.id} className="picture-item">
            <img src={picture.imageData} alt={`Picture ${picture.id}`} />
            {/* Add other picture details as needed */}
          </div>
        ))}
      </div>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button key={index} onClick={() => handlePageChange(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default AllPictures;
