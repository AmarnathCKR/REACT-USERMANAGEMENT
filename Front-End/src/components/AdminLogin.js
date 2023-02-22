import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import AdminPageWrapper from "./AdminPageWrapper";
import { subscribeAdminToken, subscribeAllData } from "../store";

function AdminLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [fileData, setData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...fileData, [input.name]: input.value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      
      const url = "http://localhost:3000/api/admin/auth";
      const { data: res } = await axios.post(url, fileData);
      localStorage.setItem("all-user", JSON.stringify(res.allUser));
      dispatch(subscribeAllData(res.allUser));
      localStorage.setItem("admin-token", res.data);
      dispatch(subscribeAdminToken(res.data));
      navigate("/admin-home")
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <AdminPageWrapper>
      <h1 className="text-white">Admin Sign In</h1>
      <form onSubmit={handleFormSubmit}>
        <div className="form-group d-flex m-4 align-items-center">
          <i className="fa fa-user text-white"></i>
          <input
            type="text"
            className="form-control"
            placeholder="email"
            name="email"
            onChange={handleChange}
            value={fileData.email}
            required="required"
          />
        </div>
        <div className="form-group d-flex m-4 align-items-center">
          <i className="fa fa-lock text-white"></i>
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            name="password"
            required="required"
            onChange={handleChange}
            value={fileData.password}
          />
        </div>
        <div className="form-group align-items-center m-4 d-flex justify-content-center">
          {error && <div className="text-danger">{error}</div>}
          <input
            type="submit"
            className="btn btn-dark btn-block btn-lg"
            value="Login"
          />
        </div>
      </form>
    </AdminPageWrapper>
  );
}

export default AdminLogin;
