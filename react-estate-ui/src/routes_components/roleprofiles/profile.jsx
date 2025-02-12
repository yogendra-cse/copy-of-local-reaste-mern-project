// import "./profile.scss";
// import List from "../list/list";
// import Chat from "../../components/chat/chat";
// import apiRequest from "../../lib/apiRequest";
// import { Link, useNavigate } from "react-router";
// import { AuthContext } from "../../context/AuthContext";
// import { useContext } from "react";

// import { useState, useEffect } from "react";

// const Profile = () => {
//   const { updateUser, currentUser } = useContext(AuthContext);
//   const navigate = useNavigate();

//   // current user not exists

//   // const [user, setUser] = useState(() =>
//   //   JSON.parse(localStorage.getItem("user"))
//   // );

//   // useEffect(() => {
//   //   const handleStorageChange = () => {
//   //     setUser(JSON.parse(localStorage.getItem("user")));
//   //   };

//   //   window.addEventListener("storage", handleStorageChange);
//   //   return () => window.removeEventListener("storage", handleStorageChange);
//   // }, []);
//   // const { logout } = useContext(AuthContext);
  
  
//   const handleLogout = async (e) => {
//     e.preventDefault();
//     try {
//       await apiRequest.post("/api/auth/logout");
//       // logout(); / // Call the logout function from context
//       navigate("/login");
//     } catch (err) {
//       console.error("Logout error:", err);
//     }
//   };
  
//   return (
//     // if there is an user show the profile page

//     <div className="profilePage">
//       <div className="details">
//         <div className="wrapper">
//           <div className="title">
//             <h1>User Information</h1>
//             <Link to="/profile/update">
//               <button>Update Profile</button>
//             </Link>
//           </div>
//           <div className="info">
//             <span>
//               Avatar:
//               <img
//                 src={currentUser?.avatar || "/noavatar.webp"}
//                 alt="User Avatar"
//               />
//             </span>
//             <span>
//               {/* {console.log(currentUser)} */}
//               Username:{" "}
//               <b>
//                 {currentUser?.username ||
//                   ""}
//               </b>
//             </span>
//             <span>
//               E-mail:{" "}
//               <b>
//                 {currentUser?.email ||  ""}
//               </b>
//             </span>
//             <button onClick={handleLogout}>Logout</button>
//           </div>
//           <div className="title">
//             <h1>My List</h1>
//             <Link to ="/add">
//               <button>Create New Post</button>
//             </Link>
//           </div>
//           <List />
//           <div className="title">
//             <h1>Saved List</h1>
//           </div>
//           <List />
//         </div>
//       </div>
//       <div className="chatContainer">
//         <div className="wrapper">
//           <Chat />
//         </div>
//       </div>
//     </div>
//   );
// };
// export default Profile;
import "./profile.scss";
import List from "../list/list";
import Chat from "../../components/chat/chat";
import apiRequest from "../../lib/apiRequest";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { useLoaderData } from "react-router-dom";
const Profile = () => {
  const posts = useLoaderData();
  // console.log("useLoaderData result:", posts);

  const { updateUser, currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await apiRequest.post("/api/auth/logout");
      logout(); // ✅ Ensures AuthContext is updated properly
      navigate("/login");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <div className="profilePage">
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>User Information</h1>
            <Link to="/profile/update">
              <button>Update Profile</button>
            </Link>
          </div>
          <div className="info">
            <span>
              Avatar:
              <img
                src={currentUser?.avatar || "/noavatar.webp"}
                alt="User Avatar"
              />
            </span>
            <span>
              Username: <b>{currentUser?.userName||currentUser?.userInfo?.username || ""}</b>
            </span>
            <span>
              E-mail: <b>{currentUser?.email ||currentUser?.userInfo?.email || ""}</b>
            </span>
            <button onClick={handleLogout}>Logout</button>
          </div>
          <div className="title">
            <h1>My List</h1>
            <Link to="/add">
              <button>Create New Post</button>
            </Link>
          </div>
          <List posts={posts.userPosts || []}/>
          <div className="title">
            <h1>Saved List</h1>
          </div>
          <List posts={posts.savedPosts || []} />
        
        </div>
      </div>
      <div className="chatContainer">
        <div className="wrapper">
          <Chat />
        </div>
      </div>
    </div>
  );
};

export default Profile;
