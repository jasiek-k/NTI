import React from 'react'
import backPic from './../utils/img/history_background.png'
import './../styles/subpageTheme.css'
import { HistoryCaptionEn, HistoryCaptionPl } from './../utils/icons'
import AlbumDisplay from './../components/AlbumDisplay'
import MemberDisplay from './../components/MemberDisplay'

export default class History extends React.Component {
   
    render() {
        const [membersHeader, albumsHeader] = this.props.historyContent.sectionsHeaders

        return(
            <div className="History-subpage">
                <img className="History-background-pic" src={backPic}></img>
                <div className="History-photo-container">
                    {this.props.currentLang === "English" ? (
                        <HistoryCaptionEn />
                    ) : (
                        <HistoryCaptionPl />
                    )}
                </div>
                <p className="History-intro-section">{this.props.historyContent.introSection}</p>
                <div className="History-members-section">
                    <h1 className="History-section-header">{membersHeader}</h1>
                    {this.props.historyContent.membersContent.map(item => {
                        return <MemberDisplay memberContent={item} />
                    })}
                </div>
                <div className="History-albums-section">
                    <h1 className="History-section-header">{albumsHeader}</h1>
                    {this.props.historyContent.albumsContent.map(item => {
                        return <AlbumDisplay albumContent={item} />
                    })}
                </div>
            </div>
        )
    }
}