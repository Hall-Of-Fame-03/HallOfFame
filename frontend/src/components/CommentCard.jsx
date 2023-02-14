import { Button } from "@mui/material";
import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import "./CommentCard.css";
import { Delete } from '@mui/icons-material';
import toast from "react-hot-toast";

export const CommentCard = ({
  user,
  userId,
  avatar,
  comment,
  commentId,
  postId,
  isAccount
}) => {
  // console.log(commentId, postId);
  const [use, setUser] = useState({});

  const deleteCommentHandler = async (postId, commentId)=> {
    //console.log(commentId,postId);
    try{
            const res = await fetch(`/api/post/comment/${postId}/${commentId}`, {
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
            }
    } catch (error) {
        toast.error("Something went wrong");
    }
  }

  async function getUser() {
    const res = await fetch("/api/user/whoami", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        //"Access-Control-Allow-Origin": "*", // Required for CORS support to work
      },
    });
    const data = await res.json();
    if (data.success === true) {
      setUser(data.user);
      //console.log(use._id)
    } 
  }

  useEffect(() => {
    getUser();
    
  }, []);

  return (
    <div className='commentUser'>
        <Link to={`/user/${userId}`}>
        <img src="https://cdn-icons-png.flaticon.com/512/3135/3135823.png" alt={user.name} height="30px" width="30px" />
            <p style={{minHeight: "6vmax"}}>{user.name}</p>
        </Link>
        <p className="comtText">{comment}</p>
        {/* {console.log(commentId, postId)} */}
        {/* <Button onClick={() => deleteCommentHandler(postId, commentId)}>
        <Delete />
    </Button> */}

        {
          isAccount? <Button onClick={() => deleteCommentHandler(postId, commentId)}>
          <Delete />
      </Button> :  use._id===userId ? (
        <Button onClick={() => deleteCommentHandler(postId, commentId)}>
        <Delete />
    </Button>
      ): null }
      
        
    </div>
  )
}
