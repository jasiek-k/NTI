import React from 'react'
import Navbar from './Navbar'
import LangSwitch from './LangSwitch'
import './../styles/pageTheme.css'
import ln_en from './../utils/lang/ln_en.json'
import ln_pl from './../utils/lang/ln_pl.json'
import data from './../utils/data.json'
import Home from './../subpages/home'
import News from './../subpages/news'
import Profile from './../subpages/profile'


export default class PageDisplay extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            currentLang: "English",
            currentSubpage: 0,
        }
        this.subpageChangeHandling = this.subpageChangeHandling.bind(this)
    }

    pageContent = ln_en    

    langSwitchHandling = e => {
        let lang = e.target.innerText
        this.setState({
            currentLang: lang
        });
        if (lang === "Polski") {
            this.pageContent = ln_pl
        } else if (lang === "English") {
            this.pageContent = ln_en
        }
        this.setLangColor(e)
    }

    subpageChangeHandling = e => {
        /*
        let displayedSubpage = e.target.innerText
        let index = 0
        for (let i = 0; i < this.pageContent.navbarContent.length; i++) {
            if (this.pageContent.navbarContent[i] === displayedSubpage) index = i
        }
        console.log(this.state)
        this.setState({
            currentSubpage: index
        }) 
        */
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

    initLangSwitch = () => {
        const itemsArray = document.getElementsByClassName("LangSwitch-item")
        let enLangIndex = 0
        for (let i = 0; i < itemsArray.length; i++) {
            if (itemsArray[i].innerText === "English") enLangIndex = i
        }
        itemsArray[enLangIndex].style.color = "#C51130"
        itemsArray[enLangIndex].classList.add("selected")  
    }

    componentDidMount() {
        this.initLangSwitch()
    }
    
    render() {
        /*
        const contentToDisplay = <Home />
        
        const contentToDisplay = <News  newsContent={this.pageContent.newsSubpage}
                                        subpageContent={data.posts} />
       */
        const contentToDisplay = <Profile profileContent={this.pageContent}/>

        return ( 
            <div className="Page-content">
                <Navbar subpageChangeHandling={this.subpageChangeHandling} 
                        navbarContent={this.pageContent} />
                <LangSwitch langSwitchHandling={this.langSwitchHandling} />
                <div className="Subpage-content">
                    {contentToDisplay}
                </div>
            </div>
        );
    }
}
