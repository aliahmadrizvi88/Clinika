import React from 'react';
import { NavLink } from 'react-router-dom';
import { HomeIcon, UserIcon, List, ClipboardClock, LogOut } from 'lucide-react';

const Sidebar = () => {
  const linkClass = ({ isActive }) =>
    `group relative flex items-center justify-center h-12 w-12 rounded-xl transition-all duration-300
     ${
       isActive
         ? 'bg-white text-[#5f63f2]'
         : 'text-white/80 hover:bg-white/20 hover:text-white'
     }`;

  return (
    <aside className="h-screen w-20 bg-[#5f63f2] flex flex-col items-center justify-between py-6 gap-6">
      <div>
        <img
          src="/public/favicon.svg"
          alt=""
          className="bg-white h-10 rounded-full"
        />
      </div>

      <nav className="flex flex-col gap-4 flex-1 mt-20">
        <NavLink to="/doctor-side/dashoard" className={linkClass}>
          <HomeIcon className="h-6 w-6" />
        </NavLink>

        <NavLink to="/doctor-side/profile" className={linkClass}>
          <UserIcon className="h-6 w-6" />
        </NavLink>

        <NavLink to="/doctor-side/list" className={linkClass}>
          <List className="h-6 w-6" />
        </NavLink>

        <NavLink to="/doctor-side/appointment" className={linkClass}>
          <ClipboardClock className="h-6 w-6" />
        </NavLink>
      </nav>

      {/* Logout */}
      <NavLink to="/logout" className={linkClass}>
        <LogOut className="h-6 w-6" />
      </NavLink>
    </aside>
  );
};

export default Sidebar;
