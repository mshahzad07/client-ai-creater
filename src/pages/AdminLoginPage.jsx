import React,{ useState } from 'react'
import { Link } from 'react-router-dom';
import { logo } from '../assets'

const AdminLoginPage = () => {

    const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleAdminLogin = async (e) => {
    e.preventDefault();

    // Make API request to admin login endpoint
    try {
      const response = await fetch('http://localhost:8080/api/v1/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      if (response.ok) {
        // Admin login successful
        // Redirect or perform any necessary actions
      } else {
        // Admin login failed
        // Handle error or display error message
      }
    } catch (error) {
      console.log(error);
      // Handle error or display error message
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
                                            <Link className="site-brand" to="/"><img src={logo} alt="Frost Trek" /></Link>
                                        </div>
                                    </div>
                                    <div className="col-xs-6 admin_head">
                                        <h3>** Only Admin can Login here!! **</h3>
                                    </div>
                                    <div className="form-row form-links">
                                        <div className="col-xs-12">
                                            <div to="/login-page" className="link-to active">Admin Login</div>
                                        </div>
                                    </div>
                                    <form onSubmit={handleAdminLogin}>
                                        <div className="form-row">
                                            <div className="col-xs-12">
                                                <label>Username</label>
                                                <input placeholder='Please Enter Username Here' type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="form-control" required />
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="col-xs-12">
                                                <label>Password</label>
                                                <input placeholder='Please Enter Password Here' type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" required />
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="col-xs-6">
                                                <Link href="#" className="forget-link">Forget your password?</Link>
                                            </div>
                                            <div className="col-xs-6">
                                                <div className="submit-holder">
                                                    <button type="submit">Login</button>
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
        </section>
  )
}

export default AdminLoginPage