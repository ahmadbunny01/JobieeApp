import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcryptjs";

const registerUser = async (req, res) => {
  let token;
  const { name, email, password, location } = req.body;
  if (!name || !email || !password) {
    throw new Error("Please Fill In All Fields");
  }
  const userAlreadyExists = await User.findOne({ email });
  if (userAlreadyExists) {
    throw new Error("Email Already In Use.");
  }
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);
  let user = await User.create({
    name: name,
    email: email,
    password: passwordHash,
    location: location,
  });
  user = await user.save();
  if (user) {
    token = user.createJWT();
  }
  res.status(StatusCodes.OK).json({
    message: "User Added Successfully",
    user: {
      name: user.name,
      email: user.email,
      location: user.location,
    },
    token: token,
    location: user.location,
  });
};

const loginUser = async (req, res) => {
  let token;
  const { email, password } = req.body;
  if (!email || !password) {
    throw new Error("Please Provide All Fields.");
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new Error("No User Found With Given Email.");
  }
  const correctPassword = await user.comparePassword(password);
  if (!correctPassword) {
    throw new Error("Invalid Password.");
  }
  if (user && correctPassword) {
    token = user.createJWT();
  }
  res.status(StatusCodes.OK).json({
    message: "User Login Successful.",
    user: {
      name: user.name,
      email: user.email,
      location: user.location,
    },
    token: token,
    location: user.location,
  });
};

const updateUser = async (req, res) => {
  let token;
  const { name, email, location } = req.body;
  if (!name || !email || !location) {
    throw new Error("Please Fill In All Fields");
  }
  const userID = req.user;
  let user = await User.findOne({ _id: userID });
  user.name = name;
  user.email = email;
  user.location = location;
  user = await user.save();
  if (user) {
    token = user.createJWT();
  }
  res.json({
    msg: "User Updated Successfully.",
    user: {
      name: user.name,
      email: user.email,
      location: user.location,
    },
    token: token,
    location: user.location,
  });
};

export { registerUser, loginUser, updateUser };
