import React from 'react'
import joshPic from './../utils/img/josh_background.png'
import './../styles/subpageTheme.css'
import ProfileForm from './../components/ProfileForm'


export default class Profile extends React.Component {        
    
    hashData = () => {
        
    }

    render() {
        return (
            <div className="Profile-subpage">
                <div className="Background-image">
                    <img className="Profile-background-pic" src={joshPic}></img>
                </div>   
                <ProfileForm formContent={this.props.profileContent}/> 
            </div>
        )
    }
}