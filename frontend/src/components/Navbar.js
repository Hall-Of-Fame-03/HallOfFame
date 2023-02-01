import React , {useContext, useState, useEffect} from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import mainLogo from'../images/logo.png';
import 'bootstrap/dist/css/bootstrap.css';
import profile from "../images/girl.png";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


//import {UserAuth} from '../context/AuthContext'


const NavBar = () => {
/*
  const {user, logOut} = UserAuth();

  const handleSignOut = async () => {
    try{
      await logOut()
    } catch(error){
      console.log(error);
    }
  }
  */

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


                  {user 
                  ? <Nav className="gap-2">
                    <Nav.Link className="btn btn-black" href="/achievements">Home</Nav.Link>
                    <Nav.Link className="btn btn-black" href="/About">About</Nav.Link>
                    <Nav.Link className="btn btn-black" onClick={handleLogOut}>LogOut</Nav.Link>
                    <Nav.Link className="btn btn-black" href="/dashboard">
                    <img alt="" src={profile} width="40" height="40" className="d-inline-block align-top" />{' '} </Nav.Link> 
                    </Nav>

                  : <Nav className="gap-2">
                    <Nav.Link className="btn btn-black" href="/achievements">Home</Nav.Link>
                    <Nav.Link className="btn btn-black" href="/About">About</Nav.Link>
                    <Nav.Link className="btn btn-black" href="/signin">Login</Nav.Link>
                    </Nav>
                  }

                </Navbar.Collapse>
              </Container>
            </Navbar>
          </>
        );
}

export default NavBar;



/*   {user?.displayName 
                  ? <Nav className="gap-2">
                    <Nav.Link className="btn btn-black" href="/achievements">Home</Nav.Link>
                    <Nav.Link className="btn btn-black" href="/About">About</Nav.Link>
                    <Nav.Link className="btn btn-black" onClick={handleSignOut}>LogOut</Nav.Link>
                    <Nav.Link className="btn btn-black" >LogOut</Nav.Link>
                    <Nav.Link className="btn btn-black" href="/dashboard">
                    <img alt="" src={profile} width="40" height="40" className="d-inline-block align-top" />{' '} </Nav.Link> 
                    </Nav>

                  : <Nav className="gap-2">
                    <Nav.Link className="btn btn-black" href="/achievements">Home</Nav.Link>
                    <Nav.Link className="btn btn-black" href="/About">About</Nav.Link>
                    <Nav.Link className="btn btn-black" href="/signin">Login</Nav.Link>
                    </Nav>
                  }

*/