import express from "express";
const router = express.Router();
import {
  allJobs,
  stats,
  createJob,
  deleteJob,
  updateJob,
} from "../controllers/jobController.js";

router.route("/").get(allJobs);

router.route("/add").post(createJob);

router.route("/stats").get(stats);

router.route("/:id").delete(deleteJob).patch(updateJob);

export default router;
