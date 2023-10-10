import React, {useState} from 'react';
import {Link} from 'react-router-dom';

import LastTenPhotos from '../last-uploaded-pics/last-uploaded-pics';
import AllPictures from '../all-pictures/all-pictures';
import Users from '../user/users/users';
import ContactForm from '../contacts/send-message/send-message';
import './Header.css';

function HeaderMenu() {
  const [activeContent, setActiveContent] = useState(null);

  const handleMenuItemClick = (contentName) => {
    setActiveContent(contentName);
  };

  return (
    <header>
      <nav>
        <Link to='/' onClick={() => handleMenuItemClick('lastTenPhotos')}>
          Get Started
        </Link>
        <Link to='/pictures' onClick={() => handleMenuItemClick('allPictures')}>
          Pictures
        </Link>
        <Link to='/users' onClick={() => handleMenuItemClick('allUsers')}>
          Users
        </Link>
        <Link to='/contacts' onClick={() => handleMenuItemClick('contactForm')}>
          Contacts
        </Link>
      </nav>
      {activeContent === 'lastTenPhotos' && <LastTenPhotos />}
      {activeContent === 'allPictures' && <AllPictures />}
      {activeContent === 'allUsers' && <Users />}
      {activeContent === 'contactForm' && <ContactForm />}
    </header>
  );
}

export default HeaderMenu;
