import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminStatistics.css'; // Import the CSS file

const AdminStatistics = () => {
  const [statistics, setStatistics] = useState({
    last5Users: [],
    last5Photos: [],
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAdminStatistics = async () => {
      try {
        const jwtToken = localStorage.getItem('token');
        if (!jwtToken) {
          return;
        }

        const response = await axios.get('http://localhost:3000/admin-statistics', {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        });

        if (response.status === 200) {
          setStatistics(response.data);
        } else {
          setError('Failed to fetch admin statistics');
        }
      } catch (error) {
        console.error('Error fetching admin statistics:', error);
        setError('Internal Server Error');
      }
    };

    fetchAdminStatistics();
  }, []);

  return (
    <div className="admin-statistics-container">
      <h3>Admin Statistics</h3>
      {error ? (
        <div className="admin-statistics-error">Statistics are not available</div>
      ) : (
        <div>
          <h3>Last 5 Users:</h3>
          <ul className="admin-statistics-list">
            {statistics.last5Users.map((user) => (
              <li key={user.id} className="admin-statistics-list-item">
                {user.firstName} {user.lastName}
              </li>
            ))}
          </ul>
          <h3>Last 5 Photos:</h3>
          <ul className="admin-statistics-list">
            {statistics.last5Photos.map((photo) => (
              <li key={photo.id} className="admin-statistics-list-item">
                Photo by {photo.User.firstName} {photo.User.lastName}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AdminStatistics;
