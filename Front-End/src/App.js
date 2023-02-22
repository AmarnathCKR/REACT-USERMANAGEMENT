import React, { useEffect } from "react";

import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import Profile from "./components/Profile";
import { Route, Routes, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  subscribeAdminToken,
  subscribeAllData,
  subscribeEmail,
  subscribeToken,
  subscribeUser,
} from "./store";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const localToken = localStorage.getItem("token");
    const localEmail = localStorage.getItem("email");
    const localUser = JSON.parse(localStorage.getItem("userData"));
    const localAdmin = localStorage.getItem("admin-token");
    const allUser = JSON.parse(localStorage.getItem("all-user"));
    if (localToken) {
      dispatch(subscribeEmail(localEmail));
      dispatch(subscribeToken(localToken));
      dispatch(subscribeUser(localUser));
    }
    if (localAdmin) {
      dispatch(subscribeAdminToken(localAdmin));
      dispatch(subscribeAllData(allUser));
    }
  }, []);

  const user = useSelector((state) => state.token);
  const admin = useSelector((state) => state.adminToken);
  return (
    <Routes>
      <Route
        path="/signup"
        element={!user ? <SignUp /> : <Navigate to="/" />}
      />
      <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
      <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
      <Route
        path="/profile"
        element={user ? <Profile /> : <Navigate to="/login" />}
      />
      <Route
        path="/admin-login"
        element={!admin ? <AdminLogin /> : <Navigate to="/admin-home" />}
      />
      <Route
        path="/admin-home"
        element={admin ? <AdminDashboard /> : <Navigate to="/admin-login" />}
      />
    </Routes>
  );
}

export default App;
