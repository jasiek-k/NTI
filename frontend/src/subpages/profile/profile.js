import React from "react";
import joshPic from "./../../utils/img/josh_background.png";
import ProfileForm from "./../../components/profileForm/ProfileForm";
import UserProfile from "../../components/userProfile/UserProfile";
import axios from "axios";
import "./profile.css";

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Content-Type": "application/json",
  Accept: "application/json",
};

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
    };
  }

  loginUser = (creds) => {
    console.log(creds);
    axios
      .post("http://127.0.0.1:5000/login", creds, {
        headers: headers,
      })
      .then(
        (response) => {
          console.log(response);

          if (response.data.status === 123) {
            this.setState({
              user: response.data.user,
            });
            localStorage.setItem("userLogged", true);
            localStorage.setItem("userId", response.data.user.id);
            localStorage.setItem("userName", response.data.user.name);
            localStorage.setItem("userSurname", response.data.user.surname);
            localStorage.setItem("userMail", response.data.user.email);

            console.log(localStorage);
            console.log(this.state.user);
            this.passUserData(response.data.user);
          }
        },
        (error) => {
          window.alert(`Coś poszło nie tak! Spróbuj ponownie później.`);
          console.log(error);
        }
      );
  };

  passUserData = (data) => {
    this.props.passUserData(data);
  };

  registerUser = (data) => {
    console.log(JSON.stringify(data));
    axios
      .post("http://127.0.0.1:5000/register", data, {
        headers: headers,
      })
      .then(
        (response) => {
          window.alert(
            `Rejestracja przebiegła pomyślnie! Teraz zaloguj się, aby skorzystać ze swojego konta`
          );
          window.location.reload(false);
        },
        (error) => {
          window.alert(`Coś poszło nie tak! Spróbuj ponownie później.`);
          console.log(error);
        }
      );
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
