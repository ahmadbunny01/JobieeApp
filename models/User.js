import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Provide Name."],
    minlength: 3,
    maxlength: 20,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please Provide Email."],
    validate: {
      validator: validator.isEmail,
      message: "Please Enter Valid Email Address.",
    },
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please Provide Password."],
    minlength: 6,
    select: false,
  },
  location: {
    type: String,
    trim: true,
    maxlength: 20,
    default: "My City",
  },
});

userSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id }, process.env.SECRET_KEY, {
    expiresIn: "1d",
  });
};

userSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

const User = mongoose.model("User", userSchema);

export default User;
