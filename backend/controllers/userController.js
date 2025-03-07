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
  const { name, email, password, isAdmin } = req.body; 
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User Already Exists");
  }
  const user = await User.create({
    name,
    email,
    password,
    isAdmin: isAdmin || false, // <-- Ensure isAdmin is passed
  });

  if (user) {
    console.log(user);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin, // Should now be correct
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
  const usersid = await userModel.findById(req.params.id).select("-password");
  if (usersid) {
    res.status(200).json(usersid);
  } else {
    res.status(404);
    throw new Error("No Such User Found");
  }
});

//GET REQ
//ALL USER ONLY OFR ADMINS

const getUser = asyncHandler(async (req, res) => {
  const users = await userModel.find({});
  res.status(200).json(users);
});

//DELETE REQ
// DELETE A SPECIFIC USER BY ID FOR ADMINS

const deleteUser = asyncHandler(async (req, res) => {
  const usersD = await userModel.findById(req.params.id);
  if (usersD) {
    if (usersD.isAdmin) {
      res.status(400);
      throw new Error("cannot delete Admin");
    }
    await userModel.deleteOne({ _id: usersD._id });
    res.status(200).json({ message: "USer DEleted Successfully" });
  } else {
    res.status(404);
    throw new Error("user not found");
  }
});

//PUT REQ
//ADMINS UPDATE ALL USER

const upateUser = asyncHandler(async (req, res) => {
  const user = await userModel.findById(req.params.id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = Boolean(req.body.isAdmin);
    const updatedUser = await user.save();
    res.status(200).json({
      _id: upateUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User NOt found in user controler line 168");
  }
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
