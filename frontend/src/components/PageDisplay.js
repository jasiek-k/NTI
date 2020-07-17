import React from 'react'
import Navbar from './Navbar'
import LangSwitch from './LangSwitch'
import './../styles/pageTheme.css'
import ln_en from './../utils/lang/ln_en.json'
import ln_pl from './../utils/lang/ln_pl.json'
//import data from './../utils/data.json'
import Home from './../subpages/home'
import History from './../subpages/history'
import News from './../subpages/news'
import Profile from './../subpages/profile'
import UserProfile from './UserProfile'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import MobileNavbar from './MobileNavbar'

export default class PageDisplay extends React.Component {
  constructor(props) {
    super(props)
      this.state = {
        currentLang: "English",
        windowWidth: 0, 
        windowHeight: 0,
        user: {}
      }
      this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
  }

  pageContent = ln_en   
    
  componentDidMount() {
    this.updateWindowDimensions()
    window.addEventListener('resize', this.updateWindowDimensions)
  }
      
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions)
  }
      
  updateWindowDimensions() {
    this.setState({ 
        windowWidth: window.innerWidth, 
        windowHeight: window.innerHeight 
    })
  }

  passUserData = data => {
    this.setState({
      user: data 
    })
  } 

  langSwitchHandling = e => {
    let lang = e.target.innerText
    this.setState({
      currentLang: lang
    })
    if (lang === "Polski") {
      this.pageContent = ln_pl
    } else if (lang === "English") {
      this.pageContent = ln_en
    }
  }

  render() {
    return ( 
      <Router>
        <div className="Page-content">
        {
          this.state.windowWidth < 900 ? (
            <MobileNavbar navbarContent={this.pageContent} langSwitchHandling={this.langSwitchHandling}/>
          ) : (
            <React.Fragment>
              <Navbar navbarContent={this.pageContent}/>
              <LangSwitch passLangSwitch={this.langSwitchHandling}/>
            </React.Fragment>
          )
        }            
        <Switch>
          <Route path="/" exact 
            render={(props) => <Home displayData={this.state.windowWidth}/>}/>
          <Route path="/news"
            render={(props) => <News displayData={this.state.windowWidth}
              newsContent={this.pageContent.newsSubpage}/>}/>
          <Route path="/history"
            render={(props) => <History historyContent={this.pageContent.historySubpage}
            currentLang={this.state.currentLang}/>}/>
          {
            Object.keys(this.state.user).length === 0 ? (
              <Route path="/profile"
                render={(props) => <Profile displayData={this.state.windowWidth}
                passUserData={this.passUserData}
                profileContent={this.pageContent}/>}/>
            ) : (
              <Route path="/profile"
                render={(props) => <UserProfile /*displayData={this.state.windowWidth}
                passUserData={this.passUserData}
                profileContent={this.pageContent}/>}*/
                userData={this.state.user}/>}/>
            )
          }
            {
              this.pageContent.navbar.linksContent.map((item, index) => {
                return <Route key={index} 
                  path={`/${this.pageContent.navbar.mediaLinks[index]}`} 
                  component={() => { 
                    global.window && (global.window.location.href = `https://${item}`) 
                    return null
                  }
                }/>
              })
            }
        </Switch>
        </div>
      </Router>
    )
  }
}
