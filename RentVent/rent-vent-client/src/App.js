import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Nav, NavItem, Navbar } from 'react-bootstrap';
import './App.css';
import Routes from './Routes';
import RouteNavItem from './components/RouteNavItem';
import { authUser, signOutUser } from "./libs/awsLib";

class App extends Component {
  constructor(props) {
    super(props);

  this.state = {
      isAuthenticated: false,
      isAuthenticating: true
    };

    this.landlordObject = [];
  }

  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  }

  handleLogout = event => {
    signOutUser();
    this.userHasAuthenticated(false);
    this.props.history.push("/");
  }

  async componentDidMount() {
    try {
      if (await authUser()) {
        this.userHasAuthenticated(true);
      }
    }
    catch(e) {
      alert(e);
    }

    this.setState({ isAuthenticating: false });
  }

  myCallback = (dataFromChild) => {
      this.landlordObject = dataFromChild;
    }

  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated,
      landlordObject: this.landlordObject,
      myCallback: this.myCallback
    };

    return (
      !this.state.isAuthenticating &&
      <div className="App container">
        <Routes childProps={childProps} />
      </div>
    );
  }
}

export default withRouter(App);
