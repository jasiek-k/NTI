import React from 'react'
import { BandCaption } from "./../utils/icons"
import anthonyPic from './../utils/img/anthony.png'
import chadPic from './../utils/img/chad.png'
import fleaPic from './../utils/img/flea.png'
import joshPic from './../utils/img/josh.png'

export default class HomeSlider extends React.Component {

    photosTransition = () => {
        const namesArray = document.getElementsByClassName("Slider-name")
        const picsArray = document.getElementsByClassName("Photo")
        for (let i = 1; i < picsArray.length; i++) {
            picsArray[i].style.display = "none"
        }
    }

    componentDidMount = () => {
        this.photosTransition()
    }

    render() {

        return(
            <div className="Slider-container">
                <div className="content"> 
                <div className="Photos-container">
                    <img className="Photo" src={anthonyPic}></img>
                    <img className="Photo" src={joshPic}></img>
                    <img className="Photo" src={fleaPic}></img>
                    <img className="Photo" src={chadPic}></img>
                </div>
                <div className="Slider-caption">
                    <BandCaption />
                    <p className="Slider-names-container">
                        <span className="Slider-name">Anthony</span>
                        <span> - </span>
                        <span className="Slider-name">Josh</span>
                        <span> - </span>
                        <span className="Slider-name">Flea</span>
                        <span> - </span>
                        <span className="Slider-name">Chad</span>
                    </p>
                </div>
                </div>
                
            </div>
        )
    }
}