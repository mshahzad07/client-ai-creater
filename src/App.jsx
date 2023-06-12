import React, { useState, useEffect } from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import { logo } from './assets';
import { profile } from './assets';
import axios from 'axios';
import { Home, CreatePost, AboutPage, ContactPage, RegisterPage, AdminLoginPage, EditPhoto, BlogPage } from './pages';
import ReactModal from 'react-modal';
import backgroundImage from './assets/1.jpg';
import LoginPage from './pages/LoginPage.jsx';
import { FaTimes } from 'react-icons/fa';
// import { Navbar } from './components';

const App = () => {



  // login part start here 

  const [open, setOpen] = useState(false);
  const [LogOutopen, setLogOutopen] = useState(false);
  const [LoggedOutopen, setLoggedOutopen] = useState(false);
  const [LogInopen, setLogInopen] = useState(false);
  const [AdminLogInopen, setAdminLogInopen] = useState(false);
  const [LoggedInopen, setLoggedInopen] = useState(false);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState('');
  const [passworderror, setPassworderror] = useState('');

  const [AdminName, setAdminName] = useState(true);
  const [AdminPassword, setAdminPassword] = useState(true);
  const [AdminErr, setAdminErr] = useState(false);


  const handleLoginAdmin = async (e) => {
      if(username === 'Frost Trek AI' && password === 'msb5499176'){
        handleLoginUser();
      }
      else{
        setAdminErr(true);
      }
  }




  const handleLoginUser = async (e) => {
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
        openLoggedInPopup();

        // Store the token in localStorage
        localStorage.setItem('token', token);

        localStorage.setItem('username', username);

        localStorage.setItem('password', password)
        console.log('Password is:', password)

        console.log('username is :', username)

        setIsLoggedIn(true);

        closeLogInPopup();
        CloseAdminPopup();
        loginStatus();
        setUsername('')
        setPassword('');
        navigate('/')
        // onLogin();
        // Open the popup
      } else if (response.status !== 200) {
        // User login failed
        // Handle error or display error message
      }
    } catch (error) {
      console.log(error);
      // Handle error or display error message
    }
  };

  const loginStatus = () => {
    const tokenValue = localStorage.getItem('token')
    if (tokenValue !== null) {
      setIsLoggedIn(true);
    }
  }


  const checkUsernameValidity = async (e) => {
    console.log('username is bieng sent to check')

    try {
      // Make an API call to check if the username exists in the database
      const response = await axios.get(`http://localhost:8080/api/v1/user/name-match?username=${username}`);
      console.log('username  request is sent to check')

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
    console.log("username is being checked")
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
  }



  // Login part end here 


  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  const Menus = ['Logout'];
  const MenusLogin = ["Register",'Login'];

  const Loginstatus = () => {
    const token = localStorage.getItem('token');
    if (token !== null) {
      setIsLoggedIn(true);
      console.log('User is logged In');
      const username = localStorage.getItem('username')
      console.log('usernam is :', username)

      const password = localStorage.getItem('password')

      console.log('password is :', password)
      // console.log('User Token Is:', token);
    } else {
      setIsLoggedIn(false);
      console.log('User is logged Out');
    }
  };

  useEffect(() => {
    Loginstatus();
  }, []);

  const navigate = useNavigate();

  const handleLogin = () => {
    // setIsLoggedIn(true);
    const tokenValue = localStorage.getItem('token');
    console.log('ProfileIcon should be updated');
    console.log('User should stay logged In');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    // setLogOutopen(true);
    setLoggedOutopen(true);
    navigate('/');
    console.log('User is logged out');
  };

  const OpenAdminPopup = () => {
    setAdminLogInopen(true);
  }
  const CloseAdminPopup = () => {
    setAdminLogInopen(false);
  }
  const OpenLogInPopup = () => {
    setLogInopen(true);
  }

  const closeLogInPopup = () => {
    setLogInopen(false);
  };

  const closeLogoutPopup = () => {
    setLogOutopen(false);
  };

  const closeLoggedoutPopup = () => {
    setLoggedOutopen(false);
  };
  const openLoggedInPopup = () => {
    setLoggedInopen(true);
  }
  const closeLoggedInPopup = () => {
    setLoggedInopen(false);
  }

  const [isCreateModalOpen, setCreateModalOpen] = useState(false);

  const openCreatePopup = () => {
    setCreateModalOpen(true);
  };

  const closeCreatePopup = () => {
    setCreateModalOpen(false);
  };

  const [isEditModalOpen, setEditModalOpen] = useState(false);

  const openEditPopup = () => {
    setEditModalOpen(!isEditModalOpen);
  };

  const closeEditPopup = () => {
    setEditModalOpen(false);
  };

  const handleAdminUsername=()=>{
    if (username==='Frost Trek AI'){
      setAdminName (true)
    }
    else{
      setAdminName(false)
    }
  }
  const handleAdminPassword=()=>{
    if (password === 'msb5499176'){
      setAdminPassword(true);
    }
    else{
      setAdminPassword(false);
    }
  }
  return (
    <div className="relative p-0 overflow-x-hidden">
      <div className="absolute inset-0 z-[-1] bg-center bg-cover" style={{ backgroundImage: `url(${backgroundImage})` }}></div>
      <header className="w-full flex flex-wrap justify-between items-center bg-black sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]">
        <Link to="/">
          <img src={logo} alt="logo" className="w-28 object-contain" />
        </Link>
        <nav className="navbar">
          <ul className="navbar-list">
            <li className="navbar-item">
              <Link to="/">Home</Link>
            </li>
            <li className="navbar-item">
              <Link to="/blog-page">Blog</Link>
            </li>
            <li className="navbar-item">
              <Link to="/contact-page">Contact</Link>
            </li>
            <li className="navbar-item">
              <Link to="/about-page">About</Link>
            </li>
          </ul>
        </nav>
        <div className="w-full sm:w-auto flex justify-between items-center mt-4 sm:mt-0">
          {isLoggedIn ? (
            <div>
              <Link to="/create-post" className="font-inter font-medium bg-[#BD8B44] text-white px-4 py-2 rounded-md mx-1">
                Create AI ART
              </Link>
            </div>
          ) : (
            <div>
              <button onClick={openCreatePopup} className="font-inter font-medium bg-[#BD8B44] text-white px-4 py-2 rounded-md mx-1">
                Create AI Art
              </button>
              <ReactModal
                isOpen={isCreateModalOpen}
                onRequestClose={closeCreatePopup}
                contentLabel="Popup"
                className="modal fixed inset-0 flex items-center justify-center"
                overlayClassName="modal-overlay fixed inset-0 bg-black bg-opacity-50"
              >
                <div className="modal-content bg-white bg-opacity-100 p-8 rounded-lg shadow-lg max-w-md mx-auto">
                  <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 focus:outline-none"
                    onClick={closeCreatePopup}
                  >
                    <FaTimes size={24} />
                  </button>
                  <p className="font-inter font-medium my-8">
                    Please log in to your account before creating AI arts.
                  </p>
                  <div className="flex justify-end mt-4">

                    <button
                      onClick={() => { setLogInopen(true); closeCreatePopup() }}
                      className="flex items-center font-inter font-medium bg-[#BD8B44] text-white px-4 py-2 mx-2 rounded-md"
                    >
                      Login
                    </button>
                  </div>
                </div>
              </ReactModal>
            </div>
          )}
          <div>
            {isLoggedIn ? (
              <div>
                <Link to="/edit-photo-page" className="font-inter font-medium bg-[#BD8B44] text-white px-4 py-2 rounded-md mx-1">
                  Edit Photo
                </Link>
              </div>
            ) : (
              <div>
                <button onClick={openEditPopup} className="font-inter font-medium bg-[#BD8B44] text-white px-4 py-2 rounded-md mx-1">
                  Edit Photo
                </button>
                <ReactModal
                  isOpen={isEditModalOpen}
                  onRequestClose={openEditPopup}
                  contentLabel="Popup"
                  className="modal fixed inset-0 flex items-center justify-center"
                  overlayClassName="modal-overlay fixed inset-0 bg-black bg-opacity-50"
                >
                  <div className="modal-content bg-white bg-opacity-100 p-8 rounded-lg shadow-lg max-w-md mx-auto">
                    <button
                      className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 focus:outline-none"
                      onClick={openEditPopup}
                    >
                      <FaTimes size={24} />
                    </button>
                    <p className="font-inter font-medium my-8">Please log in to your account before Editing your images.</p>
                    <div className="flex justify-end mt-4">

                      <button
                        onClick={() => { setLogInopen(true); closeEditPopup() }}
                        className="font-inter font-medium bg-[#BD8B44] text-white px-4 py-2 mx-2 rounded-md"
                      >
                        Login
                      </button>
                    </div>
                  </div>
                </ReactModal>
              </div>
            )}
          </div>
          <div className="ml-9">
            {isLoggedIn ? (
              // user is logged In
              <div className="relative">
                <img src={profile} className="w-10 h-10 object-cover cursor-pointer" onClick={() => setOpen(!open)} ></img>

                {open && (
                  <div className="bg-white p-1 w-30 shadow-lg absolute -left-25 right-0 top-14 rounded-lg">
                    <ul>
                      {Menus.map((menu) => (
                        <li
                          className="p-2 text-lg cursor-pointer rounded hover:bg-blue-500 "
                          key={menu}
                          onClick={() => {
                            setLogOutopen(true);
                            setOpen(false);
                          }}
                        >
                          {menu}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {LogOutopen && (
                  <ReactModal
                    isOpen={LogOutopen}
                    onRequestClose={closeLogoutPopup}
                    contentLabel="Popup"
                    className="modal fixed inset-0 flex items-center justify-center"
                    overlayClassName="modal-overlay  fixed inset-0 bg-black bg-opacity-50 rounded-lg"
                  >
                    <div className="modal-content bg-white bg-opacity-100 p-8 rounded-lg shadow-lg max-w-md mx-auto">
                      <button
                        className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 focus:outline-none"
                        onClick={closeLogoutPopup}
                      >
                        <FaTimes size={24} />
                      </button>
                      <p className="font-inter font-medium my-8">
                        Do you want to Logout your account?
                      </p>
                      <div className="flex justify-between mt-4">
                        <button onClick={closeLogoutPopup} className="flex items-center font-inter font-medium bg-[#BD8B44] text-white px-4 py-2 mx-2 rounded-md">
                          No
                        </button>
                        <button
                          onClick={() => { handleLogout(); closeLogoutPopup() }}
                          className="flex items-center font-inter font-medium bg-[#BD8B44] text-white px-4 py-2 mx-2 rounded-md"
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  </ReactModal>
                )}

              </div>
            ) : (
              // user is logged out
              <div className="relative">
                <img src={profile} className="w-10 h-10 object-cover cursor-pointer" onClick={() => setOpen(!open)} ></img>
                {open && (
                  <div className="bg-white p-1 w-30 shadow-lg absolute -left-25 right-0 top-14 rounded-lg">
                    <ul>
                      {MenusLogin.map((menu) => (
                        <li
                          className="p-2 text-lg cursor-pointer rounded hover:bg-blue-500"
                          key={menu}
                          onClick={() => {
                            if (menu === 'Login') {
                              setLogInopen(true);
                              setOpen(false);
                            } else if (menu === 'Register') {
                              navigate('/register-page');
                              setOpen(false);
                            }
                          }}
                        >
                          {menu}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
            {LoggedOutopen && (
              <ReactModal
                isOpen={LoggedOutopen}
                onRequestClose={closeLoggedoutPopup}
                contentLabel="Popup"
                className="modal fixed inset-0 flex items-center justify-center"
                overlayClassName="modal-overlay fixed inset-0 bg-black bg-opacity-50"
              >

                <div className="modal-content bg-white bg-opacity-100 p-8 rounded-lg shadow-lg max-w-md mx-auto">
                  <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 focus:outline-none"
                    onClick={closeLoggedoutPopup}
                  >
                    <FaTimes size={24} />
                  </button>
                  <p className="font-inter font-medium my-8">Your account is logged out.</p>
                  <div className="flex justify-end mt-4">
                    <button
                      onClick={closeLoggedoutPopup}
                      className="font-inter font-medium bg-[#BD8B44] text-white px-4 py-2 mx-2 rounded-md"
                    >
                      OK
                    </button>
                  </div>
                </div>
              </ReactModal>
            )}
            <div>
              {LogInopen && (
                <ReactModal
                  isOpen={LogInopen}
                  onRequestClose={closeLogInPopup}
                  contentLabel="Popup"
                  className="modal  fixed inset-0 flex items-center justify-center"
                  overlayClassName="modal-overlay  fixed inset-0 bg-black bg-opacity-50 max-h-screen"
                >
                  <div className="modal-content  bg-opacity-30 p-8 rounded-lg shadow-lg max-w-md mx-auto max-h-full my-auto " style={{ backgroundImage: `url(${backgroundImage})` }}>
                    <button
                      className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 focus:outline-none"
                      onClick={closeLogInPopup}
                    >
                      <FaTimes size={24} />
                    </button>
                    <div className="container-fluid">
                      <div className="container">
                        <div className="row">
                          <div className="col-sm-12">
                            <div className="login-register-form">
                              <div className="form-holder">
                                <div className="form-row form-head">
                                  <div className="col-xs-6">
                                    <div className="flex justify-between items-center">
                                      <Link className="site-brand" to="/">
                                        <img src={logo} alt="Frost Trek" />
                                      </Link>
                                      <h2 onClick={()=>{closeLogInPopup();OpenAdminPopup();setUsername('');setPassword('');}} className="text-right text-blue-600 cursor-pointer  hover:text-black text-xl">Admin Login</h2>
                                    </div>
                                  </div>
                                </div>
                                <p className="text-white my-6 text-lg">Login your account here !!</p>

                                <div className="form-row form-links">
                                  <div className="col-xs-12">
                                    <button className="link-to active mr-2">
                                      Login
                                    </button>
                                    or
                                    <button onClick={() => { closeLogInPopup(); navigate('/register-page');setPassword('');setUsername('') }} className="link-to ml-2">
                                      Register
                                    </button>
                                  </div>
                                </div>
                                <form onSubmit={handleLoginUser}>
                                  <div className="form-row">
                                    <div className="col-xs-12">
                                      <label>Username</label>
                                      <input
                                        placeholder="Please Enter Username Here"
                                        type="text"
                                        name="username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        onBlur={handleUsernameBlur}
                                        className="form-control"
                                        required
                                      />
                                      {error && <div className="text-red-500 my-4">{error}</div>}
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
                                      {passworderror && <div className="text-red-500 my-4">{passworderror}</div>}
                                    </div>
                                  </div>
                                  <div className="form-row">                                  
                                    <div className="col-xs-6">
                                      <div className="submit-holder">
                                        <button type="submit" onClick={handleLoginUser}>
                                          Login
                                        </button>
                                      </div>
                                    </div>
                                  </div>

                                </form>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </ReactModal>
              )}
            </div>
            <div>
              {AdminLogInopen && (
                <ReactModal
                isOpen={AdminLogInopen}
                onRequestClose={CloseAdminPopup}
                contentLabel="Popup"
                className="modal  fixed inset-0 flex items-center justify-center"
                overlayClassName="modal-overlay  fixed inset-0 bg-black bg-opacity-50 max-h-screen"
              >
                <div className="modal-content  bg-opacity-30 p-8 rounded-lg shadow-lg max-w-md mx-auto max-h-full my-auto " style={{ backgroundImage: `url(${backgroundImage})` }}>
                  <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 focus:outline-none"
                    onClick={CloseAdminPopup}
                  >
                    <FaTimes size={24} />
                  </button>
                  <div className="container-fluid">
                      <div className="container">
                        <div className="row">
                          <div className="col-sm-12">
                            <div className="login-register-form">
                              <div className="form-holder">
                                <div className="form-row form-head">
                                  <div className="col-xs-6">
                                    <div className="flex justify-between items-center">
                                      <Link className="site-brand" to="/">
                                        <img src={logo} alt="Frost Trek" />
                                      </Link>
                                      <h2 onClick={()=>{CloseAdminPopup();OpenLogInPopup();setUsername('');setPassword('');}} className="text-right text-blue-600 cursor-pointer  hover:text-black text-xl">User Login</h2>
                                    </div>
                                  </div>
                                </div>
                                <p className="text-white my-6 text-lg">Only Admin can login here !!</p>
                                <div className="form-row form-links">
                                  <div className="col-xs-12">
                                    <button className="link-to active">
                                      Admin Login
                                    </button>     
                                  </div>
                                </div>
                                <form onSubmit={handleLoginUser}>
                                  <div className="form-row">
                                    <div className="col-xs-12">
                                      <label>Admin Name</label>
                                      <input
                                        placeholder="Please Enter Admin Name Here"
                                        type="text"
                                        name="username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        onBlur={handleAdminUsername}
                                        className="form-control"
                                        required
                                      />
                                      {!AdminName && <p className="text-red-500 my-4">Invalid Admin Name</p>}
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
                                        onBlur={handleAdminPassword}
                                        className="form-control"
                                        required
                                      />
                                      {(!AdminPassword) && <p className="text-red-500 my-4">Invalid Admin Password.</p>}
                                    </div>
                                  </div>
                                  <div className="form-row">
                                    
                                    <div className="col-xs-6">
                                      <div className="submit-holder">
                                        <button type="submit" onClick={handleLoginAdmin}>
                                          Login
                                        </button>
                                      </div>
                                    </div>
                                  </div>

                                </form>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                </div>
                </ReactModal>
                  
              )}
            </div>
          </div>
        </div>
      </header>
      <main className="sm:p-8 px-4 py-8 w-full bg-transparent min-h-100vh] overflow-hidden">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/about-page" element={<AboutPage />} />
          <Route path="/contact-page" element={<ContactPage />} />
          <Route path="/register-page" element={<RegisterPage />} />
          <Route path="/admin-login-page" element={<AdminLoginPage />} />
          <Route path="/edit-photo-page" element={<EditPhoto />} />
          <Route path="/blog-page" element={<BlogPage />} />
          <Route path="/popup" element={<loginfisrtPopup />} />
          <Route path="/login-page" element={<LoginPage onLogin={handleLogin} />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;