import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

const SharedLayout = () => {
  return (
    <>
      <div className="container mx-auto">
        <Navbar />
        <div className="grid mx-3 lg:mx-12 mt-4 lg:grid-cols-10 justify-items-start">
          <div className="hidden lg:flex col-span-2 flex-col py-8">
            <Sidebar />
          </div>
          <div className="w-full lg:col-span-8 justify-start items-center lg:border-l lg:border-slate-300 lg:pl-12 py-8">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default SharedLayout;
