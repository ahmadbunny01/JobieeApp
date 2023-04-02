import logo from "../assets/logo.png";
import { useAppContext } from "../context/AppContext";
import { BsPersonCircle } from "react-icons/bs";
import { RiMenu2Line } from "react-icons/ri";
import { ImCross, ImStatsDots, ImProfile } from "react-icons/im";
import { MdOutlineQueryStats } from "react-icons/md";
import { FaWpforms } from "react-icons/fa";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const { logoutUser } = useAppContext();
  const location = useLocation();
  const matchPathRoute = (route) => {
    if (route == location.pathname) {
      return true;
    } else {
      return false;
    }
  };
  const [toggleMenu, setToggleMenu] = useState(false);
  const toggleMenuFunc = () => {
    if (toggleMenu) {
      setToggleMenu(false);
    } else {
      setToggleMenu(true);
    }
  };
  return (
    <>
      <nav className="hidden lg:flex mx-3 lg:mx-12 justify-between py-4 items-center">
        <div className="flex justify-start items-center">
          <h1 className="font-bold pl-1 text-3xl text-[#48A5BA]">Jobiee</h1>
        </div>
        <div className="flex items-center">
          <h1 className="font-semibold text-3xl">Dashboard</h1>
        </div>
        <div className="flex items-center">
          <a
            href="/"
            onClick={() => {
              logoutUser();
            }}
            className="flex items-center space-x-2 bg-[#48A5BA] py-2 px-3 rounded-md text-white hover:opacity-90"
          >
            <BsPersonCircle className="h-6 w-6" />
            <p>Logout</p>
          </a>
        </div>
      </nav>
      <div
        className={
          toggleMenu
            ? "lg:hidden menu-animate flex w-full min-h-screen bg-black absolute bg-opacity-70"
            : "hidden"
        }
      >
        <div className="flex flex-col p-6 bg-white shadow-md w-full m-6">
          <button onClick={toggleMenuFunc}>
            <ImCross className="w-6 h-6 text-red-900" />
          </button>
          <div className="flex flex-col py-8 justify-center items-start mx-auto">
            <div className="flex justify-start items-center">
              <img src={logo} className="w-12 h-12" alt="logo" />
              <h1 className="font-bold pl-1 text-3xl text-[#48A5BA]">Jobiee</h1>
            </div>
            <div className="flex flex-col space-y-8 py-8 justify-center items-start mx-auto">
              <div
                className={
                  matchPathRoute("/")
                    ? "flex space-x-4 items-center text-xl text-black font-semibold"
                    : "flex space-x-4 items-center placeholder:text-xl text-slate-500"
                }
              >
                <ImStatsDots className="w-6 h-6" />
                <Link onClick={toggleMenuFunc} to="/">
                  Stats
                </Link>
              </div>
              <div
                className={
                  matchPathRoute("/jobs")
                    ? "flex space-x-4 items-center text-xl text-black font-semibold"
                    : "flex space-x-4 items-center placeholder:text-xl text-slate-500"
                }
              >
                <MdOutlineQueryStats className="w-6 h-6" />
                <Link onClick={toggleMenuFunc} to="/jobs">
                  All Jobs
                </Link>
              </div>
              <div
                className={
                  matchPathRoute("/add-job")
                    ? "flex space-x-4 items-center text-xl text-black font-semibold"
                    : "flex space-x-4 items-center placeholder:text-xl text-slate-500"
                }
              >
                <FaWpforms className="w-6 h-6" />
                <Link onClick={toggleMenuFunc} to="/add-job">
                  Add Job
                </Link>
              </div>
              <div
                className={
                  matchPathRoute("/profile")
                    ? "flex space-x-4 items-center text-xl text-black font-semibold"
                    : "flex space-x-4 items-center placeholder:text-xl text-slate-500"
                }
              >
                <ImProfile className="w-6 h-6" />
                <Link onClick={toggleMenuFunc} to="/profile">
                  Profile
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <nav className="lg:hidden flex mx-3 justify-between py-4 items-center">
        <div className="flex justify-start items-center">
          <h1 className="font-bold text-3xl text-[#48A5BA]">Jobiee</h1>
        </div>
        <div className="flex items-center">
          <a
            href="/"
            onClick={() => {
              logoutUser();
            }}
            className="flex items-center space-x-2 bg-[#48A5BA] py-2 px-3 rounded-md text-white hover:opacity-90"
          >
            <BsPersonCircle className="h-6 w-6" />
            <p>Logout</p>
          </a>
        </div>
        <button onClick={toggleMenuFunc} className="flex items-center">
          <RiMenu2Line className="h-8 w-8 text-[#48A5BA]" />
        </button>
      </nav>
    </>
  );
};

export default Navbar;
