import React from 'react'
import { MenuIcon, CloseIcon } from './../utils/icons'
import { NavbarLogo } from './../utils/icons'
import './../styles/pageTheme.css'
import { Link } from 'react-router-dom'
import LangSwitch from './LangSwitch'

export default class MobileNavbar extends React.Component {
  ifDropped = false
  ifMediaDisplayed = false

  displayMenu = () => {
    this.ifDropped = this.ifDropped ? false : true
    this.forceUpdate()
  }

  displayMedia = () => {
    
  }

  passLangSwitch = e => {
    this.props.langSwitchHandling(e)
  }

  render() {
    let { 
      navbarContent, 
      navbarLinks, 
      mediaLinks, 
      linksContent 
    } = this.props.navbarContent.navbar 

    return(
      <div className="Mobile-navbar-container">  
        <NavbarLogo/>
        {
          this.ifDropped ? (
            <div className="Dropdown-content">
              <div onClick={this.displayMenu}>
                <CloseIcon/>
              </div>
              <ul className="Navbar-content">
              {
                navbarContent.map(function(item, index) {
                  if (item !== "MEDIA") {
                    return <Link key={index} to={navbarLinks[index]}>
                      <li className="Navbar-content-item"
                        onClick={this.displayMenu}>
                        {item}
                      </li>
                    </Link>
                  } else return <div key={index * index} 
                    className="Media-dropdown">
                      <li className="Navbar-content-item" 
                        onClick={() => {
                          this.ifMediaDisplayed = this.ifMediaDisplayed ? false : true
                          this.forceUpdate()
                        }} 
                        key={index}>
                          {item}
                        </li>
                        <div className="Media-dropdown-content">
                        {
                          this.ifMediaDisplayed ? (      
                          <React.Fragment>
                            <hr className="Menu-divider"/>
                            {
                              mediaLinks.map(function(mediaItem, mediaIndex) {
                                return <a key={mediaIndex} 
                                  className="Media-dropdown-item"
                                  onClick={() => {
                                  global.window && (global.window.location.href = `https://${linksContent[index]}`)
                                  this.displayMenu
                                  return null
                                }}>
                                  {mediaItem}
                                </a>
                              })
                            }
                            <hr className="Menu-divider"/>
                          </React.Fragment>
                        ) : (
                          <React.Fragment></React.Fragment>
                        )     
                      }
                    </div>
                  </div>
                }, this)}
              </ul>
              <LangSwitch passLangSwitch={this.passLangSwitch}/>
            </div>
          ) : (
            <div onClick={this.displayMenu}>
              <MenuIcon/>
            </div>
          )
        }
      </div>
    )
  }
}
