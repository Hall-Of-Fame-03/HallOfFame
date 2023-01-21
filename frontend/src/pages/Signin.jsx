import React, { useState } from 'react'
import './signin.css'
//import {GoogleButton} from 'react-google-button';
//import {UserAuth} from '../context/AuthContext';
import { Link } from 'react-router-dom';
//import { Button } from 'bootstrap';
//import { Typography } from '@mui/material';
//import { useDispatch } from 'react-redux';
//import { loginUser } from '../Actions/User';
import {useNavigate} from "react-router-dom";
//import { async } from '@firebase/util';


const Signin = () => {
  //const { googleSignIn, user } = UserAuth();
  //const navigate = useNavigate();
  /*

  const handleGoogleSignIn = async () => {
    try{
      await googleSignIn();
    } catch(error){
      console.log(error)
    }
  };

useEffect(() => {
  if(user?.displayName){
    navigate('/achievements');
  }
}, [user]);
*/
const navigate = useNavigate();
const[email,setEmail]= useState("");
const[password,setPassword]= useState("");
//const dispatch = useDispatch();


const loginHandler = async (e) => {
  e.preventDefault();
  //console.log(email,password);
  //dispatch(loginUser(email, password));

  const res = await fetch("http://localhost:8777/api/user/login", {
    method:"POST",
    headers:{
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email,
      password
    })
  });
  const data=res.json();
  if(res.status === 400 || res.status=== 500 || !data){
    window.alert("Invalid Credentials");
  } else {
    window.alert("Login Successful");
    navigate('/achievements');
  }
}

  return (
    <div className='box'>
    <main className="mainContainer">

      <p className="welcomeText"> Login </p> 
      <p className='text'> TO THE HALL OF FAME </p>
      
      <div>
        <form method='POST'>
          <input type="email" placeholder='Email' required value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder='Password' required value={password} onChange={(e) => setPassword(e.target.value)}/>
          <Link to="/forgot/password">
            <p>Forgot Password</p>
          </Link>
          <button type='submit' onClick={loginHandler}> Login</button>
          <Link to="/register">
            <p>New User?</p>
          </Link>
          

        </form>
      
   {/* <GoogleButton onClick={handleGoogleSignIn} /> */}
    </div>
    </main>
    </div>
    
  );
};
 
export default Signin;