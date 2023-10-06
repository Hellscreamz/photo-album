import React, { useState } from 'react';
import LastTenPhotos from '../last-uploaded-pics/last-uploaded-pics';

function HeaderMenu() {
  const [showLastTenPhotos, setShowLastTenPhotos] = useState(false);

  const handleGetStartedClick = (e) => {
    e.preventDefault();
    setShowLastTenPhotos(true);
  };

  return (
    <header>
      <nav>
        <a href="/" onClick={handleGetStartedClick}>GetStarted</a>
        <a href="/pictures">Pictures</a>
        <a href="/users">Users</a>
        <a href="/contacts">Contacts</a>
      </nav>
      {showLastTenPhotos && <LastTenPhotos />}
    </header>
  );
}

export default HeaderMenu;
