import React, { Component } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";

import config from "../config";
import "./Login.css";
import ReactGA from 'react-ga';
import { Link } from "react-router-dom";
import { Navbar } from "react-bootstrap";

import "../libs/font-awesome/css/font-awesome.css";
import "../libs/Ionicons/css/ionicons.css";

export default class Support extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false
    };
    this.myProps = props;
  }

  navigateToHomeScreen(self) {
   self.props.history.push("/home");
  }

  render() {
    return (
      <div class="support-wrapper">
          <Navbar fluid collapseOnSelect>
                <Navbar.Header>
                  <Navbar.Brand>
                    <Link to="/siteMap">Back to SiteMap</Link>
                  </Navbar.Brand>
                </Navbar.Header>
              </Navbar>
          <label>Contact us at <a href="mailto:vent.rent18@gmail.com" target="_top">vent.rent18@gmail.com</a></label>
      </div>

    );
  }
}