import React, { useState } from "react";
//import axios from 'axios';
import "./signin.css";
import { FaLock, FaUserAlt } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Signin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const loginHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          //"Access-Control-Allow-Origin": "*", // Required for CORS support to work
        },
        body: JSON.stringify({
          email,
          password,
        }),
        credentials: "include",
        mode: "cors",
      });
      const data = await res.json();
      if (data.success === true) {
        toast.success("Login Successful");
        setError(null);
        navigate("/dashboard");
      }
      if (data.success !== true) {
        setError(data.message);
        toast.error(data.message);
      }
    } catch (error) {
      setError("An unexpected error occurred");
      toast.error("Login Failed-An unexpected error occurred");
    }
  };

  return (
    <div id="simpleModal" className="Modal">
      <div className="modal-content" id="modalContent">
        <div className="modal-header" id="ModalHeader">
          <div id="login_heading">WELCOME!</div>
        </div>

        <div className="modal-body" id="ModalBody">
          <form id="LRform" method="POST" onSubmit={loginHandler}>
            <div></div>
            <div className="textbox">
              <MdAlternateEmail />
              <input
                type="email"
                className="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <br></br>
            <div className="textbox">
              <FaLock />
              <input
                type="password"
                className="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <br></br>
            <button type="submit" className="login" id="submitbtn">
              LOGIN
            </button>
            <div id="forgot">
              Don't remember your password?{" "}
              <Link to="/forgot/password">
                <p className="forgot">Forgot Password</p>
              </Link>
            </div>
            <Link to="/signup">
              <p className="new">New User?</p>
            </Link>
            {error && <p>{error}</p>}
          </form>
        </div>
      </div>
    </div>

    // <div className="box">
    //   <main className="mainContainer">
    //     <p className="welcomeText"> Login </p>
    //     <p className="text"> TO THE HALL OF FAME </p>

    //     <div>
    //       <form method="POST" onSubmit={loginHandler}>
    //         <input
    //           type="email"
    //           className="email"
    //           placeholder="Email"
    //           required
    //           value={email}
    //           onChange={(e) => setEmail(e.target.value)}
    //         />
    //         <input
    //           type="password"
    //           className="password"
    //           placeholder="Password"
    //           required
    //           value={password}
    //           onChange={(e) => setPassword(e.target.value)}
    //         />
    //         <Link to="/forgot/password">
    //           <p className="forgot">Forgot Password</p>
    //         </Link>
    //         <button type="submit" className="login">
    //           {" "}
    //           Login
    //         </button>
    //         <Link to="/signup">
    //           <p className="new">New User?</p>
    //         </Link>
    //         {error && <p>{error}</p>}
    //       </form>

    //       {/* <GoogleButton onClick={handleGoogleSignIn} /> */}
    //     </div>
    //   </main>
    // </div>
  );
};

export default Signin;
