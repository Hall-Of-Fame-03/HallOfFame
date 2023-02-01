import React, { useState } from "react";
import "./signin.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Signin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/user/login", {
      //const res = await fetch("/api/user/login", {
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
        navigate("/dashboard");
      } if (data.success !== true) {
        toast.error("Login Failure");
      }
    } catch (error) {
      toast.error("Login Failed");
    }
  };

  return (
    <div className="box">
      <main className="mainContainer">
        <p className="welcomeText"> Login </p>
        <p className="text"> TO THE HALL OF FAME </p>

        <div>
          <form method="POST">
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Link to="/forgot/password">
              <p>Forgot Password</p>
            </Link>
            <button type="submit" onClick={loginHandler}>
              {" "}
              Login
            </button>
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
