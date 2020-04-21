import React from 'react';
import BandLogo from './../utils/icons'
import './../styles/theme.css';

export default class Navbar extends React.Component {
    
    chooseSubpage = (e) => {
        console.log("CHUJ");
    }

    render() {
        return (
            <div className="Navbar-container">
                <BandLogo />
                <ul className="Navbar-content">
                    {this.props.navbarContent.map(function(item, index) {
                        return <li className="Navbar-content-item" key={index}>{item}</li>
                    })}
                </ul>
            </div>
        )
    }    
}

