import React from "react";
import { Route, Routes } from "react-router-dom";
import Achieve from "./pages/Achieve.jsx";
import Home from "./pages/Home";
import SignIn from "./pages/Signin";
import SignUp from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import Form from "./pages/Form";
import Edit from "./pages/Edit";
import ChangePassword from "./pages/ChangePassword";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import UserProfile from "./pages/UserProfile";
import ViewProfile from "./pages/viewProfile.jsx";
//import Protected from "./components/Protected";
//import { useDispatch } from "react-redux";
//import { loadUser } from "./Actions/User";
//import { AuthContextProvider } from './context/AuthContext';

function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/achievements" element={<Achieve />} />
        <Route path="/About" element={<About />} />
        <Route path="/Form" element={<Form />} />
        <Route path="/edit" element={<Edit />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/viewProfile" element={<ViewProfile />} />
        <Route path="/change/password" element={<ChangePassword />} />
        <Route path="/forgot/password" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
        <Route path="/user/:id" element={<UserProfile />} />

      </Routes>
    </div>
  );
}

export default App;
