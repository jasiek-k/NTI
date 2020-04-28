import React from 'react'


export default class ProfileForm extends React.Component {

    render() {
        const { loginSection, signupSection } = this.props.formContent.profileSubpage
        const [ headerLog1, headerLog2, inputLog1, inputLog2, buttonLog ] = loginSection
        const [ headerSign1, headerSign2, inputSign1, inputSign2, inputSign3, inputSign4, buttonSign ] = signupSection

        return (
            <div className="Profile-form-container">
                <div className="Profile-login-container">
                    <h1 className="Profile-form-header">{headerLog1}</h1>
                    <h1 className="Profile-form-header">{headerLog2}</h1>
                    <form className="Profile-login-form">
                        <input className="Profile-login-input" type="text" placeholder={inputLog1}></input><br />
                        <input className="Profile-login-input" type="password" placeholder={inputLog2}></input><br />
                        <button className="Profile-login-button" type="submit">{buttonLog}</button>
                    </form> 
                </div>
                <div className="Profile-signup-container">
                    <h1 className="Profile-form-header">{headerSign1}</h1>
                    <h1 className="Profile-form-header">{headerSign2}</h1>
                    <form className="Profile-login-form">
                        <input className="Profile-signup-input-short" type="text" placeholder={inputSign1}></input>
                        <input className="Profile-signup-input-short" type="text" placeholder={inputSign2}></input>
                        <input className="Profile-signup-input" type="text" placeholder={inputSign3}></input><br />
                        <input className="Profile-signup-input" type="password" placeholder={inputSign4}></input><br />
                        <button className="Profile-signup-button" type="submit">{buttonSign }</button>
                    </form> 
                </div>
            </div>
        )
    }
}