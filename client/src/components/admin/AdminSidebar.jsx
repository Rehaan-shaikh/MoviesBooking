import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Film, Ticket, PlusSquare, Home } from 'lucide-react';
import { assets } from '../../assets/assets.js';

const AdminSidebar = () => {
  const navLinkClasses = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
      isActive
        ? 'bg-primary text-white'
        : 'text-gray-300 hover:bg-gray-700'
    }`;

  return (
    <div className="w-64 bg-[#1A1A1A] text-white h-screen flex flex-col p-4 border-r border-gray-700">
      <div className="flex items-center gap-2 p-4 mb-8">
        <img src={assets.logo} alt="Logo" className="w-32" />
      </div>
      <nav className="flex flex-col gap-2">
        <NavLink to="/admin" end className={navLinkClasses}>
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </NavLink>
        <NavLink to="/admin/shows" className={navLinkClasses}>
          <Film size={20} />
          <span>Shows</span>
        </NavLink>
        <NavLink to="/admin/bookings" className={navLinkClasses}>
          <Ticket size={20} />
          <span>Bookings</span>
        </NavLink>
        <NavLink to="/admin/add-show" className={navLinkClasses}>
          <PlusSquare size={20} />
          <span>Add Show</span>
        </NavLink>
        <hr className="my-4 border-gray-700" />
        <NavLink to="/" className={navLinkClasses}>
            <Home size={20} />
            <span>Back to Home</span>
        </NavLink>
      </nav>
    </div>
  );
};

export default AdminSidebar;

