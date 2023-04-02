import { MdPendingActions } from "react-icons/md";

const Stat = (props) => {
  return (
    <>
      <div className="flex flex-col space-y-6 p-3 mt-6 lg:p-8 w-full border-b-[5px] border-b-yellow-500">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="font-medium text-5xl text-yellow-500">
              {props.stats.pendings}
            </h1>
          </div>
          <div>
            <MdPendingActions className="w-14 h-14 text-yellow-500 bg-yellow-100 p-2" />
          </div>
        </div>
        <div className="flex justify-start">
          <h1 className="text-xl">Pending Applications</h1>
        </div>
      </div>
      <div className="flex flex-col space-y-6 p-3 mt-6 lg:p-8 w-full border-b-[5px] border-b-blue-500">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="font-medium text-5xl text-blue-500">
              {props.stats.interviews}
            </h1>
          </div>
          <div>
            <MdPendingActions className="w-14 h-14 text-blue-500 bg-blue-100 p-2" />
          </div>
        </div>
        <div className="flex justify-start">
          <h1 className="text-xl">Interviews Scheduled</h1>
        </div>
      </div>
      <div className="flex flex-col space-y-6 p-3 mt-6 lg:p-8 w-full border-b-[5px] border-b-red-500">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="font-medium text-5xl text-red-500">
              {props.stats.declined}
            </h1>
          </div>
          <div>
            <MdPendingActions className="w-14 h-14 text-red-500 bg-red-100 p-2" />
          </div>
        </div>
        <div className="flex justify-start">
          <h1 className="text-xl">Declined Jobs</h1>
        </div>
      </div>
    </>
  );
};

export default Stat;
