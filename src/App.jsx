import React, { useContext } from "react";
import "./style.scss";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { currentUser } = useContext(AuthContext);

  return (
    <>
    { window.innerWidth > 499 ? 
    (
    <Router>
        <Routes>
            <Route path="/">
            <Route index element={currentUser ? <Home /> : <Login />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            </Route>
        </Routes>
        </Router>
    ) : (
      <div className="homeText">
        <p> Please change the aspect ratio or switch to desktop mode. More than 500px * 500px aspect ratio is prefered to experience the application.</p>
      </div>
      )
    }
    </>
  );
}

export default App;
