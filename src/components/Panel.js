import React, { Component } from "react";
import { Button } from "reactstrap";
import NavMenu from "./Navbar";
import Footer from "./Footer";
import Home from "./Home";
import "../css/Values.css";

export class Panel extends Component {
  constructor() {
    super();
    const humidityID = `867c0860-d2b0-4990-a2cb-a2170ef83ab6`;
    const coolingID = `8039c5c8-09ee-465f-8d74-42cdd67cc575`;
    const foodID = `1486a5bc-a67c-4764-b318-ee7e643fff3f`;
    const temperatureID = `bba7636a-9ccd-4a7c-848a-39c95bb3c23a`;
    const waterID = `3d4da165-92c6-4100-bee5-9f17a7f94197`;
    const heatingID = `dc2f91ed-6fd5-4168-ad7a-2c3165e6cb99`;
  }
  render() {
    return (
      <div>
        <NavMenu />
        <div className="boxing">
          <div className="center blue">
            <div className="textbtn">Food</div>
            <Button
              onClick={() => Home.setOn(this.foodID)}
              className="btn"
              color="primary"
            >
              On
            </Button>
            <Button
              onClick={() => Home.setOff(this.foodID)}
              className="btn"
              color="danger"
            >
              Off
            </Button>
          </div>
          <div className="center lightblue">
            <div className="textbtn">Water</div>
            <Button
              onClick={() => Home.setOn(this.waterID)}
              className="btn"
              color="primary"
            >
              On
            </Button>
            <Button
              onClick={() => Home.setOff(this.waterID)}
              className="btn"
              color="danger"
            >
              Off
            </Button>
          </div>
          <div className="center blue">
            <div className="textbtn">Heating</div>
            <Button
              onClick={() => Home.setOn(this.heatingID)}
              className="btn"
              color="primary"
            >
              On
            </Button>
            <Button
              onClick={() => Home.setOff(this.heatingID)}
              className="btn"
              color="danger"
            >
              Off
            </Button>
          </div>
          <div className="center lightblue">
            <div className="textbtn">Cooling</div>
            <Button
              onClick={() => Home.setOn(this.coolingID)}
              className="btn"
              color="primary"
            >
              On
            </Button>
            <Button
              onClick={() => Home.setOff(this.coolingID)}
              className="btn"
              color="danger"
            >
              Off
            </Button>
          </div>

          <Footer />
        </div>
      </div>
    );
  }
}

export default Panel;
