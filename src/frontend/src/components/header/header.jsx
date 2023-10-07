import React, { useState } from 'react';
import LastTenPhotos from '../last-uploaded-pics/last-uploaded-pics';
import AllPictures from '../all-pictures/all-pictures';
import Users from '../user/users/users';

function HeaderMenu() {
  const [showLastTenPhotos, setShowLastTenPhotos] = useState(false);
  const [showAllPictures, setShowAllPictures] = useState(false);
  const [showAllUsers, setShowAllUsers] = useState(false);

  const handleGetStartedClick = (e) => {
    e.preventDefault();
    setShowLastTenPhotos(true);
    setShowAllPictures(false);
    setShowAllUsers(false);
  };

  const handlePicturesClick = (e) => {
    e.preventDefault();
    setShowLastTenPhotos(false);
    setShowAllPictures(true);
    setShowAllUsers(false);
  };

  const handleUsersClick = (e) => {
    e.preventDefault();
    setShowLastTenPhotos(false);
    setShowAllPictures(false);
    setShowAllUsers(true);
  };

  return (
    <header>
      <nav>
        <a href="/" onClick={handleGetStartedClick}>GetStarted</a>
        <a href="/pictures" onClick={handlePicturesClick}>Pictures</a>
        <a href="/users" onClick={handleUsersClick}>Users</a>
        <a href="/contacts">Contacts</a>
      </nav>
      {showLastTenPhotos && <LastTenPhotos />}
      {showAllPictures && <AllPictures />}
      {showAllUsers && <Users />}
    </header>
  );
}

export default HeaderMenu;
