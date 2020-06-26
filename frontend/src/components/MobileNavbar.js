import React from 'react'
import { MenuIcon } from './../utils/icons'
import Navbar from './Navbar'

export default class MobileNavbar extends React.Component {
  ifDropped = false

  render() {
    return(
      <div className="Mobile-navbar-container">
        {
          this.ifDropped ? (
            <Navbar/>
          ) : (
            <MenuIcon/>          
          )
        }
      </div>
    )
  }
}
