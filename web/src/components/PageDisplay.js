import React from 'react';
import Navbar from './Navbar';
import * as pageContent from './../utils/ln_en.json';

export default class PageDisplay extends React.Component {

    render() {
        return(
            <div>
                <Navbar navbarContent={pageContent.navbarContent} />
            </div>
        )
    }
}