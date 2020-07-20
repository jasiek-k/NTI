import React from 'react'


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
          {
            [
              { class: "Album-title", item: albumTitle },
              { class: "Album-date", item: albumDate },
              { class: "Album-story", item: albumStory },
            ].map(item => <p className={item.class}>{item.item}</p>)
          }
          </div>
      </div>
    )
  }
}