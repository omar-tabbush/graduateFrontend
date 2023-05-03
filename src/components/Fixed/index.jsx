import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const Fixed = () => {
  return (
    <>
      <Header />
      <div
        style={{
          marginTop: "8vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignContent: "space-between",
          minHeight: "92vh",
          maxHeight: "fit-content",
        }}
      >
        <Outlet />

        <Footer />
      </div>
    </>
  );
};

export default Fixed;
