import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Achieve from "./pages/achieve";
import Home from "./pages/Home";
import SignIn from "./pages/Signin";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import Form from "./pages/Form";
import Edit from "./pages/personal";
import Protected from "./components/Protected";
import { useDispatch } from "react-redux";
import { loadUser } from "./Actions/User";
//import { AuthContextProvider } from './context/AuthContext';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  });

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/achievements" element={<Achieve />} />
        <Route path="/About" element={<About />} />
        <Route path="/Form" element={<Form />} />
        <Route path="/edit" element={<Edit />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
