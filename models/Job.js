import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "Please Provide Company Name."],
      maxlength: 50,
    },
    position: {
      type: String,
      required: [true, "Please Provide Job Position."],
      maxlength: 100,
    },
    status: {
      type: String,
      default: "pending",
      maxlength: 100,
    },
    jobType: {
      type: String,
      default: "full-time",
      maxlength: 100,
    },
    jobLocation: {
      type: String,
      default: "my city",
      required: [true, "Please Provide Job Location"],
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Must Be Logged."],
    },
  },
  {
    timestamps: true,
  }
);

const Job = mongoose.model("Job", jobSchema);

export default Job;
