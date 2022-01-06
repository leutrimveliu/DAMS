import React from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
 import GetAllAssets from "../Assets/GetAssets/GetAssets";
import Login from "../User/Login/Login";

function Home() {

  const { user: currentUser } = useSelector((state) => state.auth);

  if (currentUser) {
    if (
      currentUser.role.includes("admin")
      
    ) {
      return <Redirect to="/admin" />;
    }
    
    else if (currentUser.role.includes("manager")){
      return <Redirect to="/manager" />;
    }
    else if (currentUser.role.includes("user")){
      return <Redirect to="/user" />
    }
    
    
  } 
 
  return (
    <div>
      <Login />
    </div>
  );
}

export default Home;
