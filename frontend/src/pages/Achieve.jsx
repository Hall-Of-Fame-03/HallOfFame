import React, { useState, createContext, useEffect } from "react";
//import { data } from "../data";
//import Card from "../components/Card";
import { Button } from "react-bootstrap";
import NavBar from "../components/Navbar";
import User from "../components/User";
import Post from "../components/Post.jsx";
//import LoginProvider from "../components/LoginProvider";
import './achieve.css';
import Loader from "../components/Loader";
import { async } from "@firebase/util";



const Achieve = () => {

    const [posts, setPost] = useState(null);
    const [fposts, setFPost] = useState(null);
    const [users, setAllUsers] = useState(null);
    const [name, setName] = useState(null);


    // const [cards, setCards] = useState(data);
    // const cats = ["all", ...new Set(data.map((card) => card.category))];

    // const filter = (cat) => {
    //     if (cat === "all") {
    //         setCards(data);
    //         return;
    //     }
    //     setCards(data.filter((item) => item.category === cat));
    // };

    async function getPostOfFollowing() {
        const res = await fetch("/api/post/posts/following", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*", // Required for CORS support to work
          },
          credentials: "include",
        });
        const data = await res.json();
        if (data.success === true) {
            setPost(data.posts);
        } else {
            <Loader/>
        }
      }

      async function getPostFeatured() {
        const res = await fetch("/api/post/posts?totalLikes[gt]=2", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*", // Required for CORS support to work
          },
          credentials: "include",
        });
        const data = await res.json();
        if (data.success === true) {
            setFPost(data.post);
            //console.log(fposts._id);
        } else {
            <Loader/>
        }
      }


      async function getAllUsers(name="") {
        const res = await fetch(`/api/user/users?keyword=${name}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*", // Required for CORS support to work
          },
          credentials: "include",
        });
        const data = await res.json();
        if (data.success === true) {
            setAllUsers(data.users);
        } else {
            <Loader/>
        }
      }

      async function searchHandler(e) {
        e.preventDefault();
        const res = await fetch(`/api/user/users?keyword=${name}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*", // Required for CORS support to work
          },
          credentials: "include",
        });
        const data = await res.json();
        if (data.success === true) {
            setAllUsers(data.users);
        } else {
            <Loader/>
        }
      }
    
      useEffect(() => {
        getPostOfFollowing();
        getPostFeatured();
        getAllUsers();
      }, []);


    return (
        <div className="Achieve">

            
                <NavBar />
            
            <h1>HALL OF FAME</h1>
            <div className="home">
            {/* <Button categories={cats} handleClick={filter} /> */}
            {/* <Card allcards={cards} /> */}

            loading?<Loader/>: (
                <div className="homeleft">
                {
                    posts && posts.length > 0 ? posts.map((post)=>(
                        <div className="posts" key={post.id}>
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
                />
                </div>
                    )) : fposts && fposts.length > 0 ? fposts.map((post)=>(
                      <div className="posts" key={post.id}>
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
              />
              </div>
                  )) 
                     : (<h5>No Post yet</h5>)
              }
                
            </div>
            )

            <form onSubmit={searchHandler}>
              <input type="text" value={name} placeholder="Search Name" onChange={(e)=> setName(e.target.value)} />
              <Button type="submit">Search</Button>

              loading? <Loader/>: (
            <div className="homeright">
            {
            users && users.length > 0 ? users.map((user)=>(
            <div color="white" key={user._id}>
            <User
              userId={user._id}
              name={user.name}
              avatar={user.avatar}
            />
            </div>

           )) : <h3 style={{color:"white"}}>No users yet</h3>
            }
            </div>
            )
            </form>
    
      </div>
        </div>
    );
}

export default Achieve;