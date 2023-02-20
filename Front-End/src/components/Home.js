import { useDispatch, useSelector } from "react-redux";
import PageWrapper from "./PageWrapper";
import { Link,useNavigate } from "react-router-dom";
import { unsuscribeEmail, unsuscribeToken, unsuscribeUser } from "../store";


function Home() {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("userData");
    dispatch(unsuscribeUser)
    localStorage.removeItem("token");
    dispatch(unsuscribeToken)
    localStorage.removeItem("email");
    dispatch(unsuscribeEmail)
    navigate("/login");
  };

  // const userData = JSON.parse(localStorage.getItem("userData"));

  const userData = useSelector((state) =>  state.user)

  
  

  return (
    <PageWrapper>
      <div>
        <h1 className="text-success">Login Successful!!!</h1>
        <h3>Welcome Back, {userData.name}</h3>
        <Link to="/profile">
          <button className="btn btn-primary">Profile</button>
        </Link>
        <span className="mx-3">Or</span>
        <button className="btn btn-danger" onClick={handleLogout}>
          Click here to Logout
        </button>
      </div>
    </PageWrapper>
  );
}

export default Home;
