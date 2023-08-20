import React from "react";
import Navbar from "./Navbar";
import Searchbar from "./Searchbar";
import Userslist from "./Userslist";

const Sidepanel = () => {
  return (
    <div className="sidepanel">
      <Navbar />
      <Searchbar />
      <Userslist />
    </div>
  );
};

export default Sidepanel;
