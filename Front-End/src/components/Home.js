import PageWrapper from "./PageWrapper";
import { Link } from "react-router-dom";
function Home() {
 const handleLogout = () => {
    
    localStorage.removeItem("token")
    window.location.reload();
  }

    const userData = JSON.parse(localStorage.getItem("userData")) 
    
  
    return (
      <PageWrapper>
        <div>
          <h1 className="text-success">Login Successful!!!</h1>
          <h3>Welcome Back, {userData.name}</h3>
          <Link to="/profile">
          <button className="btn btn-primary">Profile</button>
          </Link>
          <span className="mx-3">Or</span>
          <button className="btn btn-danger" onClick={handleLogout}>Click here to Logout</button>
        </div>
        </PageWrapper>
    )
}

export default Home