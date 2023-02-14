import { Dialog } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Button, Card } from 'react-bootstrap';
import { toast } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
//import List from '../components/List';
import Loader from '../components/Loader';
import NavBar from '../components/Navbar';
//import NavBar from '../components/Navbar';
import Post from '../components/Post';
import User from '../components/User';

export default function UserProfile() {
    const navigate = useNavigate();
  const [user, setUser] = useState();
  const [ouser, setOUser] = useState();
  const [posts, setPost] = useState(null);

  const [followersToggle, setFollowersToggle] = useState(false);
  const [followingToggle, setFollowingToggle] = useState(false);
  const [following, setFollowing] = useState(false);
  const [myProfile, setMyProfile] = useState(false);
  const params=useParams();


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
      setOUser(data.ouser);
      //console.log(user._id);
    } else {
      navigate("/signin");
    }
    if(ouser._id === params.id){
        setMyProfile(true);
    }
    if(user) {
        user.followers.forEach((item)=> {
            if(item._id === ouser.id){
                setFollowing(true);
            } else {
                setFollowing(false);
            }
        });
    }
  }


  async function getUserProfile() {
    const res = await fetch(`/api/user/users/${params.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        //"Access-Control-Allow-Origin": "*", // Required for CORS support to work
      },
    });
    const data = await res.json();
    if (data.success === true) {
      setUser(data.user);
      //console.log(myProfile);
    } else {
      navigate("/signin");
    }
  }



  async function getUserPost() {
    const res = await fetch(`/api/user/userposts/${params.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        //"Access-Control-Allow-Origin": "*", // Required for CORS support to work
      }
    });
    const data = await res.json();
    if (data.success === true) {
        setPost(data.posts);
        //console.log(posts);
    } else {
        <Loader/>
    }
  }

  async function handleFollow() {
    const res = await fetch(`/api/user/follow/${params.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*", // Required for CORS support to work
      }
    });
    const data = await res.json();
      if (data.success === true) {
        setFollowing(!following);
        toast.success(data.message);
      }
  }


  useEffect(() => {
    getUser();
    getUserProfile();
    getUserPost();
  });


  return (
    <>
        <div className="w-[300px] m-auto">
    <div className="Navbar">
      <NavBar />
    </div>
    <div className="Main">
      <div className="personalInfo">
        <br></br>
        <h4>Personal Information </h4>
        <div className="personContainer">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135823.png"
            alt="user"
            className="person"
          />
        </div>
        <div className="Info">
          <h5>{user ? user.name : 'Loading...'}</h5>
          <br></br>
          <h5>{user ? user.year : 'Loading...'}</h5>
          <br></br>
          <h5>{user ? user.branch : 'Loading...'}</h5>
          <br></br>
          <h5>{user ? user.email : 'Loading...'}</h5> 
          <div>
          <button onClick={()=>setFollowersToggle(!followersToggle)}>
            <h6>Followers</h6>
          </button>
          <h6 style={{color:"white"}}>{user ? user.followers.length : 'Loading...'}</h6>
          </div>
          <div>
          <button  onClick={()=>setFollowingToggle(!followingToggle)}>
            <h6>Following</h6>
          </button>
          <h6 style={{color:"white"}}>{user ? user.following.length : 'Loading...'}</h6>
          </div>
          <div>
          <h6>Posts</h6>
          <h6 style={{color:"white"}}>{user ? user.posts.length : 'Loading...'}</h6>
          </div>


          {
            myProfile?null:(
                <Button onClick={handleFollow}>
                    {
                        following ? "Unfollow" : "Follow"
                    }
                </Button>
            )
          }
          


          <Dialog open={followersToggle} onClose={()=>setFollowersToggle(!followersToggle)}>
                <div className="DialogBox">
                    <h4>Followers</h4>
                    {user && user.followers.length > 0 ? user.followers.map((follower) => ((
                      <User
                      key={follower._id}
                      userId={follower.id}
                      name={follower.name}
                      avatar={follower.avatar}
                    />
                    ))) : (<p>User has no followers </p>)
                    }
                       
                </div>
          </Dialog>

          <Dialog open={followingToggle} onClose={()=>setFollowingToggle(!followingToggle)}>
                <div className="DialogBox">
                    <h4>Following</h4>
                    {user && user.following.length > 0 ? user.following.map((following) => ((
                      <User
                      key={following._id}
                      userId={following.id}
                      name={following.name}
                      avatar={following.avatar}
                    />
                    ))) : (<p>User is not following anyone </p>)
                    }
                       
                </div>
          </Dialog>
        </div>
      </div>
      <div className="achievements">
        <br></br>
        <h2>Achievements</h2>
        <br></br>

        { 
        (
          posts && posts.length > 0 ? posts.map((post)=>(
              <div className="posts" key={post._id}>
              <Post 
      postImage="https://images.pexels.com/photos/531880/pexels-photo-531880.jpeg?cs=srgb&dl=pexels-pixabay-531880.jpg&fm=jpg"
      postId={post._id}
      desc={post.achievement_desc}
      likes = {post.likes}
      comments = {post.comments}
      ownerImage = "https://cdn-icons-png.flaticon.com/512/3135/3135823.png"
      ownerName = {post.owner.name}
      ownerId = {post.owner._id}
      issue_org = {post.issue_org}
      category = {post.category}
      tags = {post.tags}
      isAccount={false}
      isDelete={false}
      />
      </div>
          )) : (<h3 style={{color:"white"}}><div className="card">
          <Card style={{ width: "18rem" }}>
            <Card.Img
              variant="top"
              src="https://assets.entrepreneur.com/content/3x2/2000/1661200766-shutterstock-1731355939.jpg"
              className="cardImage"
            />
            <Card.Body>
              <Card.Title className="cardTitle">Card Title</Card.Title>
              <Card.Text className="cardText">
                User has not made any Post yet.
              </Card.Text>
            </Card.Body>
          </Card>
        </div></h3>)
      )
          }
      </div>
    </div>
  </div>

    </>
  );
}
