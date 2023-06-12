import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { logo } from '../assets';
import axios from 'axios';

import ReactModal from 'react-modal';

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState('');
  const [passworderror, setPassworderror] = useState('');
  const [loggedInUsername, setloggedInUsername] = useState('');



  const [isModalOpen, setModalOpen] = useState(false);
  const closePopup = () => {
    setModalOpen(false)
  }
  const loginStatus =()=>{
    const tokenValue = localStorage.getItem('token')
    if (tokenValue !== null) {
      setIsLoggedIn(true);    }
  }

  const handleLogin = async (e) => {
    e.preventDefault();

    // Make API request to user login endpoint
    try {
      const response = await fetch('http://localhost:8080/api/v1/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.status === 200) {
        const data = await response.json();
        const token = data.token;
        console.log("Successfully logged in", token);

        // Store the token in localStorage
        localStorage.setItem('token', token);
        // setNavigateToCreatePost(true);
        loginStatus();
        setUsername('')
        setPassword('');      
        onLogin();
        setModalOpen(true); // Open the popup
      } else {
        // User login failed
        // Handle error or display error message
      }
    } catch (error) {
      console.log(error);
      // Handle error or display error message
    }
  };

  


  const checkUsernameValidity = async (e) => {

    try {
      // Make an API call to check if the username exists in the database
      const response = await axios.get(`http://localhost:8080/api/v1/user/name-match?username=${username}`);

      if (response.data.exists) {
        // Username is valid, continue with your form submission logic or other actions
        setError('')
      } else {
        // Invalid username
        setError('Username not found. Please register to create an account.');
      }
    } catch (error) {
      console.error();
      // Handle any errors that occur during the API call
    }
  }

  const checkPasswordValidity = async (e) => {

    try {
      // Make an API call to check if the username exists in the database
      const response = await axios.get(`http://localhost:8080/api/v1/user/password-match?username=${username}&password=${password}`);

      if (response.data.passwordMatch) {
        // Username is valid, continue with your form submission logic or other actions
        setPassworderror('')
      } else {
        // Invalid username
        setPassworderror('Invalid Password or Username');
      }
    } catch (error) {
      console.error();
      // Handle any errors that occur during the API call
    }
  }


  const handleUsernameBlur = () => {
    if (username.trim() !== '') {
      checkUsernameValidity();
    }
    else {
      setError('')
    }
  };

  const handlePasswordBlur = () => {
    if (password.trim() !== '') {
      checkPasswordValidity();
    }
    else {
      setPassworderror('')
    }
  };



  return (
    <section>
      <div className="container-fluid">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div className="login-register-form">
                <div className="form-holder">
                  <div className="form-row form-head">
                    <div className="col-xs-6">
                      <Link className="site-brand" to="/">
                        <img src={logo} alt="Frost Trek" />
                      </Link>
                    </div>
                    {/* <div className="col-xs-6 admin_link">
                      <Link to="/admin-login-page" className="form-title ">
                        <b>Admin Login</b>
                      </Link>
                    </div> */}
                  </div>
                  <p className='text-white my-6 text-lg'>Login Your Account Here !!</p>

                  <div className="form-row form-links">
                    <div className="col-xs-12">
                      <Link to="/login-page" className="link-to active">
                        Login
                      </Link>{' '}
                      or{' '}
                      <Link to="/register-page" className="link-to">
                        Register
                      </Link>
                    </div>
                  </div>
                  <form onSubmit={handleLogin}>
                    <div className="form-row">
                      <div className="col-xs-12">
                        <label>Username</label>
                        <input
                          placeholder="Please Enter Username Here"
                          type="text"
                          name='username'
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          onBlur={handleUsernameBlur}
                          className="form-control"
                          required
                        />
                        {error && <div className='text-red-500 my-4'>{error}</div>}
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="col-xs-12">
                        <label>Password</label>
                        <input
                          placeholder="Please Enter Password Here"
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          onBlur={handlePasswordBlur}
                          className="form-control"
                          required
                        />
                        {passworderror && <div className='text-red-500 my-4'>{passworderror}</div>}

                      </div>
                    </div>
                    <div className="form-row">
                      <div className="col-xs-6">
                        <Link href="#" className="forget-link">
                          Forget your password?
                        </Link>
                      </div>
                      <div className="col-xs-6">
                        <div className="submit-holder">
                          <button type="submit" onClick={handleLogin}>Login</button>
                        </div>
                      </div>
                    </div>
                  </form>
                  {/* {navigateToCreatePost && <Navigate to={`/create-post?username=${username}`} />} */}
                  <div>
                    {isModalOpen && (
                      <ReactModal
                        isOpen={isModalOpen}
                        onRequestClose={closePopup}
                        contentLabel="Popup"
                        className="modal fixed inset-0 flex items-center justify-center"
                        overlayClassName="modal-overlay fixed inset-0 bg-black bg-opacity-50"
                      >
                        <div className='modal-content bg-white p-8 rounded-lg shadow-lg max-w-md' >
                          <p className='font-inter font-medium my-8 mx-auto'>You have successfully logged in. You can now proceed to create or edit your artistic creations.</p>
                          <div className="flex justify-between mt-4">
                            <Link to='/' className=" font-inter font-medium bg-[#BD8B44] text-white px-4 py-2 mx-2 rounded-md">Home</Link>
                            <Link to='/create-post' onClick={closePopup} className="font-inter font-medium bg-[#BD8B44] text-white px-4 py-2 mx-2 rounded-md ">Create AI Art</Link>
                          </div>
                        </div>
                      </ReactModal>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;



