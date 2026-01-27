import { NavLink } from 'react-router-dom';

const Nav = () => {
  const linkClasses = ({ isActive }) =>
    `relative px-3 py-1 transition-all duration-300 font-bold text-lg 
     ${
       isActive
         ? 'text-white after:w-full'
         : 'text-white/70 hover:text-white after:w-0'
     }
     after:absolute after:left-0 after:-bottom-1 after:h-1 after:bg-white after:transition-all after:duration-300`;

  return (
    <div className="flex px-10 py-5 justify-between items-center bg-linear-to-r from-[#2a89b9] via-[#37a2ad] to-[#3bbb9c]">
      <img
        src="/favicon.svg"
        alt=""
        className="h-20 w-max bg-white rounded-full"
      />
      <nav className="flex gap-10">
        <NavLink to="/" className={linkClasses}>
          Home
        </NavLink>
        <NavLink to="/doctors" className={linkClasses}>
          Doctors
        </NavLink>
        <NavLink to="/blogs" className={linkClasses}>
          Blogs
        </NavLink>
        <NavLink to="/contact" className={linkClasses}>
          Contact Us
        </NavLink>
      </nav>
    </div>
  );
};

export default Nav;
