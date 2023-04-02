import logo from "../assets/logo.png";
import { BsPersonCircle } from "react-icons/bs";
import { RiMenu2Line } from "react-icons/ri";
import { ImCross, ImStatsDots, ImProfile } from "react-icons/im";
import { MdOutlineQueryStats } from "react-icons/md";
import { FaWpforms } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const Sidebar = () => {
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
      <div className="flex flex-col space-y-8 justify-center items-start mx-auto fixed">
        <div
          className={
            matchPathRoute("/")
              ? "flex space-x-4 items-center text-xl text-black font-semibold"
              : "flex space-x-4 items-center placeholder:text-xl text-slate-500 hover:translate-x-3 transition-transform duration-500"
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
              : "flex space-x-4 items-center placeholder:text-xl text-slate-500 hover:translate-x-3 transition-transform duration-500"
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
              : "flex space-x-4 items-center placeholder:text-xl text-slate-500 hover:translate-x-3 transition-transform duration-500"
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
              : "flex space-x-4 items-center placeholder:text-xl text-slate-500 hover:translate-x-3 transition-transform duration-500"
          }
        >
          <ImProfile className="w-6 h-6" />
          <Link onClick={toggleMenuFunc} to="/profile">
            Profile
          </Link>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
