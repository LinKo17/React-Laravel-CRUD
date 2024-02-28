import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import Home from "./components/Home"
import Profile from "./components/Profile"
import Nav from "./components/Nav"
import Edit from "./components/Edit";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Error from "./components/Error";
import RouteGuard from "./components/RouteGuard";
import { useState } from "react";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Nav />}>
            <Route index element={<Home />} />

            <Route path="/profile" element={
              <RouteGuard>
                <Profile />
              </RouteGuard>
            } />

            <Route path="edit/:id" element={
              <RouteGuard token={localStorage.getItem("token")}>
                <Edit />
              </RouteGuard>
            } />
            
            <Route path="/sign_up" element={<SignUp />} />
            <Route path="/sign_in" element={<SignIn />} />
          </Route>

          <Route path="*" element={<Error/>} />
        </Routes>

      </Router>
    </>
  )
}

export default App;