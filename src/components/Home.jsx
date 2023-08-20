import React from "react";
import Chatarea from "./Chatarea";
import Sidepanel from "./Sidepanel";

const Home = () => {
  return (
    <div className="home">
      <Sidepanel />
      <Chatarea />
    </div>
  );
};

export default Home;
