import React from "react";
import { NavLink } from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import DashboardIcon from "@material-ui/icons/Dashboard";
import EmojiEventsIcon from "@material-ui/icons/EmojiEvents";
import BusinessIcon from "@material-ui/icons/Business";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AssignmentIcon from "@material-ui/icons/Assignment";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/auth";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import Divider from "@material-ui/core/Divider";
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
        <NavLink to="/manager" className="admin__links">
          <ListItem button>
            <ListItemIcon>
              <DashboardIcon  className="color--white"/>
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
        </NavLink>
        <NavLink to="/manager/assets" className="admin__links">
          <ListItem button>
            <ListItemIcon>
              <EmojiEventsIcon className="color--white" />
            </ListItemIcon>
            <ListItemText primary="My Assets" />
          </ListItem>
        </NavLink>
        <NavLink to="/manager/addasset" className="admin__links">
          <ListItem button>
            <ListItemIcon>
              <BusinessIcon className="color--white" />
            </ListItemIcon>
            <ListItemText primary="Add an Asset" />
          </ListItem>
        </NavLink>
        <Divider style={{ backgroundColor: "#fff" }} />
      </div>
      <div>
        
        <Divider style={{ backgroundColor: "#fff" }} />
        <ListSubheader inset style={{ color: "#fff" ,  paddingLeft:25}}>
          Profile
        </ListSubheader>
        <NavLink
          to={`/manager/editprofile/${currentUser.user._id}`}
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
      </div>
    </>
  );
};

export default MainListItems;
