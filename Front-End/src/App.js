import React from "react";

import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import Profile from "./components/Profile";
import { Route, Routes, Navigate } from "react-router-dom";

function App() {
  const user = localStorage.getItem("token");
  
  return (
    <Routes>
      {user && <Route path="/" exact element={<Home />} />}
      <Route path="/signup" exact element={<SignUp />} />
      <Route path="/login" exact element={<Login />} />
      {user && <Route path="/profile" exact element={<Profile />} />}
      {!user && <Route path="/" exact element={<Navigate replace to="/login" />} />}
      <Route path="/profile" exact element={<Navigate replace to="/login" />} />
    </Routes>
  );
}

export default App;
