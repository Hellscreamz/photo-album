import React, { useState } from 'react';

import { axiosWithAuth } from '../../../../auth/auth';

function PhotoUpload() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    place: '',
    photo: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, photo: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('description', formData.description);
      data.append('place', formData.place);
      data.append('photo', formData.photo);

      const response = await axiosWithAuth.post('/upload-photo', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Photo uploaded successfully:', response.data);

      // Reset the form
      setFormData({
        title: '',
        description: '',
        place: '',
        photo: null,
      });
    } catch (error) {
      console.error('Error uploading photo:', error);
    }
  };

  return (
    <div>
      <h2>Upload a Photo</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="place"
          placeholder="Place"
          value={formData.place}
          onChange={handleInputChange}
        />
        <input
          type="file"
          name="photo"
          accept="image/*" // Allow only image files
          onChange={handleFileChange}
        />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}

export default PhotoUpload;