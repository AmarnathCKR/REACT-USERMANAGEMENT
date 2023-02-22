import { useState } from "react";
import { subscribeAllData } from "../store";
import { useDispatch } from "react-redux";
import axios from "axios";

function EditUser({ items, onSubmit }) {
  const dispatch = useDispatch();
  const [error, setError] = useState("");

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      let data = {
        name: inputName,
        id : items._id
      };
      const url = "http://localhost:3000/api/admin/user-edit";
      const { data: res } = await axios.post(url, data);
      localStorage.setItem("all-user", JSON.stringify(res.data));
      dispatch(subscribeAllData(res.data));

    
      onSubmit();
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

  const [inputName, setInputName] = useState(items.name);
  const [inputEmail, setInputEmail] = useState(items.email);

  const [disabled, setDisabled] = useState(true);
//   const [emailValid, setEmailValid] = useState(false);

  const [nameValid, setNameValid] = useState(false);

  const handleInputName = (event) => {
    if (event.target.value.length <= 5) {
      setNameValid(true);
    } else {
      setNameValid(false);
    }

    setInputName(event.target.value);

    if (inputEmail.length === "" || event.target.value === "") {
      setDisabled(true);
    } else {
      if (event.target.value.length <= 4 || inputEmail.length <= 6) {
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
          {error && <div className="text-danger">{error}</div>}
        </div>

        <div className="form-group align-items-center m-4 d-flex justify-content-center">
          <button
            type="submit"
            className="btn btn-primary btn-block btn-lg"
            disabled={disabled}
          >
            Confirm user
          </button>
          <button
            className="btn btn-danger btn-block btn-lg mx-3"
            onClick={() => {
              onSubmit();
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditUser;
