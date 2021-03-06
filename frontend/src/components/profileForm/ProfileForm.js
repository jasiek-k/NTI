import React from "react";
import "./ProfileForm.css";

export default class ProfileForm extends React.Component {
  handleLogin = (e) => {
    e.preventDefault();
    this.props.loginUser({
      email: document.getElementById("Profile-input-login").value,
      password: document.getElementById("Profile-input-password").value,
    });
  };

  handleRegister = (e) => {
    e.preventDefault();
    this.props.registerUser({
      name: document.getElementById("Profile-signup-name").value,
      surname: document.getElementById("Profile-signup-surname").value,
      email: document.getElementById("Profile-signup-mail").value,
      password: document.getElementById("Profile-signup-password").value,
    });
  };

  render() {
    const {
      loginSection,
      signupSection,
    } = this.props.formContent.profileSubpage;
    const [
      headerLog1,
      headerLog2,
      inputLog1,
      inputLog2,
      buttonLog,
    ] = loginSection;
    const [
      headerSign1,
      headerSign2,
      inputSign1,
      inputSign2,
      inputSign3,
      inputSign4,
      buttonSign,
    ] = signupSection;
    let formWidth = new Array(5);
    if (parseInt(this.props.displayData) < 600) {
      formWidth.fill(this.props.displayData);
      formWidth[0] -= 30;
      formWidth[1] -= 30;
      formWidth[2] = (formWidth[2] - 68) / 2;
      formWidth[3] -= 44;
      formWidth[4] -= 28;
    } else if (parseInt(this.props.displayData) > 900) {
      formWidth[0] = 342;
      formWidth[1] = 171;
      formWidth[2] = 167.5;
    } else {
      formWidth[0] = 502;
      formWidth[1] = 502;
      formWidth[2] = 247.5;
    }

    return (
      <div className="Profile-form-container">
        <div className="Profile-login-container">
          <h1 className="Profile-form-header">{headerLog1}</h1>
          <h1 className="Profile-form-header">{headerLog2}</h1>
          <form className="Profile-login-form" onSubmit={this.handleLogin}>
            <input
              style={{ width: formWidth[0] }}
              className="Profile-login-input"
              id="Profile-input-login"
              type="text"
              placeholder={inputLog1}
              required
            ></input>
            <br />
            <input
              style={{ width: formWidth[0] }}
              className="Profile-login-input"
              id="Profile-input-password"
              type="password"
              placeholder={inputLog2}
              required
            ></input>
            <br />
            <button
              style={{ width: formWidth[1] }}
              className="Profile-login-button"
              type="submit"
            >
              {buttonLog}
            </button>
          </form>
        </div>
        <div className="Forms-seperator"></div>
        <div className="Profile-signup-container">
          <h1 className="Profile-form-header">{headerSign1}</h1>
          <h1 className="Profile-form-header">{headerSign2}</h1>
          <form className="Profile-login-form" onSubmit={this.handleRegister}>
            <input
              style={{ width: formWidth[2] }}
              className="Profile-signup-input-short"
              id="Profile-signup-name"
              type="text"
              placeholder={inputSign1}
              required
            ></input>
            <input
              style={{ width: formWidth[2] }}
              className="Profile-signup-input-short"
              id="Profile-signup-surname"
              type="text"
              placeholder={inputSign2}
              required
            ></input>
            <input
              style={{ width: formWidth[3] }}
              className="Profile-signup-input"
              id="Profile-signup-mail"
              type="text"
              placeholder={inputSign3}
              required
            ></input>
            <br />
            <input
              style={{ width: formWidth[3] }}
              className="Profile-signup-input"
              id="Profile-signup-password"
              type="password"
              placeholder={inputSign4}
              required
            ></input>
            <br />
            <button
              style={{ width: formWidth[1] }}
              className="Profile-signup-button"
              type="submit"
            >
              {buttonSign}
            </button>
          </form>
        </div>
      </div>
    );
  }
}
