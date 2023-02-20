import PageWrapper from "./PageWrapper";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { subscribeUser, unsuscribeEmail, unsuscribeToken, unsuscribeUser } from "../store";
function Profile() {

  const delta = useSelector((state) =>  state.user)

  const dispatch = useDispatch()
  const navigate = useNavigate();
  
  const [userData, setData] = useState(delta)
  
  const user = useSelector((state) =>  state.email)
 const handleImageUpload = async (event) => {
    const file = event.target.files[0];
  
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'n0d0jino');
  
    try {
      if(formData){
        const response = await axios.post(
          'https://api.cloudinary.com/v1_1/dqrpxoouq/image/upload',
          formData
        );
        
        const imageUrl = response.data.secure_url;
        
        
            let data = { userEmail: user, image :imageUrl };
            const url = "http://localhost:3000/api/users/update-image";
            const { data: res } = await axios.post(url, data);
            // localStorage.removeItem("userData")
            dispatch(unsuscribeUser())
            // localStorage.setItem("userData", JSON.stringify(res.data) );
            dispatch(subscribeUser(res.data));
            
            setData(res.data)
      }
      
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userData");
    dispatch(unsuscribeUser())
    localStorage.removeItem("token");
    dispatch(unsuscribeToken())
    localStorage.removeItem("email");
    dispatch(unsuscribeEmail())
    navigate("/login");
  };

  
  return (
    <PageWrapper>
      <div className="justify-content-center">
        <h1>Profile Page</h1>
        {userData.image && <img
          className="my-3"
          src={userData.image}
          width={70}
          height={70}
          alt="profile"
        />}
        <p>Full Name : {userData.name}</p>
        <p>Email : {userData.email}</p>
        
        <label className="btn btn-dark">
        <input type="file" onChange= {handleImageUpload}></input>
          Choose a photo
        </label>
        
        <h4>Or</h4>
        <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
      </div>
    </PageWrapper>
  );
}

export default Profile;
