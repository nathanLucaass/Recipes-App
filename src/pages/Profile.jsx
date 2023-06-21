import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Profile.css';
import BackButton from '../components/buttons/BackBtn';

export default function Profile() {
  const history = useHistory();
  const { email } = JSON.parse(localStorage.getItem('user')) || { email: '' };

  const handleClick = (path) => {
    history.push(path);
  };

  return (
    <div>
      <Header title="Profile" />
      <BackButton />
      <div className="content">
        <h1 data-testid="profile-email" className="email">{email}</h1>
        <div className="buttons">
          <button
            data-testid="profile-done-btn"
            type="button"
            className="profile-favorite-btn"
            onClick={ () => handleClick('/done-recipes') }
          >
            {' '}
            Done Recipes
            {' '}
          </button>
          <button
            className="profile-favorite-btn"
            data-testid="profile-favorite-btn"
            type="button"
            onClick={ () => handleClick('/favorite-recipes') }
          >
            {' '}
            Favorite Recipes
            {' '}
          </button>
          <button
            className="profile-favorite-btn"
            data-testid="profile-logout-btn"
            type="button"
            onClick={ () => {
              localStorage.clear();
              handleClick('/');
            } }
          >
            {' '}
            Logout
            {' '}
          </button>
        </div>
        <Footer />
      </div>
    </div>
  );
}
