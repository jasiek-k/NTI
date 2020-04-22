import React from 'react';
import { NavbarLogo } from './../utils/icons'
import './../styles/pageTheme.css';

export default class Navbar extends React.Component {
    
    constructor(props) {
        super(props);
        this.chooseSubpage = this.chooseSubpage.bind(this);
    };

    chooseSubpage = e => {
        console.log(e);
    };

    render() {
        return (
            <div className="Navbar-container">
                <NavbarLogo />
                <ul className="Navbar-content">
                    {this.props.navbarContent.map(function(item, index) {
                        return <li className="Navbar-content-item" key={index}>{item}</li>
                    })}
                </ul>
            </div>
        );
    }    
}

