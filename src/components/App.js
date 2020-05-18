import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import NavMenu from "./Navbar";
import Footer from "./Footer";
import { Home } from "./Home";
// eslint-disable-next-line no-unused-vars
import Panel from "./Panel";
import SignUp from "./SignUp";
import LogIn from "./LogIn";
import VideoPlayer from "./VideoPlayer";
export class App extends Component {
  render() {
    return (
      <div>
        <NavMenu />
        <VideoPlayer />
        <Footer />
      </div>
    );
  }
}

export default App;
