import express from "express";
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUserByid,
  getUser,
  deleteUser,
  upateUser,
} from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleWare.js";

const router = express.Router();

router
  .route("/")
  .post(registerUser)
  .get(protect, admin, getUser);
router.post("/logout", logoutUser);
router.post("/login", authUser);

router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router
  .route("/:id")
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserByid)
  .put(protect, admin, upateUser);

export default router;
