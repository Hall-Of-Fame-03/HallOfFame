import { Avatar, Dialog } from "@mui/material";
import React, {useEffect} from "react";
import { Link } from 'react-router-dom';
import "./Post.css";
import { MoreVert, Favorite, FavoriteBorder, ChatBubbleOutline, DeleteOutline } from "@mui/icons-material";
import { Button } from "react-bootstrap";
import { useState } from "react";
import toast from "react-hot-toast";
//import { data } from "../data";
import  getPostOfFollowing  from "../pages/Achieve";
import User from "../components/User.js";
import { CommentCard } from "./CommentCard";

const Post = ({
    postId,
    desc,
    postImage,
    likes=[],
    comments=[],
    ownerImage,
    ownerName,
    ownerId,
    isDelete = false,
    isAccount = false,
    issue_org,
    category,
    tags
}) => {
    const [liked, setLike] = useState(false);
    const [userLikes, setUserLikes] = useState();
    const [commentValue, setCommentValue] = useState("");
    const [commentToggle, setCommentToggle] = useState(false);
    const [descToggle, setDescToggle ] = useState(false);
    const [descAch, setDescAch] = useState(desc);
    async function getUser() {
        const res = await fetch("/api/user/whoami", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*", // Required for CORS support to work
          },
          credentials: "include",
        });
        const data = await res.json();
        //console.log(data);
        likes.forEach(item=>{
            if(item._id===data.user._id){
                setLike(true);
            }
        })
    }

    async function LikePost(postId) {
          const res = await fetch(`/api/post/like/${postId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*", // Required for CORS support to work
          },
        });
        const data = await res.json();
      if (data.success === true) {
        toast.success(data.message);
      }
      //getPostOfFollowing();                  //---- not working rn, need to look into it ------//
      }

      useEffect(() => {
        getUser();
        //eslint-disable-next-line
      }, []);
      
    const handleLike = async ()=> {
        setLike(!liked);
        await LikePost(postId);
        getPostOfFollowing();
    }

    const addCommentHandler = async (e)=>{
        e.preventDefault();
        try{
            const res = await fetch(`/api/post/comment/${postId}`, {
                method: "PUT",
                headers: {
                   "Content-Type": "application/json",
                   //"Access-Control-Allow-Origin": "*", // Required for CORS support to work
                },
                body: JSON.stringify({
                   comment:commentValue,
                }),
                mode: "cors",
            })
            const data = await res.json();
            if (data.success === true) {
               toast.success(data.message);
               setCommentValue(commentValue);
            } if (data.success !== true) {
               toast.error("Something went wrong1");
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
    }

    const updatePostHandler = async (e)=>{
        e.preventDefault();
        try{
            const res = await fetch(`/api/post/post/${postId}`, {
                method: "PUT",
                headers: {
                   "Content-Type": "application/json",
                   //"Access-Control-Allow-Origin": "*", // Required for CORS support to work
                },
                body: JSON.stringify({
                    achievement_desc: descAch ,
                }),
                mode: "cors",
            })
            const data = await res.json();
            if (data.success === true) {
               toast.success(data.message);
               setDescAch(descAch);
            } if (data.success !== true) {
               toast.error("Something went wrong1");
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
    }

    const deletePostHandler = async (e)=>{
        e.preventDefault();
        try{
            const res = await fetch(`/api/post/post/${postId}`, {
                method: "DELETE",
                headers: {
                   "Content-Type": "application/json",
                   //"Access-Control-Allow-Origin": "*", // Required for CORS support to work
                },
                mode: "cors",
            })
            const data = await res.json();
            if (data.success === true) {
               toast.success(data.message);
            } if (data.success !== true) {
               toast.error("Something went wrong1");
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
    }
    
    return (
    <div>

        <div className="postbox">
            <div className="PostHeader">
                {isAccount ? (
                    <Button onClick={()=>setDescToggle(!descToggle)}>
                        <MoreVert />
                    </Button>
                ):null}
            </div>
            <img src={postImage} alt="Post" height="400px" weight="600px" />
            <div className="PostDetails">
                <Avatar src="https://cdn-icons-png.flaticon.com/512/3135/3135823.png" alt="Uder" sx={{
                    height: "3vmax",
                    width: "3vmax",
                }} />
                <Link to={`/user/${ownerId}`}>
                    <p>{ownerName}</p>
                </Link>
                <p className="desc">{desc}</p>
            </div>
            <button style={{
                border: "none",
                backgroundColor: "white",
                cursor: "pointer"
                }}
                onClick={()=>setUserLikes(!userLikes)}
                disabled={likes.length === 0 ? true:false}
            >
                <p> {likes.length} likes </p>
            </button>
            <p>{issue_org}</p>
            <p>{category}</p>
            <p>{tags}</p>
            <div className="postFooter">
                <Button onClick={handleLike}>
                    {liked ? <Favorite style={{ color:"pink"}}/> : <FavoriteBorder/>}
                </Button>
                <Button onClick={()=> setCommentToggle(!commentToggle)}>
                    <ChatBubbleOutline />
                </Button> 
                {isDelete ? (
                    <Button onClick={deletePostHandler}>
                    <DeleteOutline />
                </Button>
                ): null }
            </div>
            {userLikes !== undefined && (
            <Dialog open={userLikes} onClose={()=>setUserLikes(!userLikes)}>
                <div className="DialogBox">
                    <h4>Liked By</h4>
                    {likes.map((like)=> (
                        <User
                        key={like._id}
                        userId={like.id}
                        name={like.name}
                        avatar={like.avatar}
                      />
                    ))}
                </div>
            </Dialog>
            )}
            {commentToggle !== undefined && (
            <Dialog open={commentToggle} onClose={()=>setCommentToggle(!commentToggle)}>
                <div className="DialogBox">
                    <h4>Comments</h4>
                    <form className="commentForm" onSubmit={addCommentHandler} method="PUT">
                        <input type="text" value={commentValue} onChange={(e) => setCommentValue(e.target.value)} placeholder="Drop your comments here..." required />
                        <Button type="submit" variant="contained">
                            Add
                        </Button>
                    </form>
                    
                    {
                        comments.length > 0 ? (
                            Object.values(comments).map((item) => {
                                if (!item || !item.user || typeof item.user !== "object") {
                                    return null;
                                  }
                                  
                              return (
                                <div>
                                    {/* {console.log(postId)} */}
                                  <CommentCard 
                                    key={item._id}
                                    user={item.user}
                                    userId={item.user._id}
                                    name={item.user.name}
                                    //avatar={item.user.avatar}
                                    comment={item.comment}
                                    commentId={item._id}
                                    postId={postId}
                                    isAccount={isAccount}
                                  />
                                </div>
                              );
                            })
                          ) : (
                            <p>No Comments Yet</p>
                          )
                    }
                </div>
            </Dialog>
            )}

            <Dialog open={descToggle} onClose={()=>setDescToggle(!descToggle)}>
                <div className="DialogBox">
                    <h4>Update Post</h4>
                    <form className="commentForm" onSubmit={updatePostHandler} method="PUT">
                        <input type="text" value={descAch} onChange={(e) => setDescAch(e.target.value)} placeholder="Achievement description..." required />
                        <Button type="submit" variant="contained">
                            Update
                        </Button>
                    </form>
                </div>
            </Dialog>
        </div>
    </div>
)};

export default Post;
