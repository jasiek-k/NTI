import React from "react";
import { NavbarLogo } from "./../../utils/icons";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = (props) => {
  let {
    navbarContent,
    navbarLinks,
    mediaLinks,
    linksContent,
  } = props.navbarContent.navbar;

  return (
    <div className="Navbar-container">
      <NavbarLogo />
      <ul className="Navbar-content">
        {navbarContent.map(function (item, index) {
          if (item !== "MEDIA") {
            return (
              <Link key={index} to={navbarLinks[index]}>
                <li className="Navbar-content-item">{item}</li>
              </Link>
            );
          } else
            return (
              <div key={index * index} className="Media-dropdown">
                <li className="Navbar-content-item" key={index}>
                  {item}
                </li>
                <div className="Media-dropdown-content">
                  {mediaLinks.map(function (mediaItem, mediaIndex) {
                    return (
                      <a
                        key={mediaIndex}
                        className="Media-dropdown-item"
                        onClick={() => {
                          global.window &&
                            (global.window.location.href = `https://${linksContent[index]}`);
                          return null;
                        }}
                      >
                        {mediaItem}
                      </a>
                    );
                  })}
                </div>
              </div>
            );
        }, this)}
      </ul>
    </div>
  );
};

export default Navbar;
