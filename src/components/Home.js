import React, { Component } from "react";
import IotApi from "@arduino/arduino-iot-client";
import rp from "request-promise";
import fetch from "node-fetch";
import icon from "../css/1.svg.png";
import "../css/Values.css";
import Loading from "./Loading";
import { Button } from "reactstrap";


class Home extends Component {
  constructor() {
    super();
    this.state = { values: [], hasError: false };

    const url =
      "YOUR URL";
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
          client_id: "ID",
          client_secret: `TOKEN`,
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
            path: `/iot/v1/things/DeviceID/properties/${id}`,
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
          `https://cors-anywhere.herokuapp.com/https://api2.arduino.cc/iot/v2/things/DeviceID`,
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
            if (res.properties) this.setState({ values: res.properties });
          })
          .catch((error) => {
            console.log("Error:", error);
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
    else if (this.state.values) {
      return (
        <div className="boxing">
          <div className="center blue">
            <img className="icon right" src={icon} alt="o" />
            Temperature:
            {this.state.values[4].last_value
              ? this.state.values[4].last_value + "°C"
              : this.state.values}
          </div>
          <div className="center lightblue">
            <img className="icon right" src={icon} alt="o" />
            Humidity:
            {this.state.values[5].last_value
              ? this.state.values[5].last_value + "%"
              : this.state.values}
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
              onClick={() => this.setOn(foodID)}
              className="btn"
              color="primary"
            >
              On
            </Button>
            <Button
              onClick={() => this.setOff(foodID)}
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
