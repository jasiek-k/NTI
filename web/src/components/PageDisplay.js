import React from 'react'
import Navbar from './Navbar'
import LangSwitch from './LangSwitch'
import HomeSlider from './HomeSlider'
import './../styles/pageTheme.css'
import ln_en from './../utils/lang/ln_en.json'
import ln_pl from './../utils/lang/ln_pl.json'
import NewsPost from './NewsPost'
import data from './../utils/data.json'
import Home from './../subpages/home'


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
        if (lang == "Polski") {
            this.pageContent = ln_pl
        } else if (lang == "English") {
            this.pageContent = ln_en
        }
        this.setLangColor(e)
    }

    subpageChangeHandling = e => {
        let displayedSubpage = e.target.innerText
        let index = 0
        for (let i = 0; i < this.pageContent.navbarContent.length; i++) {
            if (this.pageContent.navbarContent[i] === displayedSubpage) index = i
        }
        console.log(this.state)
        this.setState({
            currentSubpage: index
        }) 
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
        const subpageContent = data.posts
        let contentToDisplay = []

        for (let i = 0; i < subpageContent.length; i++) {
            var {comments, content, date, hearts, id, photo, tags} = subpageContent[i]
            contentToDisplay.push(<NewsPost key={id}
                                            postDate={date}
                                            postTags={tags}
                                            postContent={content}
                                            postHearts = {hearts}
                                            postPhoto = {photo}
                                            addedComments={comments}/>)
        }
        */
        const contentToDisplay = <Home />
        console.log(this.pageContent)
        return( 
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
