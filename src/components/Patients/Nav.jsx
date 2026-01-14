import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <div className="flex px-10 py-5 justify-between items-center text-white bg-linear-to-r from-[#2a89b9] via-[#37a2ad] to-[#3bbb9c]">
      <h1 className="text-4xl font-extrabold">Logo</h1>
      <nav className="flex gap-20 text-lg font-bold">
        <Link to="/">Home</Link>
        <Link to="/doctors">Doctors</Link>
        <Link to="/blogs">Blogs</Link>
        <Link to="/contact">Contact Us</Link>
      </nav>
    </div>
  );
};

export default Nav;
