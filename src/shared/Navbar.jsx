import React, { use } from "react";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
   const {user, handleToggle, theme } = use(AuthContext);
  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
    </>
  );
  return (
      <div className=" bg-white/80 shadow ">
      <div className=" max-w-7xl mx-auto px-2 sm:px-8 xl:px-0 navbar p-0">
        <div className="navbar-start">
          {/* <img src={icon} alt="" className="w-8 sm:w-10 md:w-12" /> */}
          <h3 className="font-bold text-secondary text-xl sm:text-2xl md:text-3xl">
            FreshAlert<span className="text-primary">Hub</span>
          </h3>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-2 ">{links}</ul>
        </div>
        <div className="navbar-end gap-1 ">
        
         
          {/* {user ? (
            <>
              <div className="dropdown">
                <div tabIndex={0}>
                  <img
        src={
          user?.photoURL
            ? user.photoURL
            : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_htyN2AsYGqluVNNRR2AIXtpLph4pk608Uw&s"
        }
        alt="Profile Pic"
        className="w-12 h-12 rounded-full object-cover cursor-pointer"
        data-tooltip-id="user-tooltip"
        data-tooltip-content={`Hi! ${user?.displayName || "Guest"}`}
        data-tooltip-place="bottom"
      />
      <ReactTooltip id="user-tooltip" 
      place="bottom"
  style={{ backgroundColor: "#4caf50", color: "white", fontWeight: "500" }}/>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm  dropdown-content bg-base-100 rounded-box z-1 max-w-54 p-4 shadow-lg right-0 space-y-2 text-center"
                >
                  <p className=" text-sm md:text-base">{user.email}</p>
                  <Link
                    // onClick={handleLogout}
                    className="btn btn-xs md:btn-sm button-green "
                  >
                    Logout
                  </Link>
                </ul>
              </div>
            </>
          ) : (
            <>
            ...................................
            </>
            )} */}
            <Link
              to="/login"
              className="btn btn-xs sm:btn-md hover:text-white hover:bg-primary text-primary border border-primary bg-white "
            >
              Login
            </Link>
            <Link
              to="/register"
              className="btn btn-xs sm:btn-md orange-btn"
            >
              Register
            </Link>
          
          <label className="swap swap-rotate -mr-3 ml-2">
            {/* this hidden checkbox controls the state */}
            <input
              type="checkbox"
              onChange={handleToggle}
              className="theme-controller"
              value="synthwave"
              checked={theme === "light" ? false : true}
            />

            {/* moon icon */}
            <svg
              className="swap-on h-6 w-5 fill-current text-black"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
            </svg>

            {/* sun icon */}
            <svg
              className="swap-off h-6 w-6 fill-current text-yellow-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
            </svg>
          </label>
          {/* menubar */}
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-sm lg:hidden "
            >
              <HiOutlineMenuAlt3 size={20} />
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm  dropdown-content bg-base-100 rounded-box z-20 mt-3 w-40 p-2 shadow right-0"
            >
              {links}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
