import asyncHandler from "../middleware/asynHandler.js";
import User from "../models/userModel.js";

import userModel from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

//POST REQ
//AUTH USER
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

//POST REQ
// Register User

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExit = await User.findOne({ email });
  if (userExit) {
    res.status(400);
    throw new Error("User ALready Exits");
  }
  const user = await User.create({
    name,
    email,
    password,
  });
  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error("Invalid Credentials");
  }
});

//POST REQ
//LOGUT USER

const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logout succesFully" });
});

//GET REQ
//GET  USER PROFILE

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw Error("No such user found");
  }
});

//PUT REQ
//UPDATE USER PROFILE

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password == req.body.password;
    }
    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw Error("no such user found");
  }
});

//GET REQ
//ALL USER ONLY OFR ADMINS

const getUserByid = asyncHandler(async (req, res) => {
  res.send("get  users by id");
});

//GET REQ
//ALL USER ONLY OFR ADMINS

const getUser = asyncHandler(async (req, res) => {
  res.send("get all users");
});

//DELETE REQ
// DELETE A SPECIFIC USER BY ID FOR ADMINS

const deleteUser = asyncHandler(async (req, res) => {
  res.send("delete user");
});

//PUT REQ
//ADMINS UPDATE ALL USER

const upateUser = asyncHandler(async (req, res) => {
  res.send("update users");
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUserByid,
  getUser,
  deleteUser,
  upateUser,
};
