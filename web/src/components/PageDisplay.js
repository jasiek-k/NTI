import React from 'react'
import Navbar from './Navbar'
import LangSwitch from './LangSwitch'
import './../styles/pageTheme.css'
import ln_en from './../utils/lang/ln_en.json'
import ln_pl from './../utils/lang/ln_pl.json'
import data from './../utils/data.json'
import Home from './../subpages/home'
import History from './../subpages/history'
import News from './../subpages/news'
import Profile from './../subpages/profile'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'


export default class PageDisplay extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            currentLang: "English",
            currentSubpage: 0,
        }
    }

    pageContent = ln_en   
    
    componentDidMount() {
        this.initLangSwitch()
    }

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
    
    render() {
        return ( 
            <Router>
                <div className="Page-content">
                    <Navbar subpageChangeHandling={this.subpageChangeHandling} 
                            navbarContent={this.pageContent} />
                    <LangSwitch langSwitchHandling={this.langSwitchHandling} />
                    <Switch>
                        <Route  path="/" exact component={Home}/>
                        <Route  path="/news"
                                render={(props) => <News    newsContent={this.pageContent.newsSubpage} 
                                                            subpageContent={data.posts} />}/>
                        <Route  path="/history"
                                render={(props) => <History historyContent={this.pageContent.historySubpage}
                                                            currentLang={this.state.currentLang} />}/>
                        <Route  path="/profile"
                                render={(props) => <Profile profileContent={this.pageContent}/>}/>
                        {this.pageContent.navbar.linksContent.map((item, index) => {
                            return <Route  path={`/${this.pageContent.navbar.mediaLinks[index]}`} component={() => {
                                global.window && (global.window.location.href = `https://${item}`); 
                                return null
                            }}/>
                        })}
                    </Switch>
                </div>
            </Router>
        );
    }
}
