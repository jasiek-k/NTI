import React, { useEffect } from 'react'
import { BandCaption, BandMobileCaption } from "./../utils/icons"
import anthonyPic from './../utils/img/anthony.png'
import chadPic from './../utils/img/chad.png'
import fleaPic from './../utils/img/flea.png'
import joshPic from './../utils/img/josh.png'

const HomeSlider = () => {
  let photoIndex = 1

  useEffect(() => {
    photosTransition(1)
    const getTransitionInterval = setInterval(() => {
      photoIndex = (photoIndex + 1) % 4
      photosTransition(photoIndex)
    }, 3000)
    return () => {
      clearInterval(getTransitionInterval)
    }
  })
    
  let photosTransition = index => {
    let namesArray = document.getElementsByClassName("Slider-name")
    let picsArray = document.getElementsByClassName("Photo")
        
    if (index > picsArray.length) index = 1
    if (index < 1) index = picsArray.length
    for (let i = 0; i < picsArray.length; i++) {
      picsArray[i].style.display = "none"
      namesArray[i].style.color = "#ffffff"
    }
      
    picsArray[index - 1].style.display = "block"
    namesArray[index - 1].style.color = "#C51130"
    photoIndex = index
  }

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
          {
            ['Anthony', 'Josh', 'Flea', 'Chad'].map((item, index) => {
              return <React.Fragment key={index}>
                { index != 0 ? (<span> - </span>) : (<></>)} 
                  <span className="Slider-name"
                    onClick={() => photosTransition(index + 1)}>{item}</span>
              </React.Fragment>
            })
          }
          </p>
        </div>
      </div>
    </div>
  )
}

export default HomeSlider
