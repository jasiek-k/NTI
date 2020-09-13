import React from "react";
import "./UserProfile.css";

export default class UserProfile extends React.Component {
  render() {
    const {
      header,
      emailLang,
      nameLang,
      surnameLang,
      logOutButton,
    } = this.props.profileContent.profileSubpage.userProfile;
    const profileFields = [emailLang, nameLang, surnameLang];
    const { email, name, surname } = this.props.userData;
    const data = [email, name, surname];
    console.log(this.props.userData);

    return (
      <div className="User-container-wrapper">
        <div className="User-container">
          <h1 className="User-header">{header}</h1>
          <div>
            {data.map((item, index) => {
              return (
                <span className="User-item" key={index}>
                  <p className="User-item-title">{profileFields[index]}</p>
                  <p className="User-item-content">{item}</p>
                </span>
              );
            })}
          </div>
          <button
            className="User-button"
            onClick={() => {
              localStorage.clear();
              window.location.reload(false);
            }}
          >
            {logOutButton}
          </button>
        </div>
      </div>
    );
  }
}
