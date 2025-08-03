import React from "react";
import { AiToolsData, assets } from "../assets/assets";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function AiTools() {
  const navigate = useNavigate();
 const { user } = useSelector((state) => state.auth);

  return (
    <div className="px-4 relative  sm:px-20 xl:px-32 py-24 bg-gradient-to-t from-[#010106] via-[#080a26] to-[#301381] ">
      {/* text */}
      <div className="text-center ">
        <h2 className="text-white  landing-font uppercase font-semibold  text-3xl sm:text-5xl md:text-6xl 2xl:text-7xl">
          Powerful AI Tools{" "}
        </h2>
        <p className="text-gray-500 max-w-lg mx-auto">
          Everything you need to create, enhance, and optimize your content with
          cutting-edge AI technology
        </p>
      </div>

      <div className="absolute bottom-0 left-0 z-50">
        <img src="../../public/Astronot.gif" className="w-60" />
      </div>

      {/* card div for all ai tool */}
      <div className="flex relative flex-wrap mt-25 sm:mt-18  justify-center">
        <div className="absolute  -top-24 right-40 z-100">
          <img src={assets.srobo} alt="" className="w-40  " />
        </div>
        {AiToolsData.map((tool, index) => (
          <div
            key={index}
            className="p-8 m-4 max-w-xs rounded-4xl  bg-white border border-white hover:translate-y-1 transition-all duration-300 cursor-pointer hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)]"
            onClick={() => user && navigate(tool.path)}
          >
            <tool.Icon
              className="w-12 h-12 p-3 text-white rounded-xl "
              style={{
                background: `linear-gradient(to Bottom, ${tool.bg.from}, ${tool.bg.to})`,
              }}
            />
            <h3 className="mt-6 mb-3 text-lg font-semibold">{tool.title}</h3>
            <p className="text-gray-400 text-sm max-w-[95%]">
              {tool.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AiTools;
