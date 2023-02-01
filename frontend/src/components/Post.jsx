import { Avatar, Link } from "@mui/material";
import React, {useEffect} from "react";
import "./Post.css";
import { MoreVert, Favorite, FavoriteBorder, ChatBubbleOutline, DeleteOutline } from "@mui/icons-material";
import { Button } from "react-bootstrap";
import { useState } from "react";
import toast from "react-hot-toast";
//import { data } from "../data";
import  getPostOfFollowing  from "../pages/achieve";
//import User from "../../../backend/models/User";

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
    const [liked, setLike] = useState();

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

    async function LikePost(id) {
          const res = await fetch(`/api/post/post/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*", // Required for CORS support to work
          },
          credentials: "include",
        });
        const data = await res.json();
      if (data.success === true) {
        toast.success(data.message);
      }
      //getPostOfFollowing();                  //---- not working rn, need to look into it ------//
      }

      useEffect(() => {
        getUser();
      }, []);
      
    const handleLike = async ()=> {
        setLike(!liked);
        await LikePost(postId);
        getPostOfFollowing();
    }
    
    return (
    <div>

        <div className="postbox">
            <div className="PostHeader">
                {isAccount ? (
                    <Button>
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
                }}>
                <p> {likes.length} likes </p>
            </button>
            <p>{issue_org}</p>
            <p>{category}</p>
            <p>{tags}</p>
            <div className="postFooter">
                <Button onClick={handleLike}>
                    {liked ? <Favorite style={{ color:"pink"}}/> : <FavoriteBorder/>}
                </Button>
                <Button>
                    <ChatBubbleOutline />
                </Button> 
                {isDelete ? (
                    <Button>
                    <DeleteOutline />
                </Button>
                ): null }
            </div>
        </div>


    </div>
)};

export default Post;
