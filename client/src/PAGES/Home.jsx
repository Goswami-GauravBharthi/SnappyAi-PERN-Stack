import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import AiTools from "../components/AiTools";
import Testimonial from "../components/Testimonial";
import Plan from "../components/Plan";
import Footer from "../components/Footer";
import OverView from "../components/OverView";

function Home() {
  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <Hero />
      <AiTools />
      {/* <Testimonial /> */}
      <Plan />
      <OverView/>
      <Footer />
    </div>
  );
}

export default Home;
