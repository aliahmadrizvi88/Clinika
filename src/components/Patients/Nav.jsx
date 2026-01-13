import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <nav>
      <h1>Logo</h1>
      <Link to="/">Home</Link>
      <Link to="/doctors">Doctors</Link>
      <Link to="/blogs">Blogs</Link>
      <Link to="/about">About Us</Link>
    </nav>
  );
};

export default Nav;
