import React, { Component } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";

import config from "../config";
import "./Login.css";
import ReactGA from 'react-ga';
import { Link } from "react-router-dom";

import "../libs/font-awesome/css/font-awesome.css";
import "../libs/Ionicons/css/ionicons.css";

export default class SiteMap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false
    };
    this.myProps = props;
  }

  handleSignIn = event => {
    ReactGA.event({
            category: 'Navigation',
            action: 'Sign In',
        });
    this.props.history.push("/");
  }

  handleSignup = event => {
    ReactGA.event({
            category: 'Navigation',
            action: 'Sign Up',
        });
    this.props.history.push("/signup");
  }

  navigateToHomeScreen(self) {
   self.props.history.push("/home");
  }

  handlePrivacyPolicy = event => {
    ReactGA.event({
            category: 'Navigation',
            action: 'Privacy Policy',
        });
    this.props.history.push("/privacypolicy");
  }

  handleTermsofUse = event => {
    ReactGA.event({
            category: 'Navigation',
            action: 'Terms of Use',
        });
    this.props.history.push("/termsofuse");
  }

  handleSupport = event => {
    ReactGA.event({
            category: 'Navigation',
            action: 'Support',
        });
    this.props.history.push("/support");
  }
  render() {
    return (
      <div class = "sitemap-links-wrapper">
      <Link to="/">Sign In</Link> <br />
      <Link to="/signup">Sign Up</Link> <br />
      <Link to="/signup">Sign In</Link> <br />
      <Link to="/privacypolicy">Privacy Policy</Link> <br />
      <Link to="/termsofuse">Terms of Use</Link> <br />
      <Link to="/support">Support</Link> <br />
      </div>

    );
  }
}