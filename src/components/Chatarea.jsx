import React from "react";
import { FaVideo, FaUserPlus } from "react-icons/fa";
import { BiMessageDetail } from "react-icons/bi";
import { HiDotsVertical } from "react-icons/hi";
import Messages from "./Messages";
import Input from "./Input";
import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";

const Chatarea = () => {
  const { data } = useContext(ChatContext);

  return (
    <div className="chatarea">
      {JSON.stringify(data.user) === "{}" ? (
        <div id="blankMessage" >
          <BiMessageDetail />
          Select a User to Start Conversation.
        </div>
      ) : (
        <>
          <div className="chatheader">
            <div className="userinfo">
              <img src={data.user?.photoURL} alt="" />
              <span>{data.user?.displayName}</span>
            </div>
            <div className="chaticons">
              <FaVideo size={"20px"} cursor={"not-allowed"} />
              <FaUserPlus size={"20px"} cursor={"not-allowed"} />
              <HiDotsVertical size={"20px"} cursor={"not-allowed"} />
            </div>
          </div>
          <Messages />
          <Input />
        </>
      )}
    </div>
  );
};

export default Chatarea;
