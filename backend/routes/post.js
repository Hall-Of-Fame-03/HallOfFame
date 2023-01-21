import express from "express";
import { createPost, likeUnlikePost, deleteComment, deletePost, updatePostDesc, commentOnPost, getAllPostsfilter, getallPost, getPostOfFollowing } from "../controllers/post.js";
import { isAuthenticated } from "../utils/Auth.js";

const router = express.Router();

router.post("/post/upload", isAuthenticated, createPost);

router.get("/post/:id", isAuthenticated, likeUnlikePost);

router.put("/post/:id", isAuthenticated, updatePostDesc);

router.delete("/post/:id", isAuthenticated, deletePost);

router.put("/post/comment/:id", isAuthenticated, commentOnPost);

router.delete("/post/comment/:id", isAuthenticated, deleteComment);

router.get("/postsf", isAuthenticated, getAllPostsfilter);

router.get("/posts", isAuthenticated, getallPost)

router.get("/posts/following", isAuthenticated, getPostOfFollowing);

export default router