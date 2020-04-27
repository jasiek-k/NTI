import React from 'react';
import { NavbarLogo } from './../utils/icons'
import './../styles/pageTheme.css';

export default class Navbar extends React.Component {
   
    chooseSubpage = e => {
        this.props.subpageChangeHandling(e)
    };

    render() {
        return (
            <div className="Navbar-container">
                <NavbarLogo />
                <ul className="Navbar-content">
                    {this.props.navbarContent.map(function(item, index) {
                        return <li onClick={this.chooseSubpage} className="Navbar-content-item" key={index}>{item}</li>
                    }, this)}
                </ul>
            </div>
        );
    }    
}

