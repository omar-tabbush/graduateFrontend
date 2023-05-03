import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getDesigns,
  selectDesign,
  selectDesigns,
} from "../redux/slices/designSlice";

export const Hero = () => {
  const dispatch = useDispatch();
  const fromHero = useNavigate();
  const designs = useSelector(selectDesigns);

  useEffect(() => {
    dispatch(getDesigns());
  }, []);

  return (
    <div className="hero-container">
      <div className="hero-background"></div>
      <div className="hero-text">
        <h1>Create easely your resume/cv today!</h1>
        <button
          onClick={() => {
            fromHero("/design/" + designs[0].id);
          }}
        >
          create cv
        </button>
      </div>
    </div>
  );
};
