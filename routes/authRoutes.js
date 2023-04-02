import express from "express";
const router = express.Router();
import {
  registerUser,
  loginUser,
  updateUser,
} from "../controllers/authController.js";
import auth from "../middlewares/auth.js";

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/update").patch(auth, updateUser);

export default router;
