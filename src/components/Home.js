import React, { Component } from "react";
import IotApi from "@arduino/arduino-iot-client";
import rp from "request-promise";
import fetch from "node-fetch";
import icon from "../css/1.svg.png";
import "../css/Values.css";
import Loading from "./Loading";
import { Button } from "reactstrap";
// const humidityID = `867c0860-d2b0-4990-a2cb-a2170ef83ab6`;
// const temperatureID = `bba7636a-9ccd-4a7c-848a-39c95bb3c23a`;
const coolingID = `8039c5c8-09ee-465f-8d74-42cdd67cc575`;
const foodID = `1486a5bc-a67c-4764-b318-ee7e643fff3f`;
const waterID = `3d4da165-92c6-4100-bee5-9f17a7f94197`;
const heatingID = `dc2f91ed-6fd5-4168-ad7a-2c3165e6cb99`;
class Home extends Component {
  constructor() {
    super();
    this.state = { values: [] };

    const url =
      "https://api2.arduino.cc/iot/v2/things/d0143c1c-19b6-49bf-9bc8-03c68a1114fe";
    let token;

    async function getToken() {
      var option = {
        method: "POST",
        url:
          "https://cors-anywhere.herokuapp.com/https://api2.arduino.cc/iot/v1/clients/token",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
        },
        json: true,
        form: {
          grant_type: "client_credentials",
          client_id: "oKzkiGDVHld3SjeNZ10TN1JMo00lHQXF",
          client_secret: `8DYrgDarnFfeAklLf0muYFdbp51qPNprmorBwyHqLfLATBieFIaHpROxY4cWaNlU`,
          audience: "https://api2.arduino.cc/iot",
        },
      };
      try {
        const response = await rp(option);
        return response["access_token"];
      } catch (error) {
        console.error("Failed getting an access token: " + error);
      }
    }
    // eslint-disable-next-line no-unused-vars
    async function run() {
      var client = IotApi.ApiClient.instance;
      var oauth2 = client.authentications["oauth2"];
      oauth2.accessToken = await getToken();
      var api = new IotApi.DevicesV2Api(client);
      api.devicesV2List().then(
        (devices) => {
          token = oauth2.accessToken;
          console.log(oauth2.accessToken);
          return token;
        },
        (error) => {
          console.log(error);
        }
      );
    }

    this.setOn = async (id) => {
      try {
        token = await getToken();
        fetch(
          `https://cors-anywhere.herokuapp.com/${url}/properties/${id}/publish`,
          {
            method: "PUT",
            hostname: "api2.arduino.cc",
            path: `/iot/v1/things/d0143c1c-19b6-49bf-9bc8-03c68a1114fe/properties/${id}`,
            headers: {
              Authorization: `Bearer ${token}`,
            },
            maxRedirects: 20,
            body: JSON.stringify({ value: true }),
          }
        ).catch((error) => {
          console.error("Error:", error);
        });
      } catch (err) {
        console.log(err);
      }
    };
    this.setOff = async (id) => {
      try {
        token = await getToken();

        fetch(
          `https://cors-anywhere.herokuapp.com/${url}/properties/${id}/publish`,
          {
            method: "PUT",
            hostname: "api2.arduino.cc",
            path: `/iot/v1/things/d0143c1c-19b6-49bf-9bc8-03c68a1114fe/properties/${id}`,
            headers: {
              Authorization: `Bearer ${token}`,
            },
            maxRedirects: 20,
            body: JSON.stringify({ value: false }),
          }
        ).catch((error) => {
          console.error("Error:", error);
        });
      } catch (err) {
        console.log(err);
      }
    };
    this.getValue = async () => {
      try {
        token = await getToken();
        await fetch(
          `https://cors-anywhere.herokuapp.com/https://api2.arduino.cc/iot/v2/things/d0143c1c-19b6-49bf-9bc8-03c68a1114fe`,
          {
            method: "GET",
            hostname: "api2.arduino.cc",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            maxRedirects: 20,
          }
        )
          .then((res) => res.json())
          .then((res) => {
            this.setState({ values: res.properties });
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      } catch (err) {
        console.log(err);
      }
    };
  }
  componentDidMount() {
    this.getValue();
  }
  render() {
    if (this.state.values.length === 0) return <Loading load={"Loading..."} />;
    else {
      return (
        <div className="boxing">
          <div className="center blue">
            <img className="icon right" src={icon} alt="o" />
            Temperature:
            {this.state.values[4].last_value
              ? this.state.values[4].last_value + "°C"
              : "No data"}
          </div>
          <div className="center lightblue">
            <img className="icon right" src={icon} alt="o" />
            Humidity:
            {this.state.values[5].last_value
              ? this.state.values[5].last_value + "%"
              : "No data"}
          </div>
          <div className="center blue">
            <img className="icon right" src={icon} alt="o" />
            Food:{this.state.values[1].last_value ? "ON" : "OFF"}
          </div>
          <div className="center lightblue">
            <img className="icon right" src={icon} alt="o" />
            Water:{this.state.values[3].last_value ? "ON" : "OFF"}
          </div>
          <div className="center blue">
            <img className="icon right" src={icon} alt="o" />
            Heating:{this.state.values[2].last_value ? "ON" : "OFF"}
          </div>
          <div className="center lightblue">
            <img className="icon right" src={icon} alt="o" />
            Cooling:{this.state.values[0].last_value ? "ON" : "OFF"}
          </div>
        </div>
      );
    }
  }
}
class Buttons extends Home {
  render() {
    return (
      <div>
        <div className="boxing">
          <div className="center blue">
            <div className="textbtn">Food</div>
            <Button
              onClick={() => Home.setOn(foodID)}
              className="btn"
              color="primary"
            >
              On
            </Button>
            <Button
              onClick={() => Home.setOff(foodID)}
              className="btn"
              color="danger"
            >
              Off
            </Button>
          </div>
          <div className="center lightblue">
            <div className="textbtn">Water</div>
            <Button
              onClick={() => this.setOn(waterID)}
              className="btn"
              color="primary"
            >
              On
            </Button>
            <Button
              onClick={() => this.setOff(waterID)}
              className="btn"
              color="danger"
            >
              Off
            </Button>
          </div>
          <div className="center blue">
            <div className="textbtn">Heating</div>
            <Button
              onClick={() => this.setOn(heatingID)}
              className="btn"
              color="primary"
            >
              On
            </Button>
            <Button
              onClick={() => this.setOff(heatingID)}
              className="btn"
              color="danger"
            >
              Off
            </Button>
          </div>
          <div className="center lightblue">
            <div className="textbtn">Cooling</div>
            <Button
              onClick={() => this.setOn(coolingID)}
              className="btn"
              color="primary"
            >
              On
            </Button>
            <Button
              onClick={() => this.setOff(coolingID)}
              className="btn"
              color="danger"
            >
              Off
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export { Home, Buttons };
