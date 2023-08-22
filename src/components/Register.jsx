import React, { useState } from "react";
import { BsFillImageFill } from "react-icons/bs";
import logo from "../assets/logo.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";

const Register = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    const userName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const imageFile = e.target[3].files[0];

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const storageRef = ref(storage, userName);

      await uploadBytesResumable(storageRef, imageFile).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          await updateProfile(res.user, {
            displayName: userName,
            photoURL: downloadURL,
          });
  
          await setDoc(doc(db, "users", res.user.uid), {
            uid: res.user.uid,
            displayName: userName,
            email,
            photoURL: downloadURL,
          });
  
          await setDoc(doc(db, "userChats", res.user.uid), {});
          navigate("/");
        });
      })
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
        <p>Register</p>
        <form onSubmit={handleSubmit}>
          <input required type="text" placeholder="Name" />
          <input required type="email" placeholder="Email" />
          <input required type="password" placeholder="Password" />
          <input required type="file" id="avatar" style={{ display: "none" }} />
          <label htmlFor="avatar">
            <BsFillImageFill color="#A0BFE0" size={"32px"} cursor={"pointer"} />
            <span
              style={{ color: "#A0BFE0", fontSize: "13px", cursor: "pointer" }}
            >
              Upload an Avatar
            </span>
          </label>
          <button disabled={loading}>Sign Up</button>
        </form>
        {error && <span style={{ color: "red" }}>An error occured. Please try again.</span>}
        {loading && (
            <PulseLoader
              color='#7895cb'
              loading={loading}
              size={10}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
        )}
        <p>
          Have an account? <Link to="/login">Log In</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
