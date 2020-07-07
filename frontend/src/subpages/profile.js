import React from 'react'
import joshPic from './../utils/img/josh_background.png'
import './../styles/subpageTheme.css'
import ProfileForm from './../components/ProfileForm'
import axios from 'axios'


export default class Profile extends React.Component {      
    constructor(props) {
        super(props)
        this.state = {
            userToken: ''
        }
    }  
    
    hashData = () => {
        
    }

    loginUser = creds => {
        //console.log(creds)
        this.handleUserLogin(creds)
        console.log(this.state)
    }

    handleUserLogin = creds => {
        console.log(creds)
        axios.post(
            'http://127.0.0.1:5000/login', 
            null, {
                params: creds
            } ,
            {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "text/html; charset=utf-8",
                "Accept": "application/json",
                "Access-Control-Request-Method": "POST"
            }
        )
        .then((response) => {
            this.setState({
                //userToken: response
            })
            console.log(response)
        }, (error) => {
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
                <div className="Background-image">
                    <img className="Profile-background-pic" src={joshPic}></img>
                </div>  
                <ProfileForm formContent={this.props.profileContent}
                    displayData={this.props.displayData}
                    loginUser={this.loginUser}
                    registerUser={this.registerUser}/> 
            </div>
        )
    }
}