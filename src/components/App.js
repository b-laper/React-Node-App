import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import NavMenu from "./Navbar";
import Footer from "./Footer";
import Home from "./Home";
import Panel from "./Panel";
export class App extends Component {
  render() {
    return (
      <div>
        <Panel />
      </div>
    );
  }
}

export default App;
