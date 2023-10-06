import React, { useState } from 'react';
import LastTenPhotos from '../last-uploaded-pics/last-uploaded-pics';
import AllPictures from '../all-pictures/all-pictures';

function HeaderMenu() {
  const [showLastTenPhotos, setShowLastTenPhotos] = useState(false);
  const [showAllPictures, setShowAllPictures] = useState(false);

  const handleGetStartedClick = (e) => {
    e.preventDefault();
    setShowLastTenPhotos(true);
    setShowAllPictures(false); // Hide All Pictures
  };

  const handlePicturesClick = (e) => {
    e.preventDefault();
    setShowLastTenPhotos(false); // Hide Last 10 Photos
    setShowAllPictures(true);
  };

  return (
    <header>
      <nav>
        <a href="/" onClick={handleGetStartedClick}>GetStarted</a>
        <a href="/pictures" onClick={handlePicturesClick}>Pictures</a>
        <a href="/users">Users</a>
        <a href="/contacts">Contacts</a>
      </nav>
      {showLastTenPhotos && <LastTenPhotos />}
      {showAllPictures && <AllPictures />}
    </header>
  );
}

export default HeaderMenu;
