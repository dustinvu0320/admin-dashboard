import { Language, NotificationsNone, Settings } from "@material-ui/icons";
import React from "react";
import Avatar from "./img/a1.png";
import "./topbar.css";
import Logo from "./img/logo1.png";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/userRedux";

export default function Topbar() {
  const user = useSelector((state) => state.user.currentUser);

  const dispatch = useDispatch();

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <img src={Logo} alt="" className="image" />
          <span className="logo">Admin Dashboard</span>
        </div>
        <div className="topRight">
          {user && (
            <>
              <span className="userName">{user.fullName}</span>
              <button className="logout" onClick={() => dispatch(logout())}>
                LOGOUT
              </button>
            </>
          )}
          <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Language />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Settings />
          </div>
          <img src={Avatar} alt="" className="topAvatar" />
        </div>
      </div>
    </div>
  );
}
