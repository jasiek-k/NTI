import React from "react";
import HomeSlider from "./../../components/homeSlider/HomeSlider";
import "./home.css";

export default class Home extends React.Component {
  render() {
    return (
      <div className="Home-subpage">
        <HomeSlider />
      </div>
    );
  }
}
