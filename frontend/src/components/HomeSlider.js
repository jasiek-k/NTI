import React from 'react'
import { BandCaption, BandMobileCaption } from "./../utils/icons"
import anthonyPic from './../utils/img/anthony.png'
import chadPic from './../utils/img/chad.png'
import fleaPic from './../utils/img/flea.png'
import joshPic from './../utils/img/josh.png'

export default class HomeSlider extends React.Component {
    photoIndex = 1
    intervalId = 0

    componentDidMount = () => {
        this.photosTransition(1)
        this.intervalId = this.handleTransition()
    }

    componentWillUnmount = () => {
        clearInterval(this.intervalId)
    }

    photosTransition = index => {
        const namesArray = document.getElementsByClassName("Slider-name")
        const picsArray = document.getElementsByClassName("Photo")
        
        if (index > picsArray.length) index = 1
        if (index < 1) index = picsArray.length
        for (let i = 0; i < picsArray.length; i++) {
            picsArray[i].style.display = "none"
            namesArray[i].style.color = "#ffffff"
        }
        picsArray[index - 1].style.display = "block"
        namesArray[index - 1].style.color = "#C51130"
        this.photoIndex = index
    }

    handleTransition() {
        return setInterval(() => {
            this.photoIndex = (this.photoIndex + 1) % 4
            this.photosTransition(this.photoIndex)
        }, 3000)
    }

    render() {
        return(
            <div className="Slider-container">
                <div className="content"> 
                <div className="Photos-container">
                    {
                        [anthonyPic, joshPic, fleaPic, chadPic].map((item, index) => {
                            return <img className="Photo" 
                                src={item}
                                key={index}
                                alt=""></img>
                        })
                    }
                </div>
                <div className="Slider-caption">
                    <BandCaption className="BandMobileCaption"/>
                    <BandMobileCaption/>
                    <p className="Slider-names-container">
                        <span className="Slider-name"
                            onClick={() => this.photosTransition(1)}>Anthony</span>
                        <span> - </span>
                        <span className="Slider-name"
                            onClick={() => this.photosTransition(2)}>Josh</span>
                        <span> - </span>
                        <span className="Slider-name"
                            onClick={() => this.photosTransition(3)}>Flea</span>
                        <span> - </span>
                        <span className="Slider-name"
                            onClick={() => this.photosTransition(4)}>Chad</span>
                    </p>
                </div>
                </div>
            </div>
        )
    }
}
