import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import {
  CookingPot,
  LayoutDashboardIcon,
  ListCollapseIcon,
  ListIcon,
  PlusSquareIcon,
  Search,
} from "lucide-react";
// import { assets } from "../../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { checkAuth, logoutUser } from '../../store/authSlice';


const AdminSidebar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
      dispatch(checkAuth());
    }, [dispatch]);

  const {user } = useSelector((state) => state.auth);

    const handleLogout =async ()=> {
    await dispatch(logoutUser()).then(() => {
      navigate("/login"); // redirect to login after logout
      window.location.reload();
    });
  };
  const adminNavLinks = [
    { name: "Dashboard", path: "/admin", icon: LayoutDashboardIcon },
    { name: "Add Shows", path: "/admin/add-shows", icon: PlusSquareIcon },
    { name: "List Shows", path: "/admin/list-shows", icon: ListIcon },
    { name: "List Bookings",path: "/admin/list-bookings",icon: ListCollapseIcon},
    { name: "Food Items",path: "/admin/food-items",icon: CookingPot},
    { name: "Search Movies", path: "/admin/Search", icon: Search },

  ];

  return (
    <div
      className="h-[calc(100vh-64px)] md:flex flex-col items-center pt-8 
        max-w-13 md:max-w-60 w-full border-r border-gray-300/20 text-sm" 
    >
      <div className='h-[78vh]'>
              <img
        className="h-9 md:h-14 w-9 md:w-14 rounded-full mx-auto"
        // src={user.imageUrl}
        alt="sidebar"
      />
      <div className="flex flex-col items-center justify-center mt-2 text-base max-md:hidden">
        <div>{user.name.split(" ")[0]}</div>
        <div> {user.email}</div>
      </div>

      <div className="w-full">
        {adminNavLinks.map((link, index) => (
          <NavLink
            key={index}
            to={link.path}
            end
            className={({ isActive }) =>
              "relative flex items-center gap-2 w-full py-2.5 min-md:pl-10 " +
              (index === 0 ? "first:mt-6 " : "") +
              "text-gray-400 group " +
              (isActive ? "text-primary bg-primary/15" : "")
            }
          >
            {({ isActive }) => (
              <>
                <link.icon className="w-5 h-5" />
                <p className="max-md:hidden">{link.name}</p>

                <span
                  className={
                    "w-1.5 h-10 rounded-l-1 right-0 absolute " +
                    (isActive && "bg-primary")
                  }
                />
              </>
            )}
          </NavLink>

        ))}
      </div>
      </div>

      <div>
        <button
              onClick={handleLogout}
              className="text-primary hover:text-primary-dull  px-4 py-1 sm:px-6 sm:py-2 bg-primary/15  transition rounded-full font-medium cursor-pointer"
              >
              Logout
            </button>
      </div>
    </div>
              
  );
};

export default AdminSidebar;