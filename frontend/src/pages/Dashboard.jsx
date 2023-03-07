import React, { useState, useEffect } from "react";
import "./dashboard.css";
import { Link, useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import List from "../components/List";
import Post from "../components/Post";
import Loader from "../components/Loader";
import { Button } from "react-bootstrap";
import { Dialog } from "@mui/material";
import User from "../components/User";
import toast from "react-hot-toast";
//import Loader from '../components/Loader.jsx';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [posts, setPost] = useState(null);

  const [followersToggle, setFollowersToggle] = useState(false);
  const [followingToggle, setFollowingToggle] = useState(false);

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
      //console.log(user.followers.length);
    } else {
      navigate("/signin");
    }
  }

  async function getMyPost() {
    const res = await fetch("/api/user/my/posts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        //"Access-Control-Allow-Origin": "*", // Required for CORS support to work
      },
    });
    const data = await res.json();
    if (data.success === true) {
      setPost(data.posts);
      //console.log(posts);
    } else {
      <Loader />;
    }
  }

  async function handleLogOut() {
    const res = await fetch("/api/user/logout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*", // Required for CORS support to work
      },
      credentials: "include",
    });
    toast.success("Logout Successful");
    navigate("/signin");
  }

  async function handleProfileDelete() {
    try {
      const res = await fetch(`/api/user/delete/me`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          //"Access-Control-Allow-Origin": "*", // Required for CORS support to work
        },
        mode: "cors",
      });
      const data = await res.json();
      if (data.success === true) {
        toast.success(data.message);
        navigate("/signup");
      }
      if (data.success !== true) {
        toast.error("Something went wrong1");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  }

  function handleChangePassword() {
    navigate("/change/password");
  }
  function handleProfileEdit() {
    navigate("/edit");
  }

  useEffect(() => {
    getUser();
    getMyPost();
  });

  return (
    <>
      {/* <div className="w-[300px] m-auto">
        <div
          style={{
            color: "white",
          }}
        >
          {user ? <pre>{JSON.stringify(user.name, null, 2)}</pre> : "Loading..."}
          {user ? <pre>{JSON.stringify(user.name, null, 2)}</pre> : "Loading..."}

        </div>
      </div> */}

      <div className="w-[300px] m-auto">
        <div className="Navbar">
          <List />
        </div>
        <div className="Main">
          <div className="personalInfo">
            <br></br>
            <br></br>
            <h4 className="PersonalInformation"> </h4>
            <div className="personContainer">
              <img
                src="https://cdn-icons-png.flaticon.com/512/3135/3135823.png"
                alt="user"
                className="person"
              />
            </div>
            <div className="Info">
              <h5>{user ? user.name : "Loading..."}</h5>
              <br></br>
              <h5>Year: {user ? user.year : "Loading..."}</h5>
              <br></br>
              <h5>Branch: {user ? user.branch : "Loading..."}</h5>
              <br></br>
              <h5 className="emailad">{user ? user.email : "Loading..."}</h5>
              <div className="followingfollowers">
                <div>
                  <button
                    className="FollowersButton"
                    onClick={() => setFollowersToggle(!followersToggle)}
                  >
                    <h6>Followers</h6>
                  </button>
                  <h6 style={{ color: "white" }}>
                    {user ? user.followers.length : "Loading..."}
                  </h6>
                </div>
                <div>
                  <button
                    className="FollowersButton"
                    onClick={() => setFollowingToggle(!followingToggle)}
                  >
                    <h6>Following</h6>
                  </button>
                  <h6 style={{ color: "white" }}>
                    {user ? user.following.length : "Loading..."}
                  </h6>
                </div>
              </div>

              <div className="PostButton">
                <h6 className="Posts1">Posts</h6>
                <h6 style={{ color: "white" }}>
                  {user ? user.posts.length : "Loading..."}
                </h6>
              </div>
              <div className="buttonss">
                {/* <Button className="logoutButton" onClick={handleLogOut}>Logout</Button> */}
                {/* <Button onClick={handleProfileEdit}>Edit Profile</Button> */}
                <Button className="logoutButton" onClick={handleChangePassword}>
                  Change Password
                </Button>
                <Button
                  variant="text"
                  className="deleteMyProfile"
                  onClick={handleProfileDelete}
                >
                  Delete My Profile
                </Button>
              </div>

              <Dialog
                open={followersToggle}
                onClose={() => setFollowersToggle(!followersToggle)}
              >
                <div className="DialogBox">
                  <h4>Followers</h4>
                  {user && user.followers.length > 0 ? (
                    user.followers.map((follower) => (
                      <User
                        key={follower._id}
                        userId={follower.id}
                        name={follower.name}
                        avatar={follower.avatar}
                      />
                    ))
                  ) : (
                    <p>You have no followers </p>
                  )}
                </div>
              </Dialog>

              <Dialog
                open={followingToggle}
                onClose={() => setFollowingToggle(!followingToggle)}
              >
                <div className="DialogBox">
                  <h4>Following</h4>
                  {user && user.following.length > 0 ? (
                    user.following.map((following) => (
                      <User
                        key={following._id}
                        userId={following.id}
                        name={following.name}
                        avatar={following.avatar}
                      />
                    ))
                  ) : (
                    <p>You are not following anyone </p>
                  )}
                </div>
              </Dialog>
            </div>
          </div>
          <div className="achievements">
            <br></br>
            <h2>Achievements</h2>
            <br></br>

            {posts && posts.length > 0 ? (
              posts.map((post) => (
                <div className="posts" key={post._id}>
                  <Post
                    postImage="https://images.pexels.com/photos/531880/pexels-photo-531880.jpeg?cs=srgb&dl=pexels-pixabay-531880.jpg&fm=jpg"
                    postId={post._id}
                    desc={post.achievement_desc}
                    likes={post.likes}
                    comments={post.comments}
                    ownerImage="https://cdn-icons-png.flaticon.com/512/3135/3135823.png"
                    ownerName={post.owner.name}
                    ownerId={post.owner._id}
                    issue_org={post.issue_org}
                    category={post.category}
                    tags={post.tags}
                    isAccount={true}
                    isDelete={true}
                  />
                </div>
              ))
            ) : (
              <h3 style={{ color: "white" }}>
                <div className="card">
                  <Card style={{ width: "18rem" }}>
                    <Card.Img
                      variant="top"
                      src="https://assets.entrepreneur.com/content/3x2/2000/1661200766-shutterstock-1731355939.jpg"
                      className="cardImage"
                    />
                    <Card.Body>
                      <Card.Title className="cardTitle">Card Title</Card.Title>
                      <Card.Text className="cardText">
                        You have not made any Post yet.
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </div>
              </h3>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

// return (
//   <>
//     <div className="w-[300px] m-auto">
//       <div
//         style={{
//           color: "white",
//         }}
//       >
//         {user ? <pre>{JSON.stringify(user.name, null, 2)}</pre> : "Loading..."}
//         {user ? <pre>{JSON.stringify(user.name, null, 2)}</pre> : "Loading..."}

//       </div>
//     </div>
//  );

export default Dashboard;
