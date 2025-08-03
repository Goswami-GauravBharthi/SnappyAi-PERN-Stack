import React from "react";

import { useNavigate } from "react-router-dom";
import {  Bot } from "lucide-react";
import { NormalButton, UserButton } from "./UserButton";
import { useSelector } from "react-redux";

function Navbar() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

 

  return (
    <div className="fixed z-5 w-full backdrop-blur-2xl flex justify-between items-center py-3 px-4 sm:px-20 xl:px-32 ">
      {/* <img
        src={assets.logo}
        alt="logo"
        className="w-32 sm:w-44 cursor-pointer"
        onClick={() => navigate("/")}
      /> */}
      <h1 onClick={()=>navigate('/')} className="w-32 sm:w-44 cursor-pointer text-indigo-800 font-bold text-2xl sm:text-3xl flex items-center justify-between"><Bot/> Snappy.ai</h1>

      {user ? (
        <UserButton avatar={user.avatar} />
      ) : (
        <NormalButton navigate={navigate} />
      )}
    </div>
  );
}

export default Navbar;
