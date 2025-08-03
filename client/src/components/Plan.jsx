import React from "react";

const tools = [
  "Title Generation",
  "Article Generation",
  "Remove Background",
  "Generate Images",
  "Remove Object",
  "Resume Review",
];

const toolsFree = [
  "Title Generation",
  "Article Generation",
];

function Plan() {
  return (
    <div className="w-full  mx-auto z-20  py-5  sm:py-10 bg-gradient-to-b from-[#010106] via-[#06071f] to-[#000a44]">
      {/* text */}
      <div className="text-center">
        <h2 className=" font-semibold landing-font bg-gradient-to-l from-yellow-500 via-blue-500 to-indigo-500 text-transparent bg-clip-text text-3xl sm:text-5xl md:text-6xl 2xl:text-7xl">
          Choose your Plan
        </h2>
        <p className="text-gray-500 max-w-lg mx-auto ">
          Start for free and scale up as you grow. Find the perfect plan for
          your content creation needs.
        </p>
      </div>
      <PricingCards />
    </div>
  );
}

export default Plan;

const PricingCards = () => {
  return (
    <div className="min-h-screen  p-8 flex items-center justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl w-full">
        {/* Free Card */}
        <div className="bg-white/10 backdrop-blur-md border border-blue-500 rounded-2xl p-6 text-white shadow-xl hover:scale-105 transition-transform">
          <h2 className="text-2xl font-bold mb-4">Free Plan</h2>
          <p className="mb-6 text-gray-300">
            Everything you need for advanced projects and teams.
          </p>
          <ul className="space-y-2 text-sm text-gray-200">
            <li>✓ Title Generation</li>
            <li>✓ Article Generation</li>
          </ul>
          <div className="mt-6">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-full w-full transition-all cursor-pointer">
              Activated
            </button>
          </div>
        </div>

        {/* Premium Card */}
        <div className="bg-white/10 backdrop-blur-md border border-yellow-400 rounded-2xl p-6 text-white shadow-xl hover:scale-105 transition-transform">
          <h2 className="text-2xl font-bold mb-4">Premium Plan</h2>
          <p className="mb-6 text-yellow-300">Unlock all powerful features.</p>
          <ul className="space-y-2 text-sm text-gray-200">
            <li>✓ Title Generation</li>
            <li>✓ Article Generation</li>
            <li>✓ Remove Background</li>
            <li>✓ Generate Images</li>
            <li>✓ Remove Object</li>
            <li>✓ Resume Review</li>
          </ul>
          <div className="mt-6">
            <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-2 rounded-full w-full transition-all cursor-pointer">
              Upgrade to Premium
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
