import React from 'react'
import { assets } from '../assets/assets';

function OverView() {
  return (
    <div className="w-full  h-screen bg-gradient-to-br from-[#020101]  via-[#094491]  to-[#4d92a6]   hidden md:block md:max-h-[800px] relative ">
      
      
      <div className="w-[1244px] px-10 ">
        <img
          src={assets.allchar}
          alt=""
          className="hidden md:block absolute w-[1000px]  -bottom-4 left-1/2 transform -translate-x-1/2"
        />

        <div className="absolute  -bottom-32 left-1/2 transform -translate-x-1/2">
          <img src={assets.srobo} alt="" className="w-80" />
        </div>
      </div>
    </div>
  );
}

export default OverView