import React, { useEffect, useState } from 'react';
import validator from 'validator';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { saveEmail } from '../redux/actions';
import './Login.css';
import logo from '../assests/Logo com Nome.png';

function Login() {
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [password, setPassword] = useState('');
  const history = useHistory();

  const dispatch = useDispatch();
  const { email } = useSelector((state) => state.user);

  const handleChange = ({ target }) => {
    setPassword(target.value);
  };

  const handleClick = () => {
    localStorage.setItem('user', JSON.stringify({ email }));
    history.push('/meals');
  };

  const validationFields = () => {
    const validEmail = validator.isEmail(email);
    const minLength = 6;
    const validPassword = password.length > minLength;
    if (validEmail && validPassword) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  };

  useEffect(() => {
    validationFields();
    // eslint-disable-next-line
  }, [email, password]);

  return (

    <div className="page">

      <form
        action="submit"
        className="form"
      >
        <img src={ logo } alt="logo" className="logo-login" />
        <label
          htmlFor="email"
          className="label"
        >
          {/* E-mail */}
        </label>
        <input
          placeholder="E-mail"
          type="email"
          name="email"
          id="email"
          data-testid="email-input"
          className="input"
          onChange={ (e) => dispatch(saveEmail(e.target.value)) }
          value={ email }
        />
        <label
          htmlFor="password"
          className="label"
        >
          {/* Senha */}
        </label>
        <input
          placeholder="Senha"
          className="input"
          type="password"
          name="password"
          id="password"
          data-testid="password-input"
          onChange={ handleChange }
          value={ password }
        />
        <button
          className="btn"
          type="button"
          data-testid="login-submit-btn"
          disabled={ isButtonDisabled }
          onClick={ handleClick }
        >
          Enter
        </button>
      </form>
    </div>
  );
}

export default Login;
