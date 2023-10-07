import React, { useState, useRef } from 'react';
import { axiosWithAuth } from '../../../auth/auth';
import './UploadPhoto.css'

function PhotoUpload() {
  const [formData, setFormData] = useState({
    photo: null,
  });

  // Create a ref for the file input
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, photo: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append('photo', formData.photo);

      const response = await axiosWithAuth.post('/upload-photo', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Photo uploaded successfully:', response.data);

      setFormData({
        photo: null,
      });

      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

    } catch (error) {
      console.error('Error uploading photo:', error);
    }
  };

  return (
    <div className="photo-upload-container"> {/* Apply the CSS class */}
      <h2>Upload a Photo</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          name="photo"
          accept="image/*"
          onChange={handleFileChange}
          ref={fileInputRef}
          className="photo-upload-input"
        />
        <button type="submit" className="photo-upload-button">Upload</button> {/* Apply the CSS class */}
      </form>
    </div>
  );
}

export default PhotoUpload;
