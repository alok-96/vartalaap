import React, { useState } from "react";
import { BsFillImageFill } from "react-icons/bs";
import logo from "../assets/logo.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const imageFile = e.target[3].files[0];

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const storageRef = ref(storage, userName);

      const uploadTask = uploadBytesResumable(storageRef, imageFile);

      uploadTask.on(
        (error) => {
          setError(true);
        },
        async () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
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
        }
      );
    } catch (err) {
      setError(true);
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
          <button>Sign Up</button>
        </form>
        {error && <span style={{ color: "red" }}>An error occured.</span>}
        <p>
          Have an account? <Link to="/login">Log In</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
