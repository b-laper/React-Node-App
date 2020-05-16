import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import NavMenu from "./Navbar";
import Footer from "./Footer";
import Home from "./Home";
export class App extends Component {
  render() {
    return (
      <div>
        <NavMenu />
        <Home />
        <Footer />
      </div>
    );
  }
}

export default App;
