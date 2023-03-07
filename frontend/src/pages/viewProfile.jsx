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
import "./viewProfile.css";
//import Loader from '../components/Loader.jsx';

const ViewProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState();

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

  useEffect(() => {
    getUser();
  });

  return (
    <>
      <div className="w-[300px] m-auto">
        <div className="Navbar">
          <List />
        </div>
        <div className="Main">
          <div className="PersonalInfo">
            <br></br>
            <br></br>
            <h4 className="PersonalInformation"></h4>
            <div className="personContainer">
              <img
                src="https://discovery.sndimg.com/content/dam/images/discovery/editorial/podcasts/Curiosity/2020/3/GettyImages-1134062152.jpg.rend.hgtvcom.476.317.suffix/1583191585259.jpeg"
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
                <Button className="cpButton" onClick={handleChangePassword}>
                  Change Password
                </Button>
                <Button
                  variant="text"
                  className="DeleteMyProfile"
                  onClick={handleProfileDelete}
                >
                  Delete My Profile
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewProfile;
