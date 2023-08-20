import React, { useContext } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const {currentUser} = useContext(AuthContext);

  const navigate = useNavigate();
  const handleClick = () => {
    signOut(auth);
    navigate("/login");
  };

  return (
    <div className="navbar">
      <p className="title">
        <img src={currentUser.photoURL} alt="" width={"32px"} />
        <span>{currentUser.displayName}</span>
      </p>
      <div className="user">
        <button onClick={handleClick}>Log out</button>
      </div>
    </div>
  );
};

export default Navbar;
