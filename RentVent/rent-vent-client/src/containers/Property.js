import React, { Component } from "react";
import "jquery";

import "./Home.css";
import "../libs/font-awesome/css/font-awesome.css";
import "../libs/Ionicons/css/ionicons.css";
import "../libs/select2/css/select2.min.css";
import { signOutUser } from "../libs/awsLib";
import ReactGA from 'react-ga';

export default class Property extends Component {
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
      isAuthenticating: true
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
    this.houseImage11 = "https://s3.amazonaws.com/rentvent-web/6.jpg";

    this.propertyImagesArray = [this.houseImage1,this.houseImage2,this.houseImage3,this.houseImage4,this.houseImage5,this.houseImage6];
    this.selectedPropertyImage = this.propertyImagesArray[0];
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

  revealDisputes() {
    alert("Under development");
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

  navigateToHomeScreen = event => {
    ReactGA.event({
            category: 'Navigation',
            action: 'Home',
        });
    this.props.history.push("/home");
  }
    
  navigateToLandlordScreen = event => {
    ReactGA.event({
            category: 'Navigation',
            action: 'Landlord',
        });
    this.props.history.push("/landlord");
  }

  handleReview = event => {
    ReactGA.event({
            category: 'Navigation',
            action: 'Questionnaire part 1',
        });
    this.props.history.push("/questionnaire1");
  }

  propertyImageSelected = index => {
      this.selectedPropertyImage = this.propertyImagesArray[index];
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
            <li class="nav-item"><a href="#" class="nav-link active" onClick={this.navigateToHomeScreen}>Home</a></li>
            <li class="nav-item"><a href="#" class="nav-link ash" onClick={this.handleLogout}>Logout</a></li>
          </ul>
        </div>
      </div>
    </div>

    <div class="pd-y-50">
      <div class="container">
        <div class="row">
          <div class="col-lg-8">
            <h2 class="tx-light tx-gray-800">Charming House Seaside View</h2>
            <p class="mg-b-25">548 Market St., San Francisco CA 94104</p>

            <a href="javascript:void(0)"><img class="img-fluid" alt="Image of Property" src={this.selectedPropertyImage} key={this.selectedPropertyImage.uri}/></a>

            <div class="row row-xs mg-t-10">
              <div class="col-2" onClick={this.propertyImageSelected.bind(this,1)}><img src={this.propertyImagesArray[0]} class="img-fit-cover" alt="Image 1 of Property" /></div>
              <div class="col-2"><img src={this.propertyImagesArray[1]} class="img-fit-cover" alt="Image 2 of Property" /></div>
              <div class="col-2"><img src={this.propertyImagesArray[2]} class="img-fit-cover" alt="Image 3 of Property" /></div>
              <div class="col-2"><img src={this.propertyImagesArray[3]} class="img-fit-cover" alt="Image 4 of Property" /></div>
              <div class="col-2"><img src={this.propertyImagesArray[4]} class="img-fit-cover" alt="Image 5 of Property" /></div>
              <div class="col-2"><img src={this.propertyImagesArray[5]} class="img-fit-cover" alt="Image 6 of Property" /></div>
            </div>

            <div class="mg-y-25"></div>

            <h6 class="section-label mg-t-50 mg-b-25 bd-b bd-gray-300 pd-b-10">Property Overview</h6>
            <div class="row">
              <div class="col-md-6">
                <p class="mg-b-10">Period of ownership by landlord</p>
                <div class="row mg-b-5">
                  <div class="col-5"><span class="tx-medium tx-gray-700">Teresa Auyeung</span></div>
                  <div class="col-7"><span>8/28/2015 to present</span></div>
                </div>

                <div class="row">
                  <div class="col-5"><span class="tx-medium tx-gray-700">Annette Bernardino</span></div>
                  <div class="col-7"><span>06/17/2012 - 8/28/2015</span></div>
                </div>

                <p class="mg-b-5 mg-t-30">Legal disputes history</p>
                <p class="tx-gray-800 mg-b-0">No evidence of legal disputes reported.</p>

                <p class="mg-b-5 mg-t-30">Utility costs for this property per month on average.</p>
                <p class="tx-gray-800 mg-b-0">$184</p>

                <p class="mg-b-5 mg-t-30">Authorized improvements on this property since</p>
                <p class="tx-gray-800 mg-b-0">October 07, 2015</p>

              </div>

              <div class="col-md-6 mg-t-25 mg-md-t-0 pd-md-l-50">

                <p class="mg-b-5">Landlord's profit margin</p>
                <p class="tx-gray-800 mg-b-0">$450</p>

                <p class="mg-b-5 mg-t-30">Property taxes paid per year</p>
                <p class="tx-gray-800 mg-b-0">$9187</p>

                <p class="mg-b-5 mg-t-30">Owners monthly mortgage</p>
                <p class="tx-gray-800 mg-b-0">$3570</p>

                <div class="row">
                  <div class="col">
                    <p class="mg-b-5 mg-t-30">Year built</p>
                    <p class="tx-gray-800 mg-b-0">2011</p>
                  </div>
                  <div class="col">
                    <p class="mg-b-5 mg-t-30">Square ft.</p>
                    <p class="tx-gray-800 mg-b-0">320 sq. ft.</p>
                  </div>
                </div>
              </div>
            </div>


          </div>
          <div class="col-lg-4 mg-t-40 mg-lg-t-0">
            <label class="tx-uppercase tx-medium tx-gray-700 mg-b-25">Landlord Details</label>
            <div class="d-flex align-items-center mg-b-5">
              <h6 class="mg-b-0 mg-r-10"><a href="#" onClick={this.navigateToLandlordScreen}>Teresa Auyeung</a></h6>
              <div class="landlord-rating-star lrs-sm">
                <i class="icon ion-star active"></i>
                <i class="icon ion-star active"></i>
                <i class="icon ion-star active"></i>
                <i class="icon ion-star active"></i>
                <i class="icon ion-star"></i>
              </div>
            </div>
            <p class="mg-b-0">2051 Norwalk Ave., Los Angeles CA, 90041</p>

            <div class="mg-t-40"></div>

            <div class="mg-t-40"></div>

            <label class="tx-uppercase tx-medium tx-gray-700 mg-b-15">Other Properties of Landlord (1)</label>

            <div class="bd pd-20 bg-white">
              <div class="row no-gutters mg-b-20">
                <div class="col ht-100 pd-r-1-force"><img src={this.houseImage1} alt="Image of reviewed Property" class="wd-100p ht-100p object-fit-cover" /></div>
                <div class="col ht-100 pd-x-1-force"><img src={this.houseImage2} alt="Image of reviewed Property" class="wd-100p ht-100p object-fit-cover" /></div>
                <div class="col ht-100 pd-l-1-force"><img src={this.houseImage3} alt="Image of reviewed Property" class="wd-100p ht-100p object-fit-cover" /></div>
              </div>
              <h6 class="tx-15 tx-primary">Amazing Sea View</h6>
              <p class="mg-b-5">2051 Norwalk Ave., Los Angeles CA, 90041</p>
              <div class="lh-5 tx-14">
                <i class="icon ion-star tx-primary"></i>
                <i class="icon ion-star tx-primary"></i>
                <i class="icon ion-star tx-primary"></i>
                <i class="icon ion-star"></i>
                <i class="icon ion-star"></i>
                <a href="javascript:void(0)" class="mg-l-5 tx-13">28 Reviews</a>
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