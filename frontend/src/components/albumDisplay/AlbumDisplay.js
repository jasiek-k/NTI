import React from "react";
import "./AlbumDisplay.css";

const AlbumPresentation = (props) => {
  let [albumPhoto, albumTitle, albumDate, albumStory] = props.albumContent;

  if (albumPhoto !== "null") {
    let imagesDir = require.context("./../../utils/img", false);
    albumPhoto = imagesDir(albumPhoto);
  }

  return (
    <div className="Album-container">
      <img className="Album-cover" src={albumPhoto} alt=""></img>
      <div className="Album-info">
        {[
          { class: "Album-title", item: albumTitle },
          { class: "Album-date", item: albumDate },
          { class: "Album-story", item: albumStory },
        ].map((item, index) => (
          <p className={item.class} key={index}>
            {item.item}
          </p>
        ))}
      </div>
    </div>
  );
};

export default AlbumPresentation;
