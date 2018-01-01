import React, { Component } from "react";
import "jquery";
  
import {
  HelpBlock,
  FormGroup,
  FormControl,
  ControlLabel
} from "react-bootstrap";
import "./Home.css";
import "../libs/font-awesome/css/font-awesome.css";
import "../libs/Ionicons/css/ionicons.css";
import "../libs/select2/css/select2.min.css";
import { signOutUser } from "../libs/awsLib";
import ReactGA from 'react-ga';

export default class Landing extends Component {
   constructor(props) {
    super(props);
    // this.landlordObj = props.landlordObject;
    this.showMe = false;
    this.landlordObj = JSON.parse(sessionStorage.getItem('landlordObject'));

    if(!this.landlordObj){
      this.showMe = false;
      this.props.history.push("/");
    } else {
      this.showMe = true;
    }

    this.state = {
      isAuthenticated: false,
      isAuthenticating: true,
      propertySearchField: null,
      landlordSearchField: null,
      propertySearchLocation: null
    };
    
    this.headerpanelClass = ["headerpanel-right d-lg-block d-none"];
    this.headerOption = true;

    this.houseImage1 = "https://s3.amazonaws.com/rentvent-web/1.jpg";
    this.houseImage2 = "https://s3.amazonaws.com/rentvent-web/2.jpg";
    this.houseImage3 = "https://s3.amazonaws.com/rentvent-web/3.jpg";
    this.houseImage4 = "https://s3.amazonaws.com/rentvent-web/4.jpg";
    this.houseImage5 = "https://s3.amazonaws.com/rentvent-web/5.jpg";
    this.houseImage6 = "https://s3.amazonaws.com/rentvent-web/6.jpg";
    this.profileImage1 = "https://s3.amazonaws.com/rentvent-web/7.jpg";
    this.profileImage2 = "https://s3.amazonaws.com/rentvent-web/8.jpg";
    this.profileImage3 = "https://s3.amazonaws.com/rentvent-web/9.jpg";

    this.landlordLink = ["nav-link active"];
    this.propertyLink = ["nav-link"];
    this.landlordTab = ["tab-pane active show"];
    this.propertyTab = ["tab-pane"];
  }


  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  }

  menuSelected() {
    if(this.headerOption == false) {
      this.headerpanelClass = ["headerpanel-right d-lg-block d-none"];
    } else {
      this.headerpanelClass = ["headerpanel-right d-lg-block"];
    }
    this.headerOption = !this.headerOption;
  }

  handleLogout = event => {
    signOutUser();
    sessionStorage.setItem('landlordObject', null);
    this.userHasAuthenticated(false);
    ReactGA.event({
            category: 'Navigation',
            action: 'Logout',
        });
    this.props.history.push("/");
  }

  propertySearchClicked = event => {
    this.props.history.push("/property");
  }

  landlordSearchClicked = event => {
    this.props.history.push("/landlord");
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handlePropertyKeyPress = (event) => {
    if(event.key == 'Enter' || event.key == 'Search'){
      this.propertySearchClicked();
    }
  }

  handleLandlordKeyPress = (event) => {
    if(event.key == 'Enter' || event.key == 'Search'){
      this.landlordSearchClicked();
    }
  }
  
  propertyLinkClicked = event => {
    this.landlordLink = ["nav-link"];
    this.propertyLink = ["nav-link active"];
    this.landlordTab = ["tab-pane"];
    this.propertyTab = ["tab-pane active show"];
  }

  landlordLinkClicked = event => {
    this.landlordLink = ["nav-link active"];
    this.propertyLink = ["nav-link"];
    this.landlordTab = ["tab-pane active show"];
    this.propertyTab = ["tab-pane"];
  }

  navigateToLandlordScreen = event => {
    ReactGA.event({
            category: 'Navigation',
            action: 'Landlord',
        });
    this.props.history.push("/landlord");
  }

  componentDidMount () {
      window.scrollTo(0, 0)
  }

  render() {
    
    return (
      this.showMe ? 
    <div>

    <div class="headerpanel">
      <div class="container">
        <div class="headerpanel-left">
          <div class="logo"><i class="icon ion-ios-home"></i></div>
          <h4>rentvent</h4>
        </div>
        <a href="#" class="headerpanel-navicon" onClick={this.menuSelected.bind(this)}><i class="icon ion-navicon-round"></i></a>
        <div class="headerpanel-right d-none d-lg-block" className={this.headerpanelClass.join('' )}>
          <ul class="nav">
            <li class="nav-item"><a href="javascript:void(0)" class="nav-link active">Home</a></li>
            <li class="nav-item"><a href="#" class="nav-link ash" onClick={this.handleLogout}>Logout</a></li>
          </ul>
        </div>
      </div>
    </div>

    <div class="landing-header">
      <div class="header-wrapper">
        <h3 class="header-headline">Check any landlord's reputation and rental history.</h3>

        <ul class="nav nav-landing-header">
          <li class="nav-item" onClick={this.landlordLinkClicked}><a href="#" data-toggle="tab" class="nav-link active" className={this.landlordLink.join('' )}>Find a Landlord</a></li>
          <li class="nav-item" onClick={this.propertyLinkClicked}><a href="#" data-toggle="tab" class="nav-link" className={this.propertyLink.join('' )}>Find a Property</a></li>
        </ul>

        <div class="tab-content">
          <div id="findLandlord" class="tab-pane active show" className={this.landlordTab.join('' )}>
            <div class="row row-xs">
              <div class="col-sm-9">
                <div>

                <FormGroup controlId="landlordSearchField" bsSize="large">
                <FormControl
                  autoFocus
                  type="search"
                  value={this.state.landlordSearchField}
                  onChange={this.handleChange}
                  placeholder="Search landlord by name or address"
                  onKeyPress={this.handleLandlordKeyPress}
                />
                </FormGroup>

                </div>
              </div>
              <div class="col-sm-3 mg-t-15 mg-sm-t-0">
                <button class="btn btn-primary btn-block" disabled={!this.state.landlordSearchField} onClick={this.landlordSearchClicked}>Find Landlord</button>
              </div>
            </div>
          </div>
          <div id="findProperty" class="tab-pane" className={this.propertyTab.join('' )}>
            <div class="row row-xs">
              <div class="col-md-9">
                <div class="row row-xs">
                  <div class="col-sm-7">
                    <FormGroup controlId="propertySearchField" bsSize="large">
                <FormControl
                  autoFocus
                  type="search"
                  value={this.state.propertySearchField}
                  onChange={this.handleChange}
                  placeholder="Enter keywords"
                  onKeyPress={this.handlePropertyKeyPress}
                />
                </FormGroup>
                  </div>
                  <div class="col-sm-5 mg-t-15 mg-sm-t-0">
                    <FormGroup controlId="propertySearchLocation" bsSize="large">
                <FormControl
                  autoFocus
                  type="search"
                  value={this.state.propertySearchLocation}
                  onChange={this.handleChange}
                  placeholder="Location"
                  onKeyPress={this.handlePropertyKeyPress}
                />
                </FormGroup>

                  </div>
                </div>
              </div>
              <div class="col-md-3 mg-t-15 mg-md-t-0">
                <button class="btn btn-primary btn-block" disabled={!this.state.propertySearchField && !this.state.propertySearchLocation} onClick={this.propertySearchClicked}>Find Property</button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>

    <div class="bg-white pd-y-60 pd-sm-y-80">
      <div class="container">
        <h4 class="tx-sm-28 tx-center tx-gray-800 mg-b-60 mg-sm-b-80">Browse Landlord by Location</h4>
        <div class="row">
          <div class="col-lg-6">
            <div class="card card-landlord-fold">
              <figure>
                
                <figcaption>
                  <h2>Los Angeles</h2>
                </figcaption>
              </figure>
              <div class="card-body">
                <p>Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet.</p>
                <a href="#" class="btn btn-outline-primary pd-x-25" onClick={this.landlordSearchClicked}>View Details <i class="fa fa-angle-right mg-l-5"></i></a>
              </div>
            </div>
          </div>
          <div class="col-lg-6 mg-t-30 mg-lg-t-0">
            <div class="card card-landlord-fold">
              <figure>
                
                <figcaption>
                  <h2>San Francisco</h2>
                </figcaption>
              </figure>
              <div class="card-body">
                <p>Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipis.</p>
                <a href="#" class="btn btn-outline-primary pd-x-25" onClick={this.landlordSearchClicked}>View Details <i class="fa fa-angle-right mg-l-5"></i></a>
              </div>
            </div>
          </div>

          <div class="col-lg-6 mg-t-30">
            <div class="card card-landlord-fold">
              <figure>
               
                <figcaption>
                  <h2>New York</h2>
                </figcaption>
              </figure>
              <div class="card-body">
                <p>Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipis.</p>
                <a href="#" class="btn btn-outline-primary pd-x-25" onClick={this.landlordSearchClicked}>View Details <i class="fa fa-angle-right mg-l-5"></i></a>
              </div>
            </div>
          </div>

          <div class="col-lg-6 mg-t-30">
            <div class="card card-landlord-fold">
              <figure>
                
                <figcaption>
                  <h2>Washington DC</h2>
                </figcaption>
              </figure>
              <div class="card-body">
                <p>Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus.</p>
                <a href="#" class="btn btn-outline-primary pd-x-25" onClick={this.landlordSearchClicked}>View Details <i class="fa fa-angle-right mg-l-5"></i></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-gray-100 pd-y-60 pd-sm-y-80">
      <div class="container">
        <h4 class="tx-sm-28 tx-center tx-gray-800 mg-b-60 mg-sm-b-80">Browse Property by Location</h4>
        <div class="row">
          <div class="col-sm-6 col-lg-4">
            <div class="card card-landlord-fold">
              <figure>
                
                <figcaption>
                  <h2>Los Angeles</h2>
                </figcaption>
              </figure>
              <div class="card-body">
                <p>Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet.</p>
                <a href="#" class="btn btn-outline-primary pd-x-25" onClick={this.propertySearchClicked}>View Details <i class="fa fa-angle-right mg-l-5"></i></a>
              </div>
            </div>
          </div>
          <div class="col-sm-6 col-lg-4 mg-t-30 mg-sm-t-0">
            <div class="card card-landlord-fold">
              <figure>
                
                <figcaption>
                  <h2>San Francisco</h2>
                </figcaption>
              </figure>
              <div class="card-body">
                <p>Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet.</p>
                <a href="#" class="btn btn-outline-primary pd-x-25" onClick={this.propertySearchClicked}>View Details <i class="fa fa-angle-right mg-l-5"></i></a>
              </div>
            </div>
          </div>
          <div class="col-sm-6 col-lg-4 mg-t-30 mg-lg-t-0">
            <div class="card card-landlord-fold">
              <figure>
                
                <figcaption>
                  <h2>New York</h2>
                </figcaption>
              </figure>
              <div class="card-body">
                <p>Maecenas tempus, tellus eget condimentum rhoncus, sem quam sit amet adipis.</p>
                <a href="#" class="btn btn-outline-primary pd-x-25" onClick={this.propertySearchClicked}>View Details <i class="fa fa-angle-right mg-l-5"></i></a>
              </div>
            </div>
          </div>
          <div class="col-sm-6 col-lg-4 mg-t-30">
            <div class="card card-landlord-fold">
              <figure>
                
                <figcaption>
                  <h2>Washington DC</h2>
                </figcaption>
              </figure>
              <div class="card-body">
                <p>Maecenas tempus, tellus eget condimentum rhoncus, sem quam sit amet adipis.</p>
                <a href="#" class="btn btn-outline-primary pd-x-25" onClick={this.propertySearchClicked}>View Details <i class="fa fa-angle-right mg-l-5"></i></a>
              </div>
            </div>
          </div>
          <div class="col-sm-6 col-lg-4 mg-t-30">
            <div class="card card-landlord-fold">
              <figure>
                
                <figcaption>
                  <h2>Orlando</h2>
                </figcaption>
              </figure>
              <div class="card-body">
                <p>Maecenas nec odio et ante tincidunt vitae sapien ut libero venenatis faucibus.</p>
                <a href="#" class="btn btn-outline-primary pd-x-25" onClick={this.propertySearchClicked}>View Details <i class="fa fa-angle-right mg-l-5"></i></a>
              </div>
            </div>
          </div>
          <div class="col-sm-6 col-lg-4 mg-t-30">
            <div class="card card-landlord-fold">
              <figure>
                
                <figcaption>
                  <h2>Miami</h2>
                </figcaption>
              </figure>
              <div class="card-body">
                <p>Maecenas nec odio et ante tincidunt vitae sapien ut libero venenatis faucibus.</p>
                <a href="#" class="btn btn-outline-primary pd-x-25" onClick={this.propertySearchClicked}>View Details <i class="fa fa-angle-right mg-l-5"></i></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    </div>
    : null
    );
  }
}