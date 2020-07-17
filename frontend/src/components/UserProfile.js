import React from 'react'


export default class UserProfile extends React.Component {
    render() {
        console.log(this.props.userData)
        return (
            <div>
                <ul>
                {
                    Object.keys(this.props.userData).map((item, index) => {
                        if (item !== 'id') {
                            return <li className="Profile-user-item" key={index}>
                                {this.props.userData[item]} 
                            </li>
                        }
                    })
                }
                </ul>
            </div>
        )
    }
}
