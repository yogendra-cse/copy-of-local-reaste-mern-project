import { useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";
import "./profileUpdatePage.scss";
import { useContext, useState } from "react";
import UploadWidget from "../../components/uploadwidget/uploadWidget";
import DOMPurify from 'dompurify';
function ProfileUpdatePage() {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { currentUser, updateUser } = useContext(AuthContext);
  const [avatar, setAvatar] = useState(currentUser.avatar || ""); // Store avatar as a string

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const formData = new FormData(e.target);
  //   const { username, email, password } = Object.fromEntries(formData);

  //   try {
  //     const token = document.cookie.split("token=")[1]; // Get token from cookies
  //     const res = await apiRequest.put(
  //       `/api/user/${currentUser.userInfo?._id || currentUser.rest?._id}`,
  //       {
  //         username,
  //         email,
  //         password,
  //         avatar, // Ensure avatar is correctly sent
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`, // Send token in Authorization header
  //         },
  //       }
  //     );
  //     updateUser(res.data);
  //     navigate("/login");
  //   } catch (err) {
  //     console.log(err);
  //     setError(err.response?.data?.message || "An error occurred");
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { username, email, password } = Object.fromEntries(formData);

    try {
      const token = document.cookie.split("token=")[1]; // Get token from cookies

      console.log("Sending update with:", {
        username,
        email,
        password,
        avatar,
      });

      const res = await apiRequest.put(
        `/api/users/${currentUser._id|| currentUser.id|| currentUser.userInfo?._id || currentUser.rest?._id}`,
        {
          username,
          email,
          password,
          avatar: Array.isArray(avatar) ? avatar[0] : avatar,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Updated user response:", res.data);

      updateUser(res.data); // ✅ Update global state properly
      navigate("/profile"); // ✅ Redirect to profile page instead of login
    } catch (err) {
      console.error("Update error:", err);
      setError(err.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="profileUpdatePage">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Update Profile</h1>
          <div className="item">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              defaultValue={currentUser.username}
            />
          </div>
          <div className="item">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              defaultValue={currentUser.email}
            />
          </div>
          <div className="item">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" />
          </div>
          <button>Update</button>
          {error && <span>{error}</span>}
        </form>
      </div>
      <div className="sideContainer">
        <img
          src={
            (Array.isArray(avatar) ? avatar[0] : avatar) ||
            "/avatar_profile.jpeg"
          }
          alt="User Avatar"
          className="avatar"
        />

        <UploadWidget
          uwConfig={{
            cloudName: "drfp9vied",
            uploadPreset: "react-estate-appPreset",
            multiple: false,
            maxImageFileSize: 2000000,
            folder: "mediaformymernweb",
          }}
          setState={(url) => {
            setAvatar(url); // Update avatar state with new image URL
            updateUser({ ...currentUser, avatar: url }); // Update AuthContext
          }}
          // setState={(url) => {
          //   console.log("Uploaded avatar URL:", url); // Debugging
          //   setAvatar(url); // Correctly update avatar state
          // }}
        />
      </div>
    </div>
  );
}

export default ProfileUpdatePage;
