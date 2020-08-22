import React from 'react'
import './../styles/subpageTheme.css'

const profileFields = ['Email', 'Id', 'Name', 'Surname']

export default class UserProfile extends React.Component {
 
    render() {
        console.log(this.props.userData)
        return (
            <div className="User-container-wrapper">
                <div className="User-container">
                <h1 className="User-header">Your Profile</h1>
                <div>
                {
                    Object.keys(this.props.userData).map((item, index) => {
                        if (item !== 'id') {
                            return <span className="User-item" key={index}>
                               <p className="User-item-title">{profileFields[index]}</p> 
                               <p className="User-item-content">{this.props.userData[item]}</p>
                            </span>
                        }
                    })
                }
                </div>
                <button className="User-button" 
                    onClick={() => {
                        localStorage.clear()
                        window.location.reload(false)
                    }}>LOG OUT</button>
                
                </div>
            </div>
        )
    }
}
