import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Designs } from "../components/DesignList";
import { Hero } from "../components/Hero";

export const Landing = () => {
  
  return (
    <>
     
      <Hero />
      <Designs />
    </>
  );
};
