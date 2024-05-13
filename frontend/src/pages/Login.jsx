import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Cookies from 'js-cookie'; // Import the js-cookie library
import { UserContext } from '../context/userContext';

const Login = () => {
  const [userData, setUserData] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const { setCurrentUser } = useContext(UserContext);

  const changeInputHandle = (e) => {
    setUserData(prevState => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState);
  };

  const loginUser = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/users/login`, userData);
      const user = await response.data;
      
      // Set cookie with the token
      Cookies.set('token', user.token, { expires: 1 }); // Set the token cookie to expire in 1 day

      setCurrentUser(user);
      navigate('/');
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <section className="login">
      <div className="container">
        <h2>Sign In</h2>

        <form className="form login__form" onSubmit={loginUser}>

          {error && <p className="form_error-message">{error}</p>}

          <input type="text" placeholder='Email' name='email' value={userData.email} onChange={changeInputHandle} autoFocus />

          <div className="password-input">
            <input 
              type={showPassword ? 'text' : 'password'} 
              placeholder='Password' 
              name='password' 
              value={userData.password} 
              onChange={changeInputHandle} 
            />
            <span className="password-toggle" onClick={togglePasswordVisibility}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button type="submit" className='btn primary'>Login</button>

        </form>

        <small>Don't have an account? <Link to='/register'>Sign up</Link></small>
      </div>
    </section>
  );
};

export default Login;
