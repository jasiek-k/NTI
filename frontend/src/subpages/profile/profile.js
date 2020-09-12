import React from "react";
import joshPic from "./../../utils/img/josh_background.png";
import ProfileForm from "./../../components/profileForm/ProfileForm";
import UserProfile from "../../components/userProfile/UserProfile";
import "./profile.css";
import { handleLogin, handleRegister } from "./../../services/authService";

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
    };
  }

  loginUser = async (creds) => {
    try {
      const response = await handleLogin(creds);

      if (response.data.status === 123) {
        const data = {
          userLogged: true,
          userId: response.data.user.id,
          userName: response.data.user.name,
          userSurname: response.data.user.surname,
          userMail: response.data.user.email,
        };

        this.setState({
          user: response.data.user,
        });
        localStorage.setItem("userData", JSON.stringify(data));
        this.passUserData(response.data.user);
      }
    } catch (error) {
      window.alert(`Coś poszło nie tak! Spróbuj ponownie później.`);
    }
  };

  registerUser = async (data) => {
    try {
      await handleRegister(data);
      window.alert(
        `Rejestracja przebiegła pomyślnie! Teraz zaloguj się, aby skorzystać ze swojego konta`
      );
      window.location.reload(false);
    } catch (error) {
      window.alert(`Coś poszło nie tak! Spróbuj ponownie później.`);
    }
  };

  passUserData = (data) => {
    this.props.passUserData(data);
  };

  render() {
    return (
      <div className="Profile-subpage">
        {Object.keys(this.state.user).length !== 0 ? (
          <UserProfile userData={this.state.user} />
        ) : (
          <React.Fragment>
            <div className="Background-image">
              <img className="Profile-background-pic" src={joshPic}></img>
            </div>
            <ProfileForm
              formContent={this.props.profileContent}
              displayData={this.props.displayData}
              loginUser={this.loginUser}
              registerUser={this.registerUser}
            />
          </React.Fragment>
        )}
      </div>
    );
  }
}
