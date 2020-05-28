import React from 'react'
import backPic from './../utils/img/history_background.png'
import './../styles/subpageTheme.css'
import { HistoryCaptionEn, HistoryCaptionPl } from './../utils/icons'
import AlbumDisplay from './../components/AlbumDisplay'
import MemberDisplay from './../components/MemberDisplay'

export default class History extends React.Component {
    slideIndex = 1
    intervalValue = 5000
    intervalId = 0

    componentDidMount = () => {
        this.slideShow(1)
        this.intervalId = this.handleSliding()
    }

    componentWillUnmount = () => {
        clearInterval(this.intervalId)
    }

    slideShow = index => {
        let slides = document.getElementsByClassName("Member-container")
        let namesSpanes = document.getElementsByClassName("History-name")

        if (index > slides.length) index = 1
        if (index < 1) index = slides.length
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none"
            namesSpanes[i].style.color = "#ffffff"
        }
        slides[index - 1].style.display = "block"
        namesSpanes[index - 1].style.color = "#C51130"
        this.slideIndex = index
    }

    handleSliding = () => {
        return setInterval(() => {
            this.slideIndex = (this.slideIndex + 1) % 4
            this.slideShow(this.slideIndex)
        }, this.intervalValue)
    }

    render() {
        const [membersHeader, albumsHeader] = this.props.historyContent.sectionsHeaders

        return(
            <div className="History-subpage">
                <img className="History-background-pic" src={backPic}></img>
                <div className="History-photo-container">
                    {this.props.currentLang === "English" ? (
                        <HistoryCaptionEn/>
                    ) : (
                        <HistoryCaptionPl/>
                    )}
                </div>
                <p className="History-intro-section">{this.props.historyContent.introSection}</p>
                <div className="History-members-section">
                    <h1 className="History-section-header">{membersHeader}</h1>
                    <p className="History-names-container">
                        <span   className="History-name"
                                onClick={() => this.slideShow(1)}>Anthony</span>
                        <span> - </span>
                        <span   className="History-name"
                                onClick={() => this.slideShow(2)}>Josh</span>
                        <span> - </span>
                        <span   className="History-name"
                                onClick={() => this.slideShow(3)}>Flea</span>
                        <span> - </span>
                        <span   className="History-name"
                                onClick={() => this.slideShow(4)}>Chad</span>
                    </p>
                    {this.props.historyContent.membersContent.map((item, index) => {
                        return <MemberDisplay key={index} memberContent={item}/>
                    })}
                </div>
                <div className="History-albums-section">
                    <h1 className="History-section-header">{albumsHeader}</h1>
                    {this.props.historyContent.albumsContent.map((item, index) => {
                        return <AlbumDisplay key={index} albumContent={item}/>
                    })}
                </div>
            </div>
        )
    }
}