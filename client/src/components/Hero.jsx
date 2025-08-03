import React from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

function Hero() {

  const navigate=useNavigate();
  return (
    <div className="px-4 sm:px-20 xl:px-32 relative inline-flex flex-col w-full justify-center [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] bg-cover bg-no-repeat h-screen ">
      <div className="text-center mb-6 ">
        <h1 className="landing-font uppercase  text-white text-3xl sm:text-5xl md:text-6xl 2xl:text-7xl font-semibold mx-auto leading-[1.2] ">
          Craft incredible content <br />{" "}
          <span className="text-white landing-font ">
            {" "}
            with the help of AI.
          </span>{" "}
        </h1>
        <p className="mt-4 max-w-xs sm:max-w-lg 2xl:max-w-xl m-auto max-sm:text-xs text-gray-100 text-lg">
          Elevate your content creation using our powerful suite of AI tools —
          write articles, create images, and streamline your workflow.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-4 text-sm max-sm:text-xs ">
        <button
          onClick={() => navigate("/ai")}
          className="bg-white text-lg cursor-pointer px-10 py-3 rounded-lg border border-gray-300  hover:scale-102 active:scale-95 transition capitalize font-semibold"
        >
          Start creating now
        </button>
      </div>

      <div className="flex items-center gap-4 mt-8 mx-auto text-gray-600">
        <img src={assets.user_group} alt="" className="h-8 " /> Trusted by 10k+
        people
      </div>

      <div className="absolute bottom-0 left-0 w-30 -z-0 sm:w-32 md:w-52  ">
        <img
          src={assets.robot_1}
          alt=""
          className="w-full    animate-[bounce_5s_ease-in_infinite]  duration-"
        />
      </div>
    </div>
  );
}

export default Hero;


// const Hero = () => {
//   return (
//     <div className="relative min-h-screen bg-black overflow-hidden flex items-center justify-center px-6">
//       {/* 🌈 Animated Gradient Background */}
//       <div className="absolute inset-0 -z-10 bg-gradient-to-br from-purple-800 via-black to-indigo-900 bg-[length:400%_400%] animate-gradient"></div>

//       {/* 🫧 Blurred Blobs */}
//       <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-purple-700 rounded-full mix-blend-lighten filter blur-3xl opacity-20 animate-blob"></div>
//       <div className="absolute top-1/2 right-0 w-[300px] h-[300px] bg-pink-600 rounded-full mix-blend-lighten filter blur-2xl opacity-20 animate-blob animation-delay-2000"></div>
//       <div className="absolute   w-[300px] h-[300px] bg-indigo-900 rounded-full mix-blend-lighten filter blur-2xl opacity-20 animate-pulse"></div>

//       {/* 🔥 Main Content */}
//       <div className="text-center z-10">
//         <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
//           Unlock AI Power
//         </h1>
//         <p className="mt-6 text-lg text-gray-300 max-w-xl mx-auto">
//           Build, scale, and innovate with the most intuitive AI SaaS platform.
//         </p>
//         <button className="mt-8 px-6 py-3 bg-purple-700 hover:bg-purple-600 transition-all duration-300 rounded-full text-white shadow-xl">
//           Get Started
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Hero;