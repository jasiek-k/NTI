import React from 'react'


export default class ProfileForm extends React.Component {
    passwordFill = e => {
        var passwordHash = require('password-hash')
        var hashedPassword = passwordHash.generate(e.target.value)
        //console.log(e.target.value)
        //console.log(hashedPassword)
        var hashedPass = 'sha1$5a99ff95$1$20d76e4bc1294898979564cea2ec8db8a1a6b22f'
        //console.log(passwordHash.verify('chuj', hashedPassword));
    }

    handleLogin = e => {
        e.preventDefault()
        this.props.loginUser({
            login: document.getElementById('Profile-input-login').value,
            password: document.getElementById('Profile-input-password').value
        })
    }

    handleRegister = e => {
        e.preventDefault()
        this.props.registerUser({
            name: document.getElementById('Profile-signup-name').value,
            surname: document.getElementById('Profile-signup-surname').value,
            email: document.getElementById('Profile-signup-mail').value,
            password: document.getElementById('Profile-signup-password').value
        })
    }

    render() {
        const { loginSection, signupSection } = this.props.formContent.profileSubpage
        const [ headerLog1, headerLog2, inputLog1, inputLog2, buttonLog ] = loginSection
        const [ headerSign1, headerSign2, inputSign1, inputSign2, inputSign3, inputSign4, buttonSign ] = signupSection
        const formWidth = parseInt(this.props.displayData) 
        console.log(formWidth)
        return (
            <div className="Profile-form-container">
                <div className="Profile-login-container">
                    <h1 className="Profile-form-header">{headerLog1}</h1>
                    <h1 className="Profile-form-header">{headerLog2}</h1>
                    <form className="Profile-login-form"
                        onSubmit={this.handleLogin}>
                        <input style={{width: formWidth - 30}} 
                            className="Profile-login-input" 
                            id="Profile-input-login"
                            type="text" 
                            placeholder={inputLog1}></input>
                        <br />
                        <input style={{width: formWidth - 30}} 
                            className="Profile-login-input" 
                            id="Profile-input-password"
                            onChange={this.passwordFill}
                            type="password" 
                            placeholder={inputLog2}></input>
                        <br />
                        <button style={{width: formWidth - 30}} 
                            className="Profile-login-button" 
                            type="submit">{buttonLog}</button>
                    </form> 
                </div>
                <div className="Forms-seperator"></div>
                <div className="Profile-signup-container">
                    <h1 className="Profile-form-header">{headerSign1}</h1>
                    <h1 className="Profile-form-header">{headerSign2}</h1>
                    <form className="Profile-login-form"
                        onSubmit={this.handleRegister}>
                        <input style={{width: (formWidth - 68) / 2}} 
                            className="Profile-signup-input-short" 
                            id="Profile-signup-name"
                            type="text" 
                            placeholder={inputSign1}></input>
                        <input style={{width: (formWidth - 68) / 2}} 
                            className="Profile-signup-input-short" 
                            id="Profile-signup-surname"
                            type="text" 
                            placeholder={inputSign2}></input>
                        <input style={{width: formWidth - 44}} 
                            className="Profile-signup-input" 
                            id="Profile-signup-mail"
                            type="text" 
                            placeholder={inputSign3}></input><br />
                        <input style={{width: formWidth - 44}} 
                            className="Profile-signup-input" 
                            id="Profile-signup-password"
                            onChange={this.passwordFill}
                            type="password" 
                            placeholder={inputSign4}></input>
                        <br />
                        <button style={{width: formWidth - 28}} 
                            className="Profile-signup-button" 
                            type="submit">{buttonSign}</button>
                    </form> 
                </div>
            </div>
        )
    }
}