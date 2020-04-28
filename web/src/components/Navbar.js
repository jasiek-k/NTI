import React from 'react';
import { NavbarLogo } from './../utils/icons'
import './../styles/pageTheme.css';

export default class Navbar extends React.Component {
   
    chooseSubpage = e => {
        this.props.subpageChangeHandling(e)
    };

    render() {
        let { navbarContent, mediaLinks, linksContent } = this.props.navbarContent 
    
        return (
            <div className="Navbar-container">
                <NavbarLogo />
                <ul className="Navbar-content">
                    {navbarContent.map(function(item, index) {
                        if (item !== "MEDIA") {
                            return <li onClick={this.chooseSubpage} 
                            className="Navbar-content-item" 
                            key={index}>
                            {item}
                        </li>
                        } else return <div className="Media-dropdown">
                         <li className="Navbar-content-item" key={index}>{item}</li>
                         <div className="Media-dropdown-content">
                             {
                                 mediaLinks.map(function(mediaItem, index) {
                                     return <a   href="#" 
                                                 key={index}>
                                                 {mediaItem}
                                             </a>
                                 })
                             }
                         </div>
                     </div>
                    }, this)}
                </ul>
            </div>
        ); 
    }    
}

