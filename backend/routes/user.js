import express from "express";
import { register, login, logout, updatePassword, deleteMyProfile, myProfile, getUserProfile, getAllUsers, forgotPassword, resetPassword, getMyPost, getUserPosts, updateProfile, followUser } from "../controllers/user.js";
import { isAuthenticated } from "../utils/Auth.js";


const router = express.Router();

router.post("/register", register,);

router.post("/login", login);

router.get("/logout", logout);

router.put("/update/password", isAuthenticated, updatePassword);

router.put("/update/profile", isAuthenticated, updateProfile);

router.delete("/delete/me", isAuthenticated, deleteMyProfile);

router.get("/me", isAuthenticated, myProfile);

router.get("/my/posts", isAuthenticated, getMyPost);

router.get("/userposts/:id", isAuthenticated, getUserPosts);

router.get("/users/:id", isAuthenticated, getUserProfile);

router.get("/users", isAuthenticated, getAllUsers);

router.post("/forgot/password", forgotPassword);

router.put("/password/reset/:token", resetPassword);

router.get("/follow/:id", isAuthenticated, followUser);

export default router