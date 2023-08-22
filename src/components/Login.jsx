import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import logo from "../assets/logo.png";
import { auth } from "../firebase";
import PulseLoader from "react-spinners/PulseLoader";

const Login = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setError(true);
      setLoading(false);
      console.log(err);
    }
  };
  return (
    <div className="container">
      <div className="wrapper">
        <p className="title">
          <img src={logo} alt="logo" width={"35px"} /> <span> Vartalaap </span>
        </p>
        <p>Login</p>
        <form onSubmit={handleSubmit}>
          <input required type="email" placeholder="Email" />
          <input required type="password" placeholder="Password" />
          <button>Log In</button>
        </form>
        {error && (
          <span style={{ color: "red" }}>Incorrect Email or Password.</span>
        )}
        {loading && (
          <PulseLoader
            color="#7895cb"
            loading={loading}
            size={10}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        )}
        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
