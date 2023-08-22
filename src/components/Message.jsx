import React, { useEffect, useRef } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div
      ref={ref}
      className={`message ${message.senderId === currentUser.uid && "owner"}`}
    >
      <div className="messageInfo">
        <div className="messageContent">
          <img
            src={
              message.senderId === currentUser.uid
                ? currentUser.photoURL
                : data.user.photoURL
            }
            alt=""
          />
          {message.text ? <p id="textMessage">{message.text}</p> : ""}
        </div>
        {message.img && (
          <img
            src={message.img}
            alt=""
            width={"200px"}
            style={{ borderRadius: "6px" }}
          />
        )}
        <div className="time">
          {new Date(message.date.seconds * 1000).toDateString()}
        </div>
      </div>
    </div>
  );
};

export default Message;
