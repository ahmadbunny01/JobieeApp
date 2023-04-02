import bannerImage from "../assets/banner-image.jpg";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <>
      <div className="min-w-screen min-h-screen">
        <div className="container mx-auto">
          <div className="flex mx-3 lg:mx-12 pt-4 justify-start items-center">
            <h1 className="font-bold text-3xl text-[#48A5BA]">Jobiee</h1>
          </div>
          <div className="flex flex-col lg:flex-row mx-3 lg:mx-12 lg:items-center pt-28 lg:pt-0">
            <div>
              <h1 className="font-black text-5xl pb-8 text-[#102A43]">
                Job <span className="text-[#48A5BA]">Tracking</span> App
              </h1>
              <p className="font-medium text-slate-500 pb-4">
                With Jobiee, you can search millions of jobs online to find the
                next step in your career. With tools for job search, CVs,
                company reviews and more, were with you every step of the way.
              </p>
              <button className="main-btn">
                <Link to="/login">Get Started</Link>
              </button>
            </div>
            <div className="hidden lg:block banner-image">
              <img alt="banner-image" src={bannerImage} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;
