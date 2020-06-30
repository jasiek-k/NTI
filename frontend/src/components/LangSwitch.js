import React from 'react'
import './../styles/pageTheme.css'

export default class LangSwitch extends React.Component {
    componentDidMount() {
        this.initLangSwitch()
      }

    chooseLang = e => {
        this.props.passLangSwitch(e)
        this.setLangColor(e)
    }

    initLangSwitch = () => {
        const itemsArray = document.getElementsByClassName("LangSwitch-item")
        let enLangIndex = 0
        for (let i = 0; i < itemsArray.length; i++) {
            if (itemsArray[i].innerText === "English") enLangIndex = i
        }
        itemsArray[enLangIndex].style.color = "#C51130"
        itemsArray[enLangIndex].classList.add("selected")  
    }

    setLangColor = e => {
        const itemsArray = document.getElementsByClassName("LangSwitch-item")
        if (itemsArray.length > 0) {
            for (let i = 0; i < itemsArray.length; i++) {
                itemsArray[i].style.color = "#ffffff"
                itemsArray[i].classList.remove("selected")
            }
        }
        e.target.style.color = "#C51130"
        e.target.classList.add("selected")
    }

    render() {
        return(
            <div className="LangSwitch-container">
                <p className="LangSwitch-caption">Languages</p>
                <p className="LangSwitch-item" onClick={this.chooseLang}>Polski</p>
                <p className="LangSwitch-item" onClick={this.chooseLang}>English</p>
            </div>
        )
    }
}