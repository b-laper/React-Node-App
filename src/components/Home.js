import React, { Component } from "react";
import IotApi from "@arduino/arduino-iot-client";
import rp from "request-promise";
import fetch from "node-fetch";
import icon from "../css/1.svg.png";
import {
  Spinner,
  Container,
  ToastHeader,
  Toast,
  ToastBody,
  Table,
} from "reactstrap";
import "../css/Values.css";
import Loading from "./Loading";
class Home extends Component {
  constructor(props) {
    super(props);
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

    async function setOn(id) {
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
    }
    async function setOff(id) {
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
    }
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
export default Home;
