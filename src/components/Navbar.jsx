import React from 'react'
import { Link } from 'react-router-dom';


const Navbar = () => {
  return (
    <nav className="navbar">
        
      <ul className="navbar-list">
        <li className="navbar-item"><Link to="/">Home</Link></li>
        <li className="navbar-item"><Link to="/blog-page">Blog</Link></li>
        <li className="navbar-item"><Link to="/contact-page">Contact</Link></li>
        <li className="navbar-item"><Link to="/about-page">About</Link></li>
      </ul>
    </nav>
  )
}

export default Navbar