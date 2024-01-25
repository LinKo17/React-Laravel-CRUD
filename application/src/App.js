import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import Home from "./components/Home"
import Profile from "./components/Profile"
import Nav from "./components/Nav"



function App(){
  return (
    <>
    <Router>
        <Routes>
          <Route path="/"  element={<Nav/>}>
            <Route index element={<Home/>}/>
            <Route path="/profile" element={<Profile/>}/>
          </Route>

          <Route path="*" element={<h1>Error </h1>}/>
        </Routes>  

    </Router>
    </>
  )
}

export default App;