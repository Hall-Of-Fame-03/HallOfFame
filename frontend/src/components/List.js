import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import './List.css';
import toast from "react-hot-toast";
import { useRef } from 'react';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import mainLogo from '../images/logo.png';
import 'bootstrap/dist/css/bootstrap.css';

const List = () => {

  // const {user, logOut} = UserAuth();

  // const handleSignOut = async () => {
  //   try{
  //     await logOut()
  //   } catch(error){
  //     console.log(error);
  //   }
  // }

  const navRef = useRef();
  const showNavbar = () => {
    navRef.current.toggle("responsive_nav");
  }
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

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
    if (data.success === true) {
      setUser(data.user);
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

  useEffect(() => {
    getUser();
  }, []);


  return (
    <>

      <Navbar variant="dark" expand="lg" className="p-3">
        <Container>
          <Navbar.Brand >
            <img
              alt=""
              src={mainLogo}
              width="140"
              height="50"
              className="d-inline-block align-top"
            />{' '}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto" >
              <Nav.Link href="#home"></Nav.Link>
            </Nav>


            <Nav className="gap-2">
              <NavLink exact="true" to="/achievements" className="listItem" activeclassname="active">Home</NavLink>
              <NavLink exact="true" to="/About" className="listItem" activeclassname="active">About</NavLink>
              <NavLink to="/edit" className="listItem" activeclassname="active">Edit Profile</NavLink>
              <NavLink to="/Form" className="listItem" activeclassname="active">Add Achievements</NavLink>
               <NavLink to="/viewProfile" className="listItem vprofile" activeclassname="active">View Profile</NavLink>
              <NavLink to="/achievements" className="listItem" activeclassname="active" onClick={handleLogOut}>Logout</NavLink>
             
            </Nav>


          </Navbar.Collapse>
        </Container>
      </Navbar>

    </>
  )

}
export default List;
