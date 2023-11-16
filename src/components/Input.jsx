import React, { useContext } from "react";
import { ImAttachment } from "react-icons/im";
import { MdSend } from "react-icons/md";
import { BsImage } from "react-icons/bs";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { useState } from "react";
import { arrayUnion, doc, Timestamp, updateDoc } from "firebase/firestore";
import { db, storage } from "../firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import InputEmoji from 'react-input-emoji';

const Input = () => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const handleSend = async () => {
    if (img) {
      const storageRef = ref(storage, uuid());
      await uploadBytesResumable(storageRef, img).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          await updateDoc(doc(db, "chats", data.chatID), {
            messages: arrayUnion({
              id: uuid(),
              text,
              senderId: currentUser.uid,
              date: Timestamp.now(),
              img: downloadURL,
            }),
          });
        });
      });
    } else {
      if (text) {
        await updateDoc(doc(db, "chats", data.chatID), {
          messages: arrayUnion({
            id: uuid(),
            text,
            senderId: currentUser.uid,
            date: Timestamp.now(),
          }),
        });
      } else {
        alert("Message can not be empty.");
      }
    }

    // Setting the latest chat message in left side bar
    // await updateDoc(doc(db, "userChats", currentUser.uid), {
    //   [data.chatId + ".lastMessage"]: {
    //     text,
    //   },
    //   [data.chatId + ".date"]: serverTimestamp(),
    // });

    // await updateDoc(doc(db, "userChats", data.user.uid), {
    //   [data.chatId + ".lastMessage"]: {
    //     text,
    //   },
    //   [data.chatId + ".date"]: serverTimestamp(),
    // });

    setImg(null);
    setText("");
  };

  return (
    <div className="inputbox">
        <InputEmoji
          value={text}
          cleanOnEnter
          placeholder="Type a message"
          onChange={setText}
          color={"#4e6ca6"}
          borderRadius={5}
          theme="light"
          onEnter={handleSend}
        />
        <div className="sendOptions">
          <span>
            <ImAttachment size={"20px"} cursor={"not-allowed"} />
          </span>
          <input
            type="file"
            id="file"
            style={{ display: "none" }}
            onChange={(e) => setImg(e.target.files[0])}
          />
          <label htmlFor="file">
            <BsImage size={"22px"} cursor={"pointer"} />
          </label>
          <button onClick={handleSend}>
            <MdSend size={"25px"} />
          </button>
        </div>
    </div>
  );
};

export default Input;
