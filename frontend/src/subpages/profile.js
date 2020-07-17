import React from 'react'
import joshPic from './../utils/img/josh_background.png'
import './../styles/subpageTheme.css'
import ProfileForm from './../components/ProfileForm'
import UserProfile from './../components/UserProfile'
import axios from 'axios'


export default class Profile extends React.Component {      
    constructor(props) {
        super(props)
        this.state = {
            user: ''
        }
    }  
    
    hashData = () => {
        
    }

    loginUser = creds => {
        //console.log(creds)
        this.handleUserLogin(creds)
        //console.log(this.state)
    }

    passUserData = data => {
        this.props.passUserData(data)
    }

    handleUserLogin = creds => {
        console.log(creds)
        axios.post(
            'http://127.0.0.1:5000/login', 
            creds,
            {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            }
        )
        .then(response => {
            this.setState({
                user: response.data.user
            })
            console.log(response)
            this.passUserData(response.data.user)
        }, error => {
            console.log(error)
        })
    }

    registerUser = data => {
        this.handleUserRegister(data)
    }

    handleUserRegister = data => {
        console.log(JSON.stringify(data))
        axios.post(
            'http://127.0.0.1:5000/register', 
            data,
            {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            }
        )
        .then((response) => {
            console.log(response)
        }, (error) => {
            console.log(error)
        })
    }

    render() {
        return (
            <div className="Profile-subpage">
                {
                    Object.keys(this.state.user).length !== 0 ? (
                        <UserProfile userData={this.state.user}/>
                    ) : (
                        <React.Fragment>
                            <div className="Background-image">
                            <img className="Profile-background-pic" src={joshPic}></img>
                            </div>  
                            <ProfileForm formContent={this.props.profileContent}
                                displayData={this.props.displayData}
                                loginUser={this.loginUser}
                                registerUser={this.registerUser}/> 
                        </React.Fragment>
                    )
                } 
            </div>
        )
    }
}
