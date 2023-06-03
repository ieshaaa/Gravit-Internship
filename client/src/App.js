import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import React from 'react';
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"
import './App.css';
import Navbaar from "./Components/Navbaar";
import Home from "./Components/Home";
import Register from "./Components/Register";
import Edit from "./Components/Edit";
import { Routes, Route,Navigate } from 'react-router-dom';
import Details from "./Components/Details";
import Signup from "./Components/Signup";
import Login from "./Components/Login";

function App() {
  const user = localStorage.getItem("token");
  return (
    <>
    <Routes>
      <Route exact path="/" element={<Home/>} />
      <Route exact path="/register" element={<Register/>} />
      <Route exact path="/edit/:id" element={<Edit/>} />
      <Route exact path="/view/:id" element={<Details/>} />

      {user && <Route path="/" exact element={< Home/>} />}
			<Route path="/signup" exact element={<Signup />} />
			<Route path="/login" exact element={<Login />} />
			<Route path="/" element={<Navigate replace to="/login" />} />   
       </Routes>
    
 </>

  );
}

export default App;
