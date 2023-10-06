/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { axiosWithAuth } from '../../auth/auth';

function AllPictures({ loggedInUserId }) {
  const [photos, setPhotos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchPictures = async (page) => {
    try {
      const response = await axios.get(`http://localhost:3000/get-all-pictures?page=${page}`);
      setPhotos(response.data.pictures);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching pictures:', error);
    }
  };

  useEffect(() => {
    fetchPictures(currentPage);
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleCommentSubmit = async (photoId, commentText) => {
    try {
      await axiosWithAuth.post(`http://localhost:3000/submit-comment/${photoId}`, {
        commentText,
      });
      // Refresh the photos to update the comments after submission
      fetchPictures(currentPage);
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleDeletePhoto = async (photoId) => {
    if (window.confirm('Are you sure you want to delete this photo?')) {
      try {
        await axiosWithAuth.delete(`http://localhost:3000/delete-photo/${photoId}`);
        // Refresh the photos after deletion
        fetchPictures(currentPage);
      } catch (error) {
        console.error('Error deleting photo:', error);
      }
    }
  };

  return (
    <div>
      <h2>All Pictures</h2>
      {photos ? (
        <div className="photo-list">
          {photos.map((photo) => (
            <div key={photo.id} className="photo-item">
              <img src={photo.imageData} alt={`Photo ${photo.id}`} />
              <div>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const commentText = e.target.comment.value;
                    handleCommentSubmit(photo.id, commentText);
                    e.target.comment.value = '';
                  }}
                >
                  <input type="text" name="comment" placeholder="Add a comment" />
                  <button type="submit">Submit</button>
                </form>
                <div className="comments">
                  {photo.comments && photo.comments.map((comment) => (
                    <div key={comment.id} className="comment">
                      {comment.text}
                    </div>
                  ))}
                </div>
              </div>
              {/* Show delete button if the viewer is the author */}
              {loggedInUserId === photo.userId && (
                <button onClick={() => handleDeletePhoto(photo.id)}>Delete</button>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={currentPage === index + 1 ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default AllPictures;
