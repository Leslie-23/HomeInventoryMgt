// import React, { useEffect } from "react";
// import { signOut } from "firebase/auth";
// import { auth } from "../firebase";
// import axios from "axios";

// const Navbar = () => {
//   useEffect(() => {
//     if (auth.currentUser) {
//       const { uid, email, displayName } = auth.currentUser;
//       axios.post("/api/users", { uid, email, displayName });
//     }
//   }, [auth.currentUser]);

//   const handleLogout = () => {
//     signOut(auth)
//       .then(() => {
//         console.log("User signed out");
//       })
//       .catch((error) => {
//         console.error("Error signing out:", error);
//       });
//   };

//   return (
//     <nav>
//       <h1>Home Inventory</h1>
//       <button onClick={handleLogout}>Logout</button>
//     </nav>
//   );
// };

// export default Navbar;
import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem("token"); // Remove token from local storage
        navigate("/login"); // Redirect to login page
        console.log("User signed out");
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };

  return (
    <nav>
      <h1>Home Inventory</h1>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
};

export default Navbar;
