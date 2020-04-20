import React from 'react';
import BandLogo from './../utils/icons'
import './../styles/theme.css';

export default class Navbar extends React.Component {
    
    render() {
        return (
            <div className="Navbar-container">
                <BandLogo />
            </div>
        )
    }    
}

