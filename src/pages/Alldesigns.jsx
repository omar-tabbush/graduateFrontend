import { useDispatch } from "react-redux";
import { Designs } from "../components/DesignList";

export const AllDesign = () => {
  return (
    <>
      <div style={{ paddingTop: "3vw" }}>
        <h1 style={{ textAlign: "center" }}>All Designs</h1>
        <Designs />
      </div>

      
    </>
  );
};
