import { useState, useRef } from "react";
import { useAppContext } from "../../context/AppContext";
import Alert from "../../components/Alert";

const AddJob = () => {
  const { userLocation, addJob, displayAlert, showAlert } = useAppContext();
  const [newJob, setNewJob] = useState({
    position: "",
    company: "",
    jobLocation: userLocation,
    jobType: "full-time",
    status: "pending",
  });
  const { position, company, jobLocation, jobType, status } = newJob;
  const positionRef = useRef();
  const companyRef = useRef();
  const inputHandle = (e) => {
    const { name, value } = e.target;
    setNewJob((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  };
  const submitHandle = (e) => {
    e.preventDefault();
    if (!company || !position) {
      displayAlert();
      return;
    }
    positionRef.current.value = "";
    companyRef.current.value = "";
    const currJob = newJob;
    addJob(currJob);
  };
  return (
    <>
      <div className="flex py-6">
        <h1 className="font-base text-3xl text-slate-700">Add Job</h1>
      </div>
      {showAlert && <Alert />}
      <form onSubmit={submitHandle}>
        <div className="grid grid-cols-1 lg:grid-cols-3">
          <div className="flex w-full lg:w-auto flex-col space-y-3 items-start p-3">
            <label className="font-semibold" htmlFor="position">
              Position
            </label>
            <input
              name="position"
              type="text"
              value={position}
              ref={positionRef}
              className="border border-slate-400 px-2 py-1 rounded-md w-full outline-none"
              onChange={inputHandle}
            />
          </div>
          <div className="flex w-full lg:w-auto flex-col space-y-3 items-start p-3">
            <label className="font-semibold" htmlFor="company">
              Company
            </label>
            <input
              name="company"
              type="text"
              value={company}
              ref={companyRef}
              className="border border-slate-400 px-2 py-1 rounded-md w-full outline-none"
              onChange={inputHandle}
            />
          </div>
          <div className="flex w-full lg:w-auto flex-col space-y-3 items-start p-3">
            <label className="font-semibold" htmlFor="jobLocation">
              Job Location
            </label>
            <input
              name="jobLocation"
              value={jobLocation}
              type="text"
              className="border border-slate-400 px-2 py-1 rounded-md w-full outline-none"
              onChange={inputHandle}
            />
          </div>
          <div className="flex w-full lg:w-auto flex-col space-y-3 items-start p-3">
            <label className="font-semibold" htmlFor="jobType">
              Job Type
            </label>
            <select
              className="border border-slate-400 px-2 py-1 rounded-md w-full outline-none"
              name="jobType"
              onChange={inputHandle}
              value={jobType}
            >
              <option value="full-time">full-time</option>
              <option value="contract">contract</option>
              <option value="remote">remote</option>
              <option value="internship">internship</option>
            </select>
          </div>
          <div className="flex w-full lg:w-auto flex-col space-y-3 items-start p-3">
            <label className="font-semibold" htmlFor="jobStatus">
              Job Status
            </label>
            <select
              className="border border-slate-400 px-2 py-1 rounded-md w-full outline-none"
              name="status"
              onChange={inputHandle}
              value={status}
            >
              <option value="pending">pending</option>
              <option value="interview">interview</option>
              <option value="declined">decline</option>
            </select>
          </div>
        </div>
        <div className="flex py-8 justify-center items-center lg:w-[100vh]">
          <button
            type="submit"
            className="flex items-center space-x-2 bg-[#48A5BA] py-1 px-16 rounded-md text-white hover:opacity-90"
          >
            Save Changes
          </button>
        </div>
      </form>
    </>
  );
};

export default AddJob;
