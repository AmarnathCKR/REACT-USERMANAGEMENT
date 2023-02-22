import { useDispatch, useSelector } from "react-redux";
import AdminPageWrapper from "./AdminPageWrapper";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { useEffect, useState } from "react";
import {
  subscribeAllData,
  unsuscribeAdminToken,
  unsuscribeAllData,
} from "../store";
import AddUser from "./AddUser";
import axios from "axios";
import EditUser from "./EditUser";
function AdminDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [create, setCreate] = useState(false);
  const [edit, setEdit] = useState(false);

  const handleDelete = async (key) => {
    const data = { key: key };
    window.confirm("Are you sure");
    const url = "http://localhost:3000/api/admin/delete";
    const { data: res } = await axios.post(url, data);
    localStorage.setItem("all-user", JSON.stringify(res.data));
    dispatch(subscribeAllData(res.data));
  };

  const userData = useSelector((state) => state.allData);
  let items;
  const mappedItems = userData.map((data) => {
    items = {
      id: data._id,
      name: data.name,
      email: data.email,
      image: data.image,
    };
    return (
      <tr key={data._id}>
        <td>{data.name}</td>
        <td>
          {data.image ? (
            <img className="image-holder" src={data.image} alt="imagxcvxve" />
          ) : (
            <p>No image</p>
          )}
        </td>
        <td>{data.email}</td>
        <td>
          <button
            onClick={() => {
              setEditValue(data._id);
            }}
            className="btn btn-dark"
          >
            Edit
          </button>
        </td>
        <td>
          <button
            onClick={() => {
              handleDelete(data._id);
            }}
            className="btn btn-dark"
          >
            Delete
          </button>
        </td>
      </tr>
    );
  });

  const handleLogout = () => {
    localStorage.removeItem("all-user");
    dispatch(unsuscribeAdminToken());
    localStorage.removeItem("admin-token");
    dispatch(unsuscribeAllData());
    navigate("/admin-login");
  };
  const changeStat = () => {
    setCreate(false);
  };
  const changeEditStat = () => {
    setEdit(false);
  };
  const [users, setUsers] = useState("");
  const setEditValue = (id) => {
    userData.map((data) => {
      if (data._id === id) {
        setUsers(data);
        return data;
      }
    });

    setEdit(true);
  };

  return (
    <div className="container-fluid text-center text-white">
      <p className="h1 py-3">Admin Dashboard</p>
      <div className="row">
        {edit ? <EditUser onSubmit={changeEditStat} items={users} /> : <br />}
        {create ? (
          <AddUser onSubmit={changeStat} />
        ) : (
          <button
            className="btn btn-success my-2"
            onClick={() => {
              setCreate(true);
            }}
          >
            Create New User
          </button>
        )}
        <button onClick={handleLogout} className="btn btn-danger my-2">
          Logout
        </button>
      </div>
      <div className="container bg-white">
        <table className="table border table-striped table-bordered my-5">
          <thead>
            <th className="border">Name</th>
            <th className="border">Image</th>
            <th className="border">E-mail</th>
            <th className="border">Edit</th>
            <th className="border">Delete</th>
          </thead>
          <tbody>{mappedItems}</tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminDashboard;
