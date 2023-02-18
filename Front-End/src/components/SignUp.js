import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import PageWrapper from "./PageWrapper";

function SignUp() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      let data = {
        name: inputName,
        email: inputEmail,
        password: inputPassword,
      };
      const url = "http://localhost:3000/api/users";
      const { data: res } = await axios.post(url, data);
      navigate("/login");
      console.log(res.message);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        console.log(error.response.data.message);
        setError(error.response.data.message);
      }
    }
  };

  const [inputName, setInputName] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [nameValid, setNameValid] = useState(false);

  const handleInputName = (event) => {
    if (event.target.value.length <= 5) {
      setNameValid(true);
    } else {
      setNameValid(false);
    }

    setInputName(event.target.value);

    if (
      inputEmail.length === "" ||
      event.target.value === "" ||
      inputPassword === ""
    ) {
      setDisabled(true);
    } else {
      if (
        event.target.value.length <= 4 ||
        inputEmail.length <= 6 ||
        inputPassword.length <= 5
      ) {
        setDisabled(true);
      } else {
        setDisabled(false);
      }
    }
  };

  const handleInputEmail = (event) => {
    setInputEmail(event.target.value);
    if (event.target.value.length <= 5) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
    if (event.target.value === "" || inputName === "" || inputPassword === "") {
      setDisabled(true);
    } else {
      if (
        event.target.value.length <= 6 ||
        inputName.length <= 4 ||
        inputPassword.length <= 5
      ) {
        setDisabled(true);
      } else {
        setDisabled(false);
      }
    }
  };

  const handleInputPassword = (event) => {
    if (event.target.value.length <= 5) {
      setPasswordValid(true);
    } else {
      setPasswordValid(false);
    }
    setInputPassword(event.target.value);
    if (event.target.value === "" || inputEmail === "" || inputName === "") {
      setDisabled(true);
    } else {
      if (
        event.target.value.length <= 5 ||
        inputEmail.length <= 6 ||
        inputName.length <= 4
      ) {
        setDisabled(true);
      } else {
        setDisabled(false);
      }
    }
  };

  return (
    <PageWrapper>
    <div>
      <h1>Sign Up</h1>

      <form onSubmit={handleFormSubmit}>
        <div className="form-group d-flex m-4 align-items-center">
          <input
            onChange={handleInputName}
            value={inputName}
            type="text"
            className={
              nameValid ? "form-control border-3 border-danger" : "form-control"
            }
            required
            name="name"
            placeholder="Full name"
          />
        </div>

        <div className="form-group d-flex m-4 align-items-center">
          <input
            onChange={handleInputEmail}
            value={inputEmail}
            type="text"
            name="email"
            className={
              emailValid
                ? "form-control border-3 border-danger"
                : "form-control"
            }
            placeholder="Email"
          />
        </div>

        <div className="form-group d-flex m-4 align-items-center">
          <input
            onChange={handleInputPassword}
            value={inputPassword}
            type="password"
            name="password"
            className={
              passwordValid
                ? "form-control border-3 border-danger"
                : "form-control"
            }
            placeholder="Password"
          />
          {error && <div className="text-danger">{error}</div>}
        </div>

        <div className="form-group align-items-center m-4 d-flex justify-content-center">
          <button
            type="submit"
            className="btn btn-primary btn-block btn-lg"
            disabled={disabled}
          >
            Sign Up
          </button>
        </div>
      </form>
      <p>
        Already a user?
        <Link to="/login">
          <button type="button" className="btn btn-white">
            click here to Sign In
          </button>
        </Link>
      </p>
    </div>
    </PageWrapper>
  );
}

export default SignUp;
