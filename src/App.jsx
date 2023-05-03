import { useState } from "react";
import "./App.css";
import { HashRouter, Route, Routes } from "react-router-dom";
import Fixed from "./components/Fixed";
// import { Landing, AllDesigns, Error404 } from "./pages";
import { Landing } from "./pages/Landing";
import { AllDesign } from "./pages/Alldesigns";
import { Error404 } from "./pages/Error404";
import { Design } from "./pages/Design";
import { NewDesignAdmin } from "./pages/dashboard/NewDesignAdmin";
import { Login } from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoute from "./private.router";
import { Users } from "./pages/dashboard/Users";
import { EditUser } from "./pages/dashboard/EditUser";
import { NewUser } from "./pages/dashboard/NewUser";
import { EditDesignAdmin } from "./pages/dashboard/EditDesignAdmin";
import { DashCards } from "./components/Cards/dashboardCard";
import { Designs } from "./pages/dashboard/AllDesignsAdmin";
function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="" element={<Fixed />}>
          <Route path={"home"} element={<Landing />} />
          <Route path={""} element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />

          <Route path="/alldesigns" element={<AllDesign />} />
          <Route path="/design/:id" element={<Design />} />

          <Route path="dashboard" element={<PrivateRoute />}>
            <Route path="" element={<DashCards />} />
            <Route path="design">
              <Route path="" element={<Designs />} />
              <Route path="edit/:id" element={<EditDesignAdmin />} />
              <Route path="new" element={<NewDesignAdmin />} />
            </Route>
            <Route path="user">
              <Route path="" element={<Users />} />
              <Route path="edit/:id" element={<EditUser />} />
              <Route path="new" element={<NewUser />} />
            </Route>
          </Route>
          <Route path="*" element={<Error404 />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
