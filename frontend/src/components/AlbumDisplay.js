import React from 'react'
import './../styles/subpageTheme.css'

export default class AlbumPresentation extends React.Component {

    render() {
        let [ albumPhoto, albumTitle, albumDate, albumStory ] = this.props.albumContent

        if (albumPhoto !== "null") {
            let imagesDir = require.context("./../utils/img", false)
            albumPhoto = imagesDir(albumPhoto)
        }      

        return (
            <div className="Album-container">
                <img className="Album-cover" 
                    src={albumPhoto}
                    alt=""></img>
                <div className="Album-info">
                    <p className="Album-title">{albumTitle}</p>
                    <p className="Album-date">{albumDate}</p>
                    <p className="Album-story">{albumStory}</p>
                </div>
            </div>
        )
    }
}