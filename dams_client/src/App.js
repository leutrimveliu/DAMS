import React, { useState } from "react";
import "./App.css";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Register from "./components/User/Register/Register";
import Login from "./components/User/Login/Login";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import AddAsset from "./components/MangerDashboard/Tables/AddAsset";
import Home from "./components/Home/Home";
import ManagerDashboard from "./components/MangerDashboard/ManagerDashboard";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard";
import AdminEditProfile from "./components/AdminDashboard/Tables/AdminEditProfile";
import ManagerEditProfile from "./components/MangerDashboard/Tables/ManagerEditProfile";
import UserEditProfile from "./components/UserDashboard/Tables/UserEditProfile";
import AssetsTable from "./components/MangerDashboard/Tables/AssetsTable";
import EditAsset from "./components/Assets/EditAsset/ManagerEditAsset";
import AdminsEditAsset from "./components/Assets/EditAsset/AdminEditAsset";
import EditProfile from "./components/EditProfile/EditProfile";
import UserTable from "./components/AdminDashboard/Tables/UserTable";
import ManagerTable from "./components/AdminDashboard/Tables/ManagerTable";
import ManagerEditAsset from "./components/MangerDashboard/Tables/EditAsset";
import AdminEditAsset from "./components/AdminDashboard/Tables/EditAsset";
import GetAssets from "./components/Assets/GetAssets/GetAssets";

import UserDashboard from "./components/UserDashboard/UserDashboard";

function App() {
  const [filterChange, setFilterChange] = useState(null);
  const filterRequest = (value) => {
    setFilterChange(value);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path="/Register" component={() => <Register />} />
          <Route path="/login" component={() => <Login />} />
          <Route path="/manager/addasset" component={() => <AddAsset />} />
          <Route path="/asset/:id" component={() => <EditAsset />} />
          <Route path="/admin" component={() => <AdminDashboard />} />
          <Route path="/admin/users" component={() => <UserTable />} />
          <Route path="/admin/companies" component={() => <ManagerTable />} />
         <Route
            path="/admins/editprofile/:id"
            component={() => <AdminEditProfile />}
          />
           <Route
            path="/manager/editprofile/:id"
            component={() => <ManagerEditProfile />}
          />
           <Route
            path="/user/editprofile/:id"
            component={() => <UserEditProfile />}
          />
          <Route
            path="/manager/asset/:id"
            component={() => <ManagerEditAsset />}
          />
           <Route
            path="/admins/asset/:id"
            component={() => <AdminEditAsset />}
          />

          <Route
            path="/manager/assets"
            component={() => <ManagerDashboard />}
          />
          <Route path="/editprofile/:id" component={() => <EditProfile />} />
          <Route path="/manager" component={() => <ManagerDashboard />} />
          <Route path="/user" component={() => <UserDashboard />} />
          <Route path="/" component={() => <UserDashboard />} />
        </Switch>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
