import React from 'react'
import HomeSlider from './../components/HomeSlider'
import './../styles/subpageTheme.css'

export default class Home extends React.Component {

    render() {
        return(
            <div className="Home-subpage">
                <HomeSlider />
            </div>
        )
    }
}