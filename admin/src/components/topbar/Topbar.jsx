import { Language, NotificationsNone, Settings } from "@material-ui/icons";
import React from "react";
import { Link } from "react-router-dom";
import Avatar from "./img/a1.png";
import "./topbar.css";
import Logo from "./img/logo.jpg";

export default function Topbar() {
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <Link to="/">
          <div className="topLeft">
            <img src={Logo} alt="" />
            <span className="logo">DustinV</span>
          </div>
        </Link>
        <div className="topRight">
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
