import React, { useState } from 'react';
import LastTenPhotos from '../last-uploaded-pics/last-uploaded-pics';
import AllPictures from '../all-pictures/all-pictures';
import Users from '../user/users/users';
import ContactForm from '../contacts/send-message/send-message';
import './Header.css'
function HeaderMenu() {
  const [showLastTenPhotos, setShowLastTenPhotos] = useState(false);
  const [showAllPictures, setShowAllPictures] = useState(false);
  const [showAllUsers, setShowAllUsers] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);

  const handleGetStartedClick = (e) => {
    e.preventDefault();
    setShowLastTenPhotos(true);
    setShowAllPictures(false);
    setShowAllUsers(false);
    setShowContactForm(false);
  };

  const handlePicturesClick = (e) => {
    e.preventDefault();
    setShowLastTenPhotos(false);
    setShowAllPictures(true);
    setShowAllUsers(false);
    setShowContactForm(false);
  };

  const handleUsersClick = (e) => {
    e.preventDefault();
    setShowLastTenPhotos(false);
    setShowAllPictures(false);
    setShowAllUsers(true);
    setShowContactForm(false);
  };

  const handleContactFormClick = (e) => {
    e.preventDefault();
    setShowLastTenPhotos(false);
    setShowAllPictures(false);
    setShowAllUsers(false);
    setShowContactForm(true);
  };

  return (
    <header>
      <nav>
        <a href="/" onClick={handleGetStartedClick}>Get Started</a>
        <a href="/pictures" onClick={handlePicturesClick}>Pictures</a>
        <a href="/users" onClick={handleUsersClick}>Users</a>
        <a href="/contacts" onClick={handleContactFormClick}>Contacts</a>
      </nav>
      {showLastTenPhotos && <LastTenPhotos />}
      {showAllPictures && <AllPictures />}
      {showAllUsers && <Users />}
      {showContactForm && <ContactForm />}
    </header>
  );
}

export default HeaderMenu;
