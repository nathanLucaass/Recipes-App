import PropTypes from 'prop-types';
import React, { useState } from 'react';
import copy from 'clipboard-copy';
import { useLocation } from 'react-router-dom/';
import shareIcon from '../../images/shareIcon.svg';

export default function ShareBtn({ id, testID = 'share-btn', donePage = false }) {
  const [showAlert, setShowAlert] = useState(false);
  const { pathname } = useLocation();

  let url = `${window.location.origin}/meals/${id}`;

  if (pathname.includes('drinks')) {
    url = `${window.location.origin}/drinks/${id}`;
  }

  return (
    <div className="sharingBtn">
      {showAlert && <p>Link copied!</p>}
      <button
        className="share-btn"
        type="button"
        data-testid={ !donePage && testID }
        onClick={ async () => {
          await copy(url);
          setShowAlert(true);
        } }
      >
        <img data-testid={ donePage && testID } src={ shareIcon } alt="shareBtn" />
      </button>
    </div>
  );
}

ShareBtn.propTypes = {
  donePage: PropTypes.bool,
  id: PropTypes.string.isRequired,
  testID: PropTypes.string,
};
