import React from 'react';
import { useHistory } from 'react-router-dom';
import './BackBtn.css';
import backimg from '../../images/backbtn.png';

function BackButton() {
  const history = useHistory();

  const handleGoBack = () => {
    history.goBack();
  };

  return (
    <button type="button" className="backbtn" onClick={ handleGoBack }>
      <img
        src={ backimg }
        alt="Voltar"
        className="backbtn-img"
      />
    </button>
  );
}

export default BackButton;
