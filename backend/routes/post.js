import express from "express";
import { createPost, likeUnlikePost, deleteComment, deletePost, updatePostDesc, commentOnPost, getAllPostsfilter, getallPost, getPostOfFollowing } from "../controllers/post.js";
import { isAuthenticated } from "../utils/Auth.js";

const router = express.Router();

router.post("/post/upload", isAuthenticated, createPost);

router.get("/like/:id", isAuthenticated, likeUnlikePost);

router.put("/post/:id", isAuthenticated, updatePostDesc);

router.delete("/post/:id", isAuthenticated, deletePost);

router.put("/comment/:id", isAuthenticated, commentOnPost);

router.delete("/comment/:id/:commentId", isAuthenticated, deleteComment);

router.get("/postsf", isAuthenticated, getAllPostsfilter);

router.get("/posts", isAuthenticated, getallPost)

router.get("/posts/following", isAuthenticated, getPostOfFollowing);

export default router