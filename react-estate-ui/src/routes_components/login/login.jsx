import "./login.scss";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";
import { useContext,useState } from "react";
import apiRequest from "../../lib/apiRequest";
import { AuthContext } from "../../context/AuthContext";
function Login() {
    const {updateUser} = useContext(AuthContext)
  
  const [error,setError] = useState("")
  const [isLoading,setIsLoading] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
  
    const formData = new FormData(e.target);
    const username = formData.get("username");
    const password = formData.get("password");
  
    console.log("Logging in with:", username, password);
  
    try {
      const res = await apiRequest.post("/api/auth/login", { username, password },{withCredentials:true});
      console.log(res);
      if (res.data) {
        updateUser(res.data); // Update context state first
        localStorage.setItem("user", JSON.stringify(res.data)); // Ensure localStorage is updated
  
        // console.log("ed in successfully:", res.data);
        
        navigate("/profile"); // Navigate to profile after successful login
        // window.location.reload();
      } else {
        throw new Error("Invalid response data from server");
      }
    } catch (err) {
      console.error("Login error:", err);
  
      if (err.response && err.response.data) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="login">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Welcome back hi</h1>
          <input name="username" required minLength={3}  maxLength={20} type="text" placeholder="Username" />
          <input name="password" required  type="password" placeholder="Password" />
          <button disabled={isLoading}>Login</button>
          {error && <span>{error}</span>}
          <Link to="/register">{"Don't"} you have an account?</Link>
        </form>
      </div>

      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Login;
