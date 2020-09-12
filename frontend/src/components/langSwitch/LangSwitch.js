import React, { useEffect } from "react";
import "./LangSwitch.css";

const LangSwitch = (props) => {
  useEffect(() => {
    initLangSwitch();
  });

  let chooseLang = (e) => {
    props.passLangSwitch(e);
    setLangColor(e);
  };

  let initLangSwitch = () => {
    let currentLang = props.currentLang;
    const itemsArray = document.getElementsByClassName("LangSwitch-item");
    let langIndex = 0;
    for (let i in itemsArray) {
      if (itemsArray[i].innerText === currentLang) langIndex = i;
    }
    itemsArray[langIndex].style.color = "#C51130";
    itemsArray[langIndex].classList.add("selected");
  };

  let setLangColor = (e) => {
    const itemsArray = document.getElementsByClassName("LangSwitch-item");
    if (itemsArray.length > 0) {
      for (let i = 0; i < itemsArray.length; i++) {
        itemsArray[i].style.color = "#ffffff";
        itemsArray[i].classList.remove("selected");
      }
    }
    e.target.style.color = "#C51130";
    e.target.classList.add("selected");
  };

  return (
    <div className="LangSwitch-container">
      <p className="LangSwitch-caption">Languages</p>
      {["Polski", "English"].map((item, index) => (
        <p className="LangSwitch-item" onClick={chooseLang} key={index}>
          {item}
        </p>
      ))}
    </div>
  );
};

export default LangSwitch;
