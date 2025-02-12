// import "./Navbar.scss";
// import { useState } from "react";
// import { Link } from "react-router-dom";
// import { useContext } from "react";
// // import Profile from "../../routes_components/roleprofiles/profile.jsx";
// import { AuthContext } from "../../context/AuthContext";
// function Navbar() {
//   const { currentUser } = useContext(AuthContext);
//   const [open, setOpen] = useState(false);
//   // const user = true;
//   return (
//     <nav>
//       <div className="left">
//         <a href="/" className="logo">
//           <img src="/logo.png" alt="" />
//           <span className="logo-text"></span>
//         </a>
//         <a href="/">Home</a>
//         <a href="/">About</a>
//         <a href="/">Contact</a>
//         <a href="/">Agents</a>
//       </div>
//       <div className="right">
//         {currentUser ? (
//           <div className="user">
//             <img src={currentUser.avatar || "/noavatar.webp"} alt="" />
//             <span>{currentUser.username}</span>
//             <Link to="/profile" className="profile">
//               <span>Profile</span>
//               <div className="notification">3</div>
//             </Link>
//           </div>
//         ) : (
//           <>
//             <Link to="/login">Sign in</Link>
//             <Link to="/register" className="register">
//               Sign up
//             </Link>
//           </>
//         )}
//         <div className="menuIcon">
//           <img
//             src="/menu.png"
//             alt=""
//             onClick={() => setOpen((prev) => !prev)}
//           />
//         </div>

//         {/* <img src="/menu.png" alt="" /> */}
//         <div className={open ? "menu active" : "menu"}>
//           <a href="/">Home</a>
//           <a href="/">About</a>
//           <a href="/">Contact</a>
//           <a href="/">Agents</a>
//           <a href="/">Sign in</a>
//           <a href="/">Sign up</a>
//         </div>
//       </div>
//     </nav>
//   );
// }
// export default Navbar;
import "./Navbar.scss";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function Navbar() {
  const { currentUser } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  return (
    <nav>
      <div className="left">
        <a href="/" className="logo">
          <img src="/logo.png" alt="Logo" />
        </a>
        <a href="/">Home</a>
        <a href="/">About</a>
        <a href="/">Contact</a>
        <a href="/">Agents</a>
      </div>
      <div className="right">
        {currentUser ? (
          <div className="user">
            <img src={currentUser.avatar || "/noavatar.webp"} alt="User Avatar" />
            <span>{currentUser.username}</span>
            <Link to="/profile" className="profile">
              <span>Profile</span>
              <div className="notification">3</div>
            </Link>
          </div>
        ) : (
          <>
          
            <Link to="/login"className="register">Sign in</Link>
            <Link to="/register" className="register">
              Sign up
            </Link>
            
          </>
        )}
        <div className="menuIcon">
          <img
            src="/menu.png"
            alt="Menu"
            onClick={() => setOpen((prev) => !prev)}
          />
        </div>

        <div className={open ? "menu active" : "menu"}>
          <a href="/">Home</a>
          <a href="/">About</a>
          <a href="/">Contact</a>
          <a href="/">Agents</a>
          <Link to="/login">Sign in</Link>
          <Link to="/register">Sign up</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
