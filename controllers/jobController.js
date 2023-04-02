import Job from "../models/Job.js";

const createJob = async (req, res) => {
  const { position, company, status, jobType, jobLocation } = req.body;
  const userId = req.user;
  if (!position || !company || !status || !jobType || !jobLocation) {
    throw new Error("Please Fill In All Fields.");
  }
  const job = await Job.create({
    position: position,
    company: company,
    status: status,
    jobType: jobType,
    jobLocation: jobLocation,
    createdBy: userId,
  });
  res.json({ msg: "Job Created Successfully", createdJob: job });
};

const deleteJob = async (req, res) => {
  const userId = req.user;
  const jobId = req.params.id;
  const job = await Job.findById(jobId);
  if (job.createdBy != userId) {
    throw new Error("Authentication Invalid");
    return;
  }
  await Job.findByIdAndDelete(jobId);
  res.json({ msg: "Job Deleted Successfully" });
};

const updateJob = async (req, res) => {
  const userId = req.user;
  const jobId = req.params.id;
  const { position, company, status, jobType, jobLocation, createdBy } =
    req.body;
  if (!position || !company || !status || !jobType || !jobLocation) {
    throw new Error("Please Fill In All Fields.");
    return;
  }
  if (createdBy != userId) {
    throw new Error("Authentication Invalid");
    return;
  }
  const job = await Job.findByIdAndUpdate(jobId, {
    position: position,
    company: company,
    status: status,
    jobType: jobType,
    jobLocation: jobLocation,
  });
  res.json({ msg: "Job Updated Successfully", updatedJob: job });
};

const allJobs = async (req, res) => {
  const userId = req.user;
  const jobs = await Job.find({ createdBy: userId });
  const noOfJobs = Job.countDocuments();
  res.json({ jobs: jobs });
};

const stats = async (req, res) => {
  let interviewJobs = [];
  let pendingJobs = [];
  let declinedJobs = [];
  const userId = req.user;
  const jobs = await Job.find({ createdBy: userId });
  jobs.forEach((job) => {
    if (job.status == "pending") {
      pendingJobs.push(job);
    }
    if (job.status == "interview") {
      interviewJobs.push(job);
    }
    if (job.status == "declined") {
      declinedJobs.push(job);
    }
  });
  res.json({
    pendings: pendingJobs.length,
    interviews: interviewJobs.length,
    declined: declinedJobs.length,
  });
};

export { allJobs, stats, createJob, deleteJob, updateJob };
