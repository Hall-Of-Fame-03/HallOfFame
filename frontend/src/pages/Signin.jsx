import React, { useState } from "react";
//import axios from 'axios';
import "./signin.css";
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
      } if (data.success !== true) {
        setError(data.message);
        toast.error(data.message);
      }
    } catch (error) {
      setError('An unexpected error occurred');
      toast.error("Login Failed-An unexpected error occurred");
    }
  };


  return (
    <div className="box">
      <main className="mainContainer">
        <p className="welcomeText"> Login </p>
        <p className="text"> TO THE HALL OF FAME </p>

        <div>
          <form method="POST" onSubmit={loginHandler}>
            <input
              type="email"
              className="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Link to="/forgot/password">
              <p className="forgot">Forgot Password</p>
            </Link>
            <button type="submit" className="login">
              {" "}
              Login
            </button>
            <Link to="/signup">
              <p className="new">New User?</p>
            </Link>
            {error && <p>{error}</p>}
          </form>

          {/* <GoogleButton onClick={handleGoogleSignIn} /> */}
        </div>
      </main>
    </div>
  );
};

export default Signin;
