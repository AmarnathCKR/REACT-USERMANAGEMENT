import PageWrapper from "./PageWrapper";

import { useState } from "react";
import axios from "axios";
function Profile() {

  const [userData, setData] = useState(JSON.parse(localStorage.getItem("userData")))

 const handleImageUpload = async (event) => {
    const file = event.target.files[0];
  
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'n0d0jino');
  
    try {
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/dqrpxoouq/image/upload',
        formData
      );
      
      const imageUrl = response.data.secure_url;
      
      const user = localStorage.getItem("email");
          let data = { userEmail: user, image :imageUrl };
          const url = "http://localhost:3000/api/users/update-image";
          const { data: res } = await axios.post(url, data);
          localStorage.removeItem("userData")
          localStorage.setItem("userData", JSON.stringify(res.data) );
          const delta = localStorage.getItem("userData");
          console.log(delta)
          setData(JSON.parse(delta))
    } catch (error) {
      console.error(error);
    }
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
        <button className="btn btn-danger">Logout</button>
      </div>
    </PageWrapper>
  );
}

export default Profile;
