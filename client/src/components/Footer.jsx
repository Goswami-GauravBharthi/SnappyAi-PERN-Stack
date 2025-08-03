import React from 'react'
import { Bot } from 'lucide-react';

function Footer() {
  return (
    <footer className="px-6 md:px-16 lg:px-24 xl:px-32  w-full text-gray-400 text-lg pt-20 bg-[#020a3a]   ">
      <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-gray-500/30 pb-6">
        <div className="md:max-w-96">
          <h1 onClick={()=>navigate('/')} className="w-32 sm:w-44 cursor-pointer text-indigo-800 font-bold text-2xl sm:text-3xl flex items-center justify-between">
            <Bot /> Snappy.ai
          </h1>
          <p className="mt-6 text-md">
            Experience the power of AI with QuickAi. <br /> Transform your
            content creation with our suite of premium AI tools. Write articles,
            generate images, and enhance your workflow.
          </p>
        </div>
        <div className="flex-1 flex items-start md:justify-end gap-20">
          <div>
            <h2 className="font-semibold mb-5 bg-gradient-to-r from-teal-500 via-orange-500 to-yellow-500 text-transparent bg-clip-text">
              Company
            </h2>
            <ul className="text-sm space-y-2">
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">About us</a>
              </li>
              <li>
                <a href="#">Contact us</a>
              </li>
              <li>
                <a href="#">Privacy policy</a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="font-semibold bg-gradient-to-r from-teal-500 via-orange-500 to-yellow-500 text-transparent bg-clip-text mb-5">
              Subscribe to our newsletter
            </h2>
            <div className="text-md space-y-2">
              <p>
                The latest news, articles, and resources, sent to your inbox
                weekly.
              </p>
              <div className="flex items-center gap-2 pt-4">
                <input
                  className="border border-gray-500/30 placeholder-gray-500 focus:ring-2 ring-indigo-600 outline-none w-full max-w-64 h-9 rounded px-2"
                  type="email"
                  placeholder="Enter your email"
                />
                <button className="bg-primary cursor-pointer w-24 h-9 text-white rounded">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="pt-4 text-center text-xs md:text-sm pb-5">
        Copyright 2025 © <a href="/">Repid AI</a>. All Right Reserved.
      </p>
    </footer>
  );
}

export default Footer