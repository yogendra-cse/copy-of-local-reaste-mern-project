// import { createContext, useEffect, useState } from "react";
// import { userData } from "../lib/dummydata";

// export const AuthContext = createContext();

// export const AuthContextProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState(() => {
//     return JSON.parse(localStorage.getItem("user")) || {userInfo :null};
//   });
//   console.log(currentUser)
//   const updateUser = (data) => {
//     const updatedUser = { ...currentUser, ...data }; 
//     localStorage.setItem("user", JSON.stringify(updatedUser)); 
//     setCurrentUser(updatedUser); 

//   };
//   const logout = () => {
//     localStorage.removeItem("user"); 
//     setCurrentUser(null); 
//   };

//   useEffect(() => {
//     const handleStorageChange = () => {
//       setCurrentUser(JSON.parse(localStorage.getItem("user")));
//     };

//     window.addEventListener("storage", handleStorageChange);
//     return () => window.removeEventListener("storage", handleStorageChange);
//   }, []);

//   return (
//     <AuthContext.Provider value={{ currentUser, updateUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    return JSON.parse(localStorage.getItem("user")) || null;
  });

  // console.log(currentUser);

  const updateUser = (data) => {
    const updatedUser = { ...currentUser, ...data };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setCurrentUser(updatedUser);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setCurrentUser(null); // ✅ Ensure UI updates
  };

  useEffect(() => {
    const handleStorageChange = () => {
      setCurrentUser(JSON.parse(localStorage.getItem("user")));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, updateUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
