import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import PageWrapper from "./PageWrapper";
import { useDispatch} from "react-redux";
import { subscribeEmail, subscribeToken, subscribeUser } from "../store";

function Login() {
  const dispatch = useDispatch();

  const [fileData, setData] = useState({
    email: "",
    password: "",
  });
 
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...fileData, [input.name]: input.value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const url = "http://localhost:3000/api/auth";
      const { data: res } = await axios.post(url, fileData);
      localStorage.setItem("token", res.data.token);
      dispatch(subscribeToken(res.data.token));
      localStorage.setItem("email", res.data.email);
      dispatch(subscribeEmail(res.data.email));
      const getUserData = async () => {
       
          
          let data = { userEmail: fileData.email };
          const url = "http://localhost:3000/api/auth/user-data";
          const { data: res } = await axios.post(url, data);
          localStorage.setItem("userData", JSON.stringify(res.data) );
          dispatch(subscribeUser(res.data));
          navigate("/");
       
      };

      getUserData();
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
    <PageWrapper>
      <div>

        <h1>Login Page</h1>
        <form onSubmit={handleFormSubmit}>
          <div className="form-group d-flex m-4 align-items-center">
            <i className="fa fa-user"></i>
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
            <i className="fa fa-lock"></i>
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
              className="btn btn-primary btn-block btn-lg"
              value="Login"
            />
          </div>
          <p>
            Dont have an account?{" "}
            <Link to="/signup">
              <button className="btn btn-white">Click here to register</button>
            </Link>
          </p>
        </form>
      </div>
    </PageWrapper>
  );
}

export default Login;
