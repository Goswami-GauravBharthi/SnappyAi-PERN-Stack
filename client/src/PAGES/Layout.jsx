import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Bot, Menu, X } from "lucide-react";
import Sidebar from "../components/Sidebar";
import { useSelector } from "react-redux";
import Login from "./Login";

function Layout() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [sidebar, setSidebar] = useState(false);

  return user ? (
    <div className="flex flex-col items-center justify-start h-screen  bg-gradient-to-t from-[#010106] via-[#080a26] to-[#101844]  ">
      <nav className="w-full px-8 min-h-14 flex items-center justify-between border-b border-gray-700 ">
        <h1 onClick={()=>navigate('/')} className="w-32 sm:w-44 cursor-pointer text-indigo-800 font-bold text-2xl sm:text-3xl flex items-center justify-between">
          <Bot /> Snappy.ai
        </h1>
        {sidebar ? (
          <X
            onClick={() => setSidebar(false)}
            className="w-6 h-6 text-gray-600 sm:hidden cursor-pointer"
          />
        ) : (
          <Menu
            onClick={() => setSidebar(true)}
            className="w-6 h-6 text-gray-600 sm:hidden cursor-pointer"
          />
        )}
      </nav>

      <div className=" flex-1 flex w-full h-[calc(100vh-64px)]  bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px] ">
        <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
        <div className="flex-1 ">
          <Outlet />
        </div>
      </div>
    </div>
  ) : (
    <Login />
  );
}

export default Layout;
