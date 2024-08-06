import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import AddItem from "./components/AddItem";
import ItemList from "./components/ItemList";
import Login from "./components/Login"; // Assuming you have a Login component
import { auth } from "./firebase";
import axios from "axios";
import "./styles.css";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const token = await user.getIdToken();
        localStorage.setItem("token", token);

        await axios.post(
          "/api/user",
          {
            uid: user.uid,
            email: user.email,
            name: user.displayName,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        navigate("/");
      } else {
        navigate("/login");
      }
    });
  }, [navigate]);

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<ItemList />} />
          <Route path="/add" element={<AddItem />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
