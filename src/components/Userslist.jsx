import React, { useContext, useEffect, useState } from "react";
import { BiSolidLockAlt } from "react-icons/bi";
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const Userslist = () => {
  const [userList, setUserList] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getUsers = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setUserList(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getUsers();
  }, [currentUser.uid]);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  return (
    <div className="userlist">
      {Object.entries(userList)?.sort((a, b) => b[1].date - a[1].date).map((user) => (
        <div
          key={user[0]}
          className="userchat"
          onClick={() => handleSelect(user[1].userInfo)}
        >
          <img src={user[1].userInfo.photoURL} alt="" />
          <div className="userchatinfo">
            <span>{user[1].userInfo.displayName}</span>
             <p>{user[1].lastMessage?.text}</p>
          </div>
        </div>
      ))}

      <p style={{ fontSize: "0.7rem", textAlign: "center" }}>
        <BiSolidLockAlt /> Your personal messages are end-to-end encrypted.
      </p>
    </div>
  );
};

export default Userslist;
