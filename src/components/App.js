import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import NavMenu from "./Navbar";
import Footer from "./Footer";
export class App extends Component {
  render() {
    return (
      <div>
        <NavMenu />
        <Footer />
      </div>
    );
  }
}

export default App;
