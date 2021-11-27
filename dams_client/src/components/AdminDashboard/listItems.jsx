import React from "react";
import { NavLink } from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import DashboardIcon from "@material-ui/icons/Dashboard";
import GroupIcon from "@material-ui/icons/Group";
import Divider from "@material-ui/core/Divider";
import BusinessIcon from "@material-ui/icons/Business";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import CategoryIcon from "@material-ui/icons/Category";
import AssignmentIcon from "@material-ui/icons/Assignment";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/auth";
// css
import "./Dashboard.scss";

const MainListItems = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const logOut = () => {
    dispatch(logout());
  };
  return (
    <>
      <div>
        <ListSubheader inset style={{ color: "#fff" , paddingLeft:25 }}>
          Admin Dashboard
        </ListSubheader>
        <NavLink to="/admin" className="admin__links">
          <ListItem button>
            <ListItemIcon>
              <DashboardIcon className="color--white"/>
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
        </NavLink>
        <NavLink to="/admin/categories" className="admin__links">
          <ListItem button>
            <ListItemIcon>
              <CategoryIcon className="color--white" />
            </ListItemIcon>
            <ListItemText primary="Categories" />
          </ListItem>
        </NavLink>

        <NavLink to="/admin/admins" className="admin__links">
          <ListItem button>
            <ListItemIcon>
              <SupervisorAccountIcon className="color--white" />
            </ListItemIcon>
            <ListItemText primary="Admins" />
          </ListItem>
        </NavLink>
        <NavLink to="/admin/managers" className="admin__links">
          <ListItem button>
            <ListItemIcon>
              <BusinessIcon className="color--white" />
            </ListItemIcon>
            <ListItemText primary="Managers" />
          </ListItem>
        </NavLink>

        <NavLink to="/admin/users" className="admin__links">
          <ListItem button>
            <ListItemIcon>
              <GroupIcon className="color--white" />
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItem>
        </NavLink>

      

       

        <Divider style={{ backgroundColor: "#fff" }} />
      </div>
      <div>
        
       
        <Divider style={{ backgroundColor: "#fff" }} />
        <ListSubheader inset style={{ color: "#fff" , paddingLeft:25}}>
          Profile
        </ListSubheader>
        <NavLink
          to={`/admins/editprofile/${currentUser.user._id}`}
          className="admin__links"
        >
       <ListItem button>
            <ListItemIcon>
              <AccountBoxIcon className="color--white" />
            </ListItemIcon>
            <ListItemText primary="Edit Profile" />
          </ListItem>
        </NavLink>
        <NavLink to="/login" className="admin__links" onClick={logOut}>
          <ListItem button>
            <ListItemIcon>
              <ExitToAppIcon className="color--white" />
            </ListItemIcon>
            <ListItemText primary="Log Out" />
          </ListItem>
        </NavLink>

        {/* <ListItem button>
      <ListItemIcon>
        <HighlightOffIcon />
      </ListItemIcon>
      <ListItemText primary="Declined Requests" />
    </ListItem> */}
      </div>
    </>
  );
};

export default MainListItems;
