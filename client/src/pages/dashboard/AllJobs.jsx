import { useAppContext } from "../../context/AppContext";
import { GoSearch } from "react-icons/go";
import Job from "../../components/Job";
import Loading from "../../components/Loading";
import { useEffect } from "react";
import Alert from "../../components/Alert";

const AllJobs = () => {
  const { isLoading, showAlert, fetchJobs, userJobs, jobLocation } = useAppContext();
  useEffect(() => {
    fetchJobs();
  }, []);
  if (isLoading) {
    return (
      <>
        <div className="flex items-center justify-center h-[50vh] lg:w-[100vh]">
          <Loading />
        </div>
      </>
    );
  }
  return !userJobs || userJobs.length == 0 ? (
    <>
      {showAlert && <Alert />}
      <div className="flex flex-col lg:flex-row py-6 lg:justify-between">
        <div>
          <h1 className="font-base text-3xl text-slate-700">All Jobs</h1>
        </div>
      </div>
      <div className="flex mt-3">
        <h1 className="font-bold text-xl">No Jobs Found</h1>
      </div>
    </>
  ) : (
    <>
      <div className="flex flex-col lg:flex-row py-6 lg:justify-between">
        <div>
          <h1 className="font-base text-3xl text-slate-700">All Jobs</h1>
        </div>
      </div>
      <div className="flex mt-3">
        <h1 className="font-bold text-xl">{userJobs.length} Jobs Found</h1>
      </div>
      <div className="grid mt-3 grid-cols-1 md:grid-cols-2 items-center justify-items-start">
        {userJobs.map((job) => {
          return (
            <Job
              key={job._id}
              job={job}
              position={job.position}
              company={job.company}
              jobLocation={jobLocation}
              jobType={job.jobType}
              jobStatus={job.status}
              createdAt={job.createdAt}
            />
          );
        })}
      </div>
    </>
  );
};

export default AllJobs;
