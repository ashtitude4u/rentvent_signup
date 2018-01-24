import React, { Component } from "react";
import "jquery";

import "./Home.css";
import "../libs/font-awesome/css/font-awesome.css";
import "../libs/Ionicons/css/ionicons.css";
import "../libs/select2/css/select2.min.css";
import { signOutUser } from "../libs/awsLib";
import ReactGA from 'react-ga';
import config from "../config";
import {PieChart} from 'react-easy-chart';
import Dropdown from 'react-dropdown'

export default class Property extends Component {
   constructor(props) {
    super(props);
    // this.landlordObj = props.landlordObject;
    this.showMe = false;
  
    this.landlordObj = JSON.parse(sessionStorage.getItem('landlordObject'));
    this.userLoggedIn = JSON.parse(sessionStorage.getItem('userLoggedIn'));

    if(!this.userLoggedIn){
      this.showMe = false;
      this.props.history.push("/");
    } else {
      this.showMe = true;
    }

    this.state = {
      isAuthenticated: false,
      isAuthenticating: true,
      modalDialogStyle: ["modal fade"],
      interestmodalDialogStyle:["modal fade"],
      renovationModalDialogStyle:["modal fade"],
      claimProfileModalDialogStyle:["modal fade"],
      showRentalInfo: false,
      showRentalInfoStyle: ["property-review-data-list collapse"],
      showRentalInfoLinkStyle: ["rental-link collapsed"],
      selectedInterestDropDownOption: "Renter"

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

    // temp values
    this.donutVal1 = 54;
    this.donutVal2 = 46;

    this.interestDropDownOptions = [
      'Renter', 'Prospective Renter','Neighbor'
      ];
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

  interestDropDownSelected = val => {
    console.log("Selected: " + val);
    this.setState({ selectedInterestDropDownOption: val });
    // if(val){
    //   this.landlordSearchCriteria = val.value;
    // } else {
    //   this.landlordSearchCriteria = "";
    // }
  }

  revealDisputes() {
    alert("Under development");
  }

  modalShowClicked = event => {
        this.setState({ modalDialogStyle: ["modal fade show modal-complaints-section"] });
  }

  renovationModalShowClicked = event => {
    this.setState({ renovationModalDialogStyle: ["modal fade show modal-renovations-section"] });
}

claimProfileModalShowClicked = event => {
  this.setState({ claimProfileModalDialogStyle: ["modal fade show modal-renovations-section"] });
}

claimProfileModalHideClicked = event => {
  this.setState({ claimProfileModalDialogStyle: ["modal fade"] });
}

  modalHideClicked = event => {
        this.setState({ modalDialogStyle: ["modal fade"] });
  }

  renovationModalHideClicked = event => {
    this.setState({ renovationModalDialogStyle: ["modal fade"] });
}

  interestModalShowClicked = event => {
    this.setState({ interestmodalDialogStyle: ["modal fade show modal-interests-section"] });
  }

  interestModalHideClicked = event => {
    this.setState({ interestmodalDialogStyle: ["modal fade"] });
  }

  rentalInfoClicked = event => {
    if(this.state.showRentalInfo == false){
        this.setState({ showRentalInfo: true });
        this.setState({ showRentalInfoStyle: ["property-review-data-list collapse show"] });
        this.setState({ showRentalInfoLinkStyle: ["rental-link"] }); 
      } else {
        this.setState({ showRentalInfo: false });
        this.setState({ showRentalInfoStyle: ["property-review-data-list collapse"] }); 
        this.setState({ showRentalInfoLinkStyle: ["rental-link collapsed"] }); 
        
      }
        
  }

  handleLogout = event => {
    signOutUser();
    sessionStorage.setItem('landlordObject', null);
        sessionStorage.setItem('userLoggedIn', null);
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
    sessionStorage.setItem('reviewType', 'P');
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
          <div class="property-address-header">
              <h3 class="tx-light tx-gray-800 mg-b-0">548 Market St., San Francisco CA 94104</h3>
              <a href="#interestModal" data-toggle="modal" class="show-interest-link" onClick={this.interestModalShowClicked.bind(this)}>Show interest in property</a>
            </div>
            <div class="claimed-indicator">
              <div class="indicator"></div>
              <div class="indicator-text">Claimed Profile</div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-8">
            <div class="property-header">
              <div>
                <div class="mg-b-3 tx-12">Overall Rating</div>
                <div class="landlord-star d-flex align-items-center">
                  <div class="landlord-rating-star mg-t-0">
                    <i class="icon ion-star active"></i>
                    <i class="icon ion-star active"></i>
                    <i class="icon ion-star active"></i>
                    <i class="icon ion-star active"></i>
                    <i class="icon ion-star"></i>
                  </div>
                  <span class="mg-l-10 tx-16">4.3</span>
                </div>
              </div>
              <div class="property-approve-wrapper">
                <div class="approve-landlord-donut">
                <PieChart
                          size={60}
                          innerHoleSize={40}
                           data={[
                             { key: 'A', value: this.donutVal1, color: '#2567C0' },
                             { key: 'C', value: this.donutVal2, color: '#EAECEF' }
                            ]}/>
                  <div class="approve-landlord-percent">
                    <h6>54%</h6>
                  </div>
                </div>
                <p class="mg-b-0 mg-l-15">Recommend this property</p>
              </div>
              <div>
                <a href="#" class="btn btn-primary btn-review" onClick={this.handleReview}><i class="icon ion-edit mg-r-10"></i>Write a Review</a>
                <div class="mg-t-2 wd-165 tx-12 tx-center">It's Anonymous</div>
              </div>
            </div>

            <p>Claim your profile to tell renters about yourself and your properties. <a href="#modalClaimProfile" data-toggle="modal" onClick={this.claimProfileModalShowClicked.bind(this)}>Claim Profile</a></p>


            <div class="upload-photo-wrapper">
              <button class="btn btn-primary" onClick={this.handleReview}>Upload Property Photos</button>
            </div>

            <div class="mg-y-25"></div>

            <div id="propertyInfoMobileWrapper">

              <div class="complaint-wrapper">
                <p>This property has</p>
                <h1><a href="#complaintModal" data-toggle="modal" onClick={this.modalShowClicked.bind(this)}>2</a></h1>
                <p>Complaints</p>
              </div>

              <div class="mg-t-30"></div>

              <label class="d-block tx-medium tx-gray-800 mg-b-5">Landlord Information</label>
              <div class="d-flex align-items-center mg-b-5">
                <p class="tx-15 tx-medium mg-b-0 mg-r-10"><a href="">Teresa Auyeung</a></p>
                <div class="landlord-rating-star lrs-sm">
                  <i class="icon ion-star active"></i>
                  <i class="icon ion-star active"></i>
                  <i class="icon ion-star active"></i>
                  <i class="icon ion-star active"></i>
                  <i class="icon ion-star"></i>
                </div>
              </div>
              <p class="mg-b-0">2051 Norwalk Ave., Los Angeles CA, 90041</p>

              <div class="mg-t-30"></div>

              <label class="tx-medium tx-gray-800 mg-b-5">Last Renovated 
              <a href="#renovationModal" class="tx-gray-600" data-toggle="modal" data-target="#renovationModal"  onClick={this.renovationModalShowClicked.bind(this)}>
              (Click for Building Permits)</a></label>
              <p class="mg-b-0 tx-primary">2001</p>

              <div class="mg-t-20"></div>

              <label class="tx-medium tx-gray-800 mg-b-5">Rental Price <a href="" class="tx-gray-600 tx-normal">(Click for Rental Price History)</a></label>
              <p class="mg-b-0 tx-primary">$2,500 per month</p>

              <div class="mg-t-30"></div>

              <label class="tx-medium tx-gray-800 mg-b-10">Property Information</label>
              <div class="property-info-group">
                <div class="property-info-item">
                  <p class="tx-gray-700"><i class="icon ion-checkmark"></i> Property Available</p>
                  <p>June 2018</p>
                </div>
                <div class="property-info-item">
                  <p class="tx-gray-700"><i class="icon ion-calendar"></i> Property Owned Since</p>
                  <p>1998</p>
                </div>
                <div class="property-info-item">
                  <p class="tx-gray-700"><i class="fa fa-bed"></i> Bedrooms</p>
                  <p>3</p>
                </div>
                <div class="property-info-item">
                  <p class="tx-gray-700"><i class="fa fa-bath"></i> Bathrooms</p>
                  <p>2</p>
                </div>
                <div class="property-info-item">
                  <p class="tx-gray-700"><i class="icon ion-crop"></i> Square Footage</p>
                  <p>1,700 sq. ft.</p>
                </div>
                <div class="property-info-item">
                  <p class="tx-gray-700"><i class="icon ion-calendar"></i> Year Built</p>
                  <p>1918</p>
                </div>
              </div>

              <div class="mg-t-30"></div>

              <label class="tx-medium tx-gray-800 mg-b-10">Landlord's Estimated Monthly Expenses</label>

              <div class="property-info-group">
                <div class="property-info-item">
                  <p class="tx-gray-700"><i class="icon ion-social-usd"></i> Mortgage</p>
                  <p>$2,200</p>
                </div>
                <div class="property-info-item">
                  <p class="tx-gray-700"><i class="icon ion-social-usd"></i> Property Tax</p>
                  <p>$10,440</p>
                </div>
                <div class="property-info-item">
                  <p class="tx-gray-700"><i class="icon ion-social-usd"></i> Insurance</p>
                  <p>$200</p>
                </div>
              </div>

              <div class="mg-t-30"></div>

              <label class="d-block tx-medium tx-gray-800 mg-b-10">Map Location</label>
              <a href=""><img src={this.houseImage6} class="img-fluid" alt="" /></a>

            </div>

            <h6 class="section-label mg-t-50 mg-b-0 pd-b-10 bd-b bd-gray-300">Reviews (20)</h6>

            <div class="review-list">
              <div class="review-item">
                <div class="review-item-header">
                  <div>
                    <h6 class="tx-15 review-item-title">Amazing Place!</h6>
                    <div>
                      <span class="tx-gray-800">Previous Renter</span>
                      <span class="mg-l-2">in San Francisco, CA</span>
                    </div>
                  </div>
                  <div class="tx-sm-right mg-t-10 mg-sm-t-0">
                    <p class="mg-b-0">Overall Rating</p>
                    <div class="lh-5 tx-18">
                      <i class="icon ion-star tx-primary"></i>
                      <i class="icon ion-star tx-primary"></i>
                      <i class="icon ion-star tx-primary"></i>
                      <i class="icon ion-star"></i>
                      <i class="icon ion-star"></i>
                    </div>
                  </div>
                </div>


                <label class="tx-medium">Pros</label>
                <p class="tx-gray-700">Fantastic spot!! We loved our stay here. Beautiful space with room for several people, amazing views from the patio! Our host was friendly and helpful. Couldn't be happier.</p>

                <label class="tx-medium">Cons</label>
                <p class="tx-gray-700">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis.</p>

                <a href="#rentalInformation" data-toggle="collapse" class="rental-link collapsed" onClick={this.rentalInfoClicked.bind(this)} className={this.state.showRentalInfoLinkStyle.join('' )}>Rental Information</a>

                <div id="rentalInformation" class="property-review-data-list collapse" className={this.state.showRentalInfoStyle.join('' )}>
                  <div class="row">
                    <div class="col-6 col-md-5">Rental Price</div>
                    <div class="col-6 col-md-7">$2,500</div>
                  </div>
                  <div class="row">
                    <div class="col-6 col-md-5">Lease required for rental</div>
                    <div class="col-6 col-md-7">Yes</div>
                  </div>
                  <div class="row">
                    <div class="col-6 col-md-5">Rental Length</div>
                    <div class="col-6 col-md-7">November 2016 - November 2017</div>
                  </div>
                  <div class="row">
                    <div class="col-6 col-md-5">Security deposit required</div>
                    <div class="col-6 col-md-7">Yes</div>
                  </div>
                  <div class="row">
                    <div class="col-6 col-md-5">Security deposit amount</div>
                    <div class="col-6 col-md-7">$2,500</div>
                  </div>
                  <div class="row">
                    <div class="col-6 col-md-5">Amount of security deposit returned</div>
                    <div class="col-6 col-md-7">$1,400</div>
                  </div>
                  <div class="row">
                    <div class="col-6 col-md-5">Security deposit returned</div>
                    <div class="col-6 col-md-7">12/19/2017</div>
                  </div>
                  <div class="row">
                    <div class="col-6 col-md-5">Annual rent increase</div>
                    <div class="col-6 col-md-7">Yes</div>
                  </div>
                  <div class="row">
                    <div class="col-6 col-md-5">Date your rent was increased</div>
                    <div class="col-6 col-md-7">10/01/2017</div>
                  </div>
                  <div class="row">
                    <div class="col-6 col-md-5">Amount your rent was increased</div>
                    <div class="col-6 col-md-7">$500</div>
                  </div>
                  <div class="row">
                    <div class="col-6 col-md-5">Application fee required</div>
                    <div class="col-6 col-md-7">Yes</div>
                  </div>
                  <div class="row">
                    <div class="col-6 col-md-5">Application fee amount</div>
                    <div class="col-6 col-md-7">$200</div>
                  </div>
                  <div class="row">
                    <div class="col-6 col-md-5">Renters insurance required</div>
                    <div class="col-6 col-md-7">Yes</div>
                  </div>
                  <div class="row">
                    <div class="col-6 col-md-5">Cost of rental insurance per month</div>
                    <div class="col-6 col-md-7">$98</div>
                  </div>
                  <div class="row">
                    <div class="col-6 col-md-5">Estimated utility cost</div>
                    <div class="col-6 col-md-7">$180/month</div>
                  </div>
                  <div class="row">
                    <div class="col-6 col-md-5">Landlord estimated profit margin</div>
                    <div class="col-6 col-md-7">$990</div>
                  </div>
                  <div class="row">
                    <div class="col-6 col-md-5">Issues reported with property</div>
                    <div class="col-6 col-md-7">Yes</div>
                  </div>
                  <div class="row">
                    <div class="col-6 col-md-5 d-flex align-items-center">Issues photos</div>
                    <div class="col-6 col-md-7">
                      <div class="row row-xs">
                        <div class="col-6 col-md-3"><img src={this.houseImage1} class="img-fit-cover" alt="" /></div>
                        <div class="col-6 col-md-3"><img src={this.houseImage2} class="img-fit-cover" alt="" /></div>
                        <div class="col-6 col-md-3 mg-t-10 mg-md-t-0"><img src={this.houseImage3} class="img-fit-cover" alt="" /></div>
                        <div class="col-6 col-md-3 mg-t-10 mg-md-t-0">
                          <div class="img-more">
                            <img src={this.houseImage4} class="img-fit-cover" alt="" />
                            <div class="img-more-link-wrapper">
                              <a href="">2+ more</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <p class="tx-13 mg-t-25 mg-b-0">Added: December 10, 2017 &nbsp; | &nbsp; Updated: December 15, 2017</p>

              </div>
              <div class="review-item">
                <div class="review-item-header">
                  <div>
                    <h6 class="tx-15 review-item-title">Friendly Landlord!</h6>
                    <div>
                      <span class="tx-gray-800">Previous Renter</span>
                      <span class="mg-l-2">in Los Angeles, CA</span>
                    </div>
                  </div>
                  <div class="tx-sm-right mg-t-10 mg-sm-t-0">
                    <p class="mg-b-0">Overall Rating</p>
                    <div class="lh-5 tx-18">
                      <i class="icon ion-star tx-primary"></i>
                      <i class="icon ion-star tx-primary"></i>
                      <i class="icon ion-star tx-primary"></i>
                      <i class="icon ion-star"></i>
                      <i class="icon ion-star"></i>
                    </div>
                  </div>
                </div>


                <label class="tx-medium">Pros</label>
                <p class="tx-gray-700">Fantastic spot!! We loved our stay here. Beautiful space with room for several people, amazing views from the patio! Our host was friendly and helpful. Couldn't be happier.</p>

                <label class="tx-medium">Cons</label>
                <p class="tx-gray-700">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis.</p>

                <p class="tx-13 mg-b-0">Added: December 10, 2017 &nbsp; | &nbsp; Updated: December 15, 2017</p>
              </div>
            </div>

            <div class="bd bd-gray-400 pd-y-10 tx-center mg-t-40">
              <a href="">Load more reviews</a>
            </div>



          </div>
          <div id="propertySidebar" class="col-lg-4 mg-t-40 mg-lg-t-0">
          </div>
        </div>
      </div>
    </div>

    
    <div class="modal fade" id="renovationModal" tabindex="-1" role="dialog" aria-hidden="true" className={this.state.renovationModalDialogStyle.join('' )}>
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header bd-b-0">
            <h6 class="modal-title">Work Permits Granted</h6>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" onClick={this.renovationModalHideClicked.bind(this)}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="table-responsive">
            <table class="table table-permit mg-b-0">
              <thead>
                <tr>
                  <th>Issued date</th>
                  <th>Permit number</th>
                  <th>Permit type</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>10/07/2015</td>
                  <td>150422000020241</td>
                  <td>Plumbing</td>
                  <td>No plan check</td>
                </tr>
                <tr>
                  <td>10/28/2015</td>
                  <td>150422000020241</td>
                  <td>Electrical</td>
                  <td>No plan check</td>
                </tr>
                <tr>
                  <td>04/23/2015</td>
                  <td>150422000020241</td>
                  <td>Bldg-Alter/Repair</td>
                  <td>No plan check</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="complaintModal" tabindex="-1" role="dialog" className={this.state.modalDialogStyle.join('' )}>
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header bd-b-0">
            <h6 class="tx-15 modal-title">Property Complaint History</h6>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" onClick={this.modalHideClicked.bind(this)}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="table-responsive">
            <table class="table table-complaint">
              <thead>
                <tr>
                  <th>Date Received</th>
                  <th>Problem Description</th>
                  <th>Status</th>
                  <th>Department</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>10/12/2017</td>
                  <td class="tx-gray-700">Pro-active Code Enforcement</td>
                  <td class="tx-success">Open</td>
                  <td>LADBS</td>
                </tr>
                <tr>
                  <td>10/12/2017</td>
                  <td class="tx-gray-700">General</td>
                  <td class="tx-success">Open</td>
                  <td>LADBS</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    
    <div class="modal fade" id="interestModal" tabindex="-1" role="dialog" aria-hidden="true" className={this.state.interestmodalDialogStyle.join('' )}>
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header bd-b-0">
            <h6 class="tx-15 modal-title">Show interest in property</h6>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" onClick={this.interestModalHideClicked.bind(this)}>            
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="pd-20 bd-t">
            <div class="form-group">
              <Dropdown options={this.interestDropDownOptions} onChange={this.interestDropDownSelected} value={this.state.selectedInterestDropDownOption} 
                    placeholder="Select an option" className="property-interest-rating-dropdown"/>
            </div>
            <div class="form-group">
              <input type="text" name="firstname" class="form-control" placeholder="Enter First Name" />
            </div>
            <div class="form-group">
              <input type="text" name="lastname" class="form-control" placeholder="Enter Last Name" />
            </div>
            <div class="form-group">
              <input type="email" name="email" class="form-control" placeholder="Enter Email" />
            </div>
            <div class="form-group">
              <input type="text" name="phone" class="form-control" placeholder="Enter Phone" />
            </div>
            <div class="form-group">
              <textarea class="form-control" rows="3" placeholder="Write your message"></textarea>
            </div>
            <button class="btn btn-primary pd-x-20">Submit</button>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="modalClaimProfile" tabindex="-1" role="dialog" aria-hidden="true" className={this.state.claimProfileModalDialogStyle.join('' )}>
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h6 class="tx-15 modal-title">Claim Profile <span class="tx-normal tx-gray-600">It's quick and free.</span></h6>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" onClick={this.claimProfileModalHideClicked.bind(this)}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body pd-40">
            <div class="form-group">
              <div class="row row-xs">
                <div class="col"><input type="text" class="form-control" placeholder="First Name" /></div>
                <div class="col"><input type="text" class="form-control" placeholder="Last Name" /></div>
              </div>
            </div>
            <div class="form-group">
              <input type="email" class="form-control" placeholder="Email Address" />
            </div>
            <div class="form-group">
              <input type="password" class="form-control" placeholder="Password" />
            </div>
            <div class="form-group">
              <input type="password" class="form-control" placeholder="Confirm Password" />
            </div>

            <div class="signwith"><span>or</span></div>

            <div class="row row-xs mg-b-25">
              <div class="col"><a href="" class="btn btn-danger btn-block">Sign Up with Google</a></div>
              <div class="col"><a href="" class="btn btn-primary btn-block">Sign Up with Facebook</a></div>
            </div>

            <div class="d-flex align-items-start mg-b-25">
              <label class="ckbox ckbox-success mg-b-0">
                <input type="checkbox" /><span></span>
              </label>
              <span class="tx-13">I confirm that I own this property and I accept rent vent's <a href="">Terms of Use</a> and <a href="">Privacy Policy</a></span>
            </div>

            <button class="btn btn-primary pd-x-25">Claim My Profile</button>


          </div>
        </div>
      </div>
    </div>

    </div>
    : null
    );
  }
}