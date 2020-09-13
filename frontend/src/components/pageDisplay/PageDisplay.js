import React from "react";

import ln_en from "../../utils/lang/ln_en.json";
import ln_pl from "../../utils/lang/ln_pl.json";

import Home from "../../subpages/home/home";
import History from "../../subpages/history/history";
import News from "../../subpages/news/news";
import Profile from "../../subpages/profile/profile";

import LangSwitch from "../langSwitch/LangSwitch";
import Navbar from "./../navbar/Navbar";
import MobileNavbar from "../mobileNavbar/MobileNavbar";
import UserProfile from "../userProfile/UserProfile";

import { checkIfLogged } from "./../../helpers";
import "./../../utils/fonts/stylesheet.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export default class PageDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLang: "English",
      windowWidth: 0,
      windowHeight: 0,
      user: {},
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  pageContent = ln_en;

  componentDidMount() {
    this.checkUser();
    this.updateWindowDimensions();
    this.initLang();
    window.addEventListener("resize", this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
    });
  }

  passUserData = (data) => {
    this.setState({
      user: data,
    });
  };

  checkUser = () => {
    const userStatus = checkIfLogged();
    const user = JSON.parse(localStorage.getItem("userData"));
    console.log(user);
    if (userStatus) {
      const { userName, userMail, userSurname } = user;

      this.setState({
        user: {
          email: userMail,
          name: userName,
          surname: userSurname,
        },
      });
    }
  };

  initLang = () => {
    const lang = localStorage.getItem("lang");
    console.log(lang);

    if (lang) {
      //const parsedData = JSON.parse(lang);
      //console.log(parsedData);
      this.setState({
        currentLang: lang,
      });
      if (lang === "Polski") {
        this.pageContent = ln_pl;
      } else if (lang === "English") {
        this.pageContent = ln_en;
      }
    } else {
      this.pageContent = ln_en;
      this.setState({
        currentLang: "English",
      });
    }
  };

  langSwitchHandling = (e) => {
    let lang = e.target.innerText;
    localStorage.setItem("lang", JSON.stringify({ value: lang }));
    this.setState({
      currentLang: lang,
    });
    if (lang === "Polski") {
      this.pageContent = ln_pl;
    } else if (lang === "English") {
      this.pageContent = ln_en;
    }
  };

  render() {
    return (
      <Router>
        <div className="Page-content">
          {this.state.windowWidth < 900 ? (
            <MobileNavbar
              navbarContent={this.pageContent}
              currentLang={this.state.currentLang}
              langSwitchHandling={this.langSwitchHandling}
            />
          ) : (
            <React.Fragment>
              <Navbar navbarContent={this.pageContent} />
              <LangSwitch
                currentLang={this.state.currentLang}
                passLangSwitch={this.langSwitchHandling}
              />
            </React.Fragment>
          )}
          <Switch>
            <Route
              path="/"
              exact
              render={(props) => <Home displayData={this.state.windowWidth} />}
            />
            <Route
              path="/news"
              render={(props) => (
                <News
                  displayData={this.state.windowWidth}
                  newsContent={this.pageContent.newsSubpage}
                />
              )}
            />
            <Route
              path="/history"
              render={(props) => (
                <History
                  historyContent={this.pageContent.historySubpage}
                  currentLang={this.state.currentLang}
                />
              )}
            />
            {Object.keys(this.state.user).length === 0 &&
            this.state.user.constructor === Object ? (
              <Route
                path="/profile"
                render={(props) => (
                  <Profile
                    userData={this.state.user}
                    displayData={this.state.windowWidth}
                    passUserData={this.passUserData}
                    profileContent={this.pageContent}
                  />
                )}
              />
            ) : (
              <Route
                path="/profile"
                render={(props) => (
                  <UserProfile
                    userData={this.state.user}
                    profileContent={this.pageContent}
                  />
                )}
              />
            )}
            {this.pageContent.navbar.linksContent.map((item, index) => {
              return (
                <Route
                  key={index}
                  path={`/${this.pageContent.navbar.mediaLinks[index]}`}
                  component={() => {
                    global.window &&
                      (global.window.location.href = `https://${item}`);
                    return null;
                  }}
                />
              );
            })}
          </Switch>
        </div>
      </Router>
    );
  }
}
