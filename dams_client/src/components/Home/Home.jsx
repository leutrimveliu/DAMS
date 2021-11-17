import React from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import GetAllAssets from "../Assets/GetAssets/GetAssets";

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
      return <Redirect to="/" />
    }
  } 
 
  return (
    <div>
      <GetAllAssets />
    </div>
  );
}

export default Home;
