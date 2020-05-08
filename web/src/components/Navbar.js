import React from 'react';
import { NavbarLogo } from './../utils/icons'
import './../styles/pageTheme.css';
import { Link } from 'react-router-dom'

export default class Navbar extends React.Component {
   
    render() {
        let { navbarContent, navbarLinks, mediaLinks, linksContent } = this.props.navbarContent.navbar 
    
        return (
            <div className="Navbar-container">
                <NavbarLogo />
                <ul className="Navbar-content">
                    {navbarContent.map(function(item, index) {
                        if (item !== "MEDIA") {
                            return <Link to={navbarLinks[index]}>
                                <li className="Navbar-content-item" 
                                    key={index}>
                                    {item}
                                </li>
                            </Link>
                        } else return <div className="Media-dropdown">
                        <li className="Navbar-content-item" key={index}>{item}</li>
                        <div className="Media-dropdown-content">
                            {mediaLinks.map(function(mediaItem, index) {
                                    return <a onClick={() => {
                                        global.window && (global.window.location.href = `https://${linksContent[index]}`);
                                        return null;
                                    }} key={index}>
                                        {mediaItem}
                                    </a>
                                })}
                        </div>
                    </div>
                    }, this)}
                </ul>
            </div>
        ); 
    }    
}

