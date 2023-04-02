import NotFoundImage from "../assets/notfound.svg";

const NotFound = () => {
  return (
    <>
      <div className="container mx-auto">
        <div className="flex min-w-screen min-h-[80vh] items-center justify-center">
          <div className="flex flex-col lg:w-1/3 items-center">
            <img src={NotFoundImage} className="w-full h-full" alt="notFound" />
            <h1 className="py-3 text-4xl font-black text-[#102A43]">
              Page Not Found
            </h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
