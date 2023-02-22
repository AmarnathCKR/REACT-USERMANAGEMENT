import axios from "axios";
import { useState } from "react";
import { subscribeAllData } from "../store";
import { useDispatch } from "react-redux";

function AddUser({onSubmit}) {
    const dispatch = useDispatch()
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
      localStorage.setItem("all-user", JSON.stringify(res.data));
      dispatch(subscribeAllData(res.data));
      
      console.log(res.message);

      onSubmit()
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
    <div className="col-lg-12">
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
            Add user
          </button>
          <button className="btn btn-danger btn-block btn-lg mx-3" onClick={()=>{onSubmit()}}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default AddUser