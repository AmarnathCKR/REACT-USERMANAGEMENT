import React, { useEffect } from "react";

import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import Profile from "./components/Profile";
import { Route, Routes, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { subscribeEmail, subscribeToken, subscribeUser } from "./store";

function App() {
  const dispatch = useDispatch()
  
  useEffect(()=>{
    const localToken = localStorage.getItem("token")
  const localEmail = localStorage.getItem("email")
  const localUser = JSON.parse(localStorage.getItem("userData"))
  
  if(localToken){
    dispatch(subscribeEmail(localEmail))
    dispatch(subscribeToken(localToken))
    dispatch(subscribeUser(localUser))
  }
  },[])


  const user =  useSelector((state) =>  state.token)
  
  return (
    <Routes>
      <Route path="/signup"  element={!user ? <SignUp /> : <Navigate to="/" />} />
      <Route path="/login"  element={!user ? <Login /> : <Navigate to="/" />} />
      <Route path="/"  element={user ? <Home /> : <Navigate to="/login" />} />
      <Route path="/profile"  element={user ? <Profile /> : <Navigate to="/login" />} />

    </Routes>
  );
}

export default App;
