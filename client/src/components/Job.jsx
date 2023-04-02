import { FaCity } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
import { BiTimeFive, BiEdit } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import moment from "moment";
import { useAppContext } from "../context/AppContext";
import { useState } from "react";

const Job = (props) => {
  const { setEditingJob, deleteJob } = useAppContext();
  return (
    <>
      <div className="flex flex-col p-3 mt-3 lg:p-12 shadow-lg bg-white w-full">
        <div className="flex items-center space-x-6">
          <div className="flex py-4 px-5 bg-[#48a5ba] justify-center items-center rounded-md">
            <h1 className="text-2xl text-white font-medium">
              {props.position[0]}
            </h1>
          </div>
          <div className="flex flex-col">
            <h2 className="text-xl font-semibold">{props.position}</h2>
            <p className="text-slate-500">{props.company}</p>
          </div>
        </div>
        <div className="flex items-center justify-between mt-8">
          <div className="flex space-x-3 items-center">
            <FaCity className="w-6 h-6" />
            <p>{props.jobLocation}</p>
          </div>
          <div className="flex space-x-3 items-center">
            <MdDateRange className="w-6 h-6" />
            <p>{moment(props.createdAt).format("MMMM Do, YYYY")}</p>
          </div>
        </div>
        <div className="flex items-center justify-between mt-8">
          <div className="flex space-x-3 items-center">
            <BiTimeFive className="w-6 h-6" />
            <p>{props.jobType}</p>
          </div>
          <div className="flex space-x-3 items-center">
            <p
              className={
                (props.jobStatus == "pending"
                  ? "text-yellow-500 bg-yellow-100 px-2 py-1"
                  : "") ||
                (props.jobStatus == "interview"
                  ? "text-blue-700 bg-blue-200 px-2 py-1"
                  : "") ||
                (props.jobStatus == "declined"
                  ? "text-red-600 bg-red-200 px-2 py-1"
                  : "")
              }
            >
              {props.jobStatus}
            </p>
          </div>
        </div>
        <div className="flex items-center mt-8 space-x-3">
          <button
            onClick={() => setEditingJob(props.job)}
            className="flex items-center space-x-2 text-green-900 bg-green-300 px-4 py-1 rounded-md"
          >
            <BiEdit className="w-6 h-6" />
            <p>Edit</p>
          </button>
          <button
            onClick={() => deleteJob(props.job)}
            className="flex items-center space-x-2 text-red-900 bg-red-300 px-4 py-1 rounded-md"
          >
            <AiOutlineDelete className="w-6 h-6" />
            <p>Delete</p>
          </button>
        </div>
      </div>
    </>
  );
};

export default Job;
