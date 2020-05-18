import React, { Component } from "react";
import NavMenu from "./Navbar";
import Footer from "./Footer";

// eslint-disable-next-line no-unused-vars
import { Home, Buttons } from "./Home";
import "../css/Values.css";

export class Panel extends Component {
  render() {
    return (
      <div>
        <NavMenu />
        <Buttons />
        <Footer />
      </div>
    );
  }
}

export default Panel;
