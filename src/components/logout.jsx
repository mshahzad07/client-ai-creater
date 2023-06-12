import React from 'react'
import React from 'react';
import { useHistory } from 'react-router-dom';

const logout = () => {
  const history = useHistory();
  const handleLogout = async () => {
    try {
      await fetch('http://localhost:8080/api/v1/user/logout', {
        method: 'POST',
        credentials: 'include', // Include credentials if using session-based authentication
      });

      // Perform any necessary cleanup operations here

      // Redirect to the logged-out page
      history.push('/home-page');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default logout