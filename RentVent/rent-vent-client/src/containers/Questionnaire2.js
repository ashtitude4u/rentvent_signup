import React, { Component } from "react";
import "jquery";

import "./Home.css";
import "../libs/font-awesome/css/font-awesome.css";
import "../libs/Ionicons/css/ionicons.css";
import "../libs/select2/css/select2.min.css";
import "react-datepicker/dist/react-datepicker.css";
import { signOutUser } from "../libs/awsLib";
import DatePicker from 'react-datepicker';
import moment from 'moment';
import ReactGA from 'react-ga';

export default class Questionnaire2 extends Component {
   constructor(props) {
    super(props);

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
      moveInDate: moment(),
      moveOutDate:moment(),
      leaseDate:moment(),
      securityDepositDate:moment()
    };

    this.headerpanelClass = ["headerpanel-right d-lg-block d-none"];
    this.headerOption = true;
    this.repairStarRatingArray = [["icon ion-star"],["icon ion-star"],["icon ion-star"],["icon ion-star"],["icon ion-star"]];
    this.conditionStarRatingArray = [["icon ion-star"],["icon ion-star"],["icon ion-star"],["icon ion-star"],["icon ion-star"]];
    this.responsiveStarRatingArray = [["icon ion-star"],["icon ion-star"],["icon ion-star"],["icon ion-star"],["icon ion-star"]];

  }

  handleMoveInDateChange = date => {
  	this.setState({ moveInDate:date })
  }

  handleMoveOutDateChange = date => {
  	this.setState({ moveOutDate:date })
  }

  handleLeaseDateChange = date => {
  	this.setState({ leaseDate:date })
  }

  handleSecurityDepositDateDateChange = date => {
  	this.setState({ securityDepositDate:date })
  }

  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  }

  responsiveStarSelected(index){
    this.responsiveStarRatingArray = [["icon ion-star"],["icon ion-star"],["icon ion-star"],["icon ion-star"],["icon ion-star"]];
      for(var i=0; i<=index; i++) {
        this.responsiveStarRatingArray[i]=["icon ion-star filled"];
      }
  }

  repairStarSelected(index){
    this.repairStarRatingArray = [["icon ion-star"],["icon ion-star"],["icon ion-star"],["icon ion-star"],["icon ion-star"]];
      for(var i=0; i<=index; i++) {
        this.repairStarRatingArray[i]=["icon ion-star filled"];
      }
  }

  conditionStarSelected(index){
    this.conditionStarRatingArray = [["icon ion-star"],["icon ion-star"],["icon ion-star"],["icon ion-star"],["icon ion-star"]];
      for(var i=0; i<=index; i++) {
        this.conditionStarRatingArray[i]=["icon ion-star filled"];
      }
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

   menuSelected() {
    if(this.headerOption == false) {
      this.headerpanelClass = ["headerpanel-right d-lg-block d-none"];
      this.reviewTab = ["nav-link active"];
    } else {
      this.reviewTab = ["nav-link"];
      this.headerpanelClass = ["headerpanel-right d-lg-block"];
    }
    this.headerOption = !this.headerOption;
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
            <li class="nav-item"><a href="#" class="nav-link" onClick={this.handleLogout}>Logout</a></li>
          </ul>
        </div>
      </div>
    </div>

    	<div class="pd-t-10 pd-b-50">
    	  <div class="container">
    	    <nav aria-label="breadcrumb" role="navigation">
    	      <ol class="breadcrumb bg-transparent pd-x-0 tx-13">
    	        <li class="breadcrumb-item"><a href="#" onClick={this.navigateToHomeScreen}>Home</a></li>
    	        <li class="breadcrumb-item"><a href="#">Landlords</a></li>
    	        <li class="breadcrumb-item active" aria-current="page">Teresa Auyeung's Profile</li>
    	      </ol>
    	    </nav>
    	    <div class="row">
    	      <div class="col-lg-8 col-xl-7">
    	        <div class="profile-head">
    	          <div class="profile-head-left">
    	            <div class="d-flex align-items-start">
    	              <h2 class="tx-gray-900 tx-light">Teresa Auyeung</h2>
    	            </div>
    	            <p class="mg-b-0">2051 Norwalk Ave., Los Angeles CA, 90041</p>
    	          </div>
    	        </div>

    	        <hr class="mg-y-25" />

    	        <div class="write-review-form">

    	          <div class="row">
    	            <div class="col">
    	              <div class="form-group">
    	                <label>What was your move in date?</label>
    	                <div class="input-group wd-200">
    	                  <span class="input-group-addon tx-gray-600"><i class="icon ion-calendar"></i></span>
    	                  <DatePicker
          						onChange={this.handleMoveInDateChange}
          						selected={this.state.moveInDate}
        					/>	
    	                </div>
    	              </div>
    	            </div>
    	            <div class="col">
    	              <div class="form-group">
    	                <label>What was your move out date?</label>
    	                <div class="input-group wd-200">
    	                  <span class="input-group-addon tx-gray-600"><i class="icon ion-calendar"></i></span>
    	                  	<DatePicker
          						onChange={this.handleMoveOutDateChange}
          						selected={this.state.moveOutDate}
        					/>
    	                </div>
    	                
    	              </div>
    	            </div>
    	          </div>
    	          <div class="form-group">
    	            <label>How responsive was your landlord to your inquiries?</label>
    	            <div class="lh-5 tx-24">
                    <a href="#" onClick={this.responsiveStarSelected.bind(this,0)}><i className={this.responsiveStarRatingArray[0].join('' )}></i></a>
                    <a href="#" onClick={this.responsiveStarSelected.bind(this,1)}><i className={this.responsiveStarRatingArray[1].join('' )}></i></a>
                    <a href="#" onClick={this.responsiveStarSelected.bind(this,2)}><i className={this.responsiveStarRatingArray[2].join('' )}></i></a>
                    <a href="#" onClick={this.responsiveStarSelected.bind(this,3)}><i className={this.responsiveStarRatingArray[3].join('' )}></i></a>
                    <a href="#" onClick={this.responsiveStarSelected.bind(this,4)}><i className={this.responsiveStarRatingArray[4].join('' )}></i></a>
                  </div>
    	          </div>

    	          <div class="form-group">
    	            <label>Did your landlord respond to repair requests in a timely manner?</label>
    	            <div class="lh-5 tx-24">
                    <a href="#" onClick={this.repairStarSelected.bind(this,0)}><i className={this.repairStarRatingArray[0].join('' )}></i></a>
                    <a href="#" onClick={this.repairStarSelected.bind(this,1)}><i className={this.repairStarRatingArray[1].join('' )}></i></a>
                    <a href="#" onClick={this.repairStarSelected.bind(this,2)}><i className={this.repairStarRatingArray[2].join('' )}></i></a>
                    <a href="#" onClick={this.repairStarSelected.bind(this,3)}><i className={this.repairStarRatingArray[3].join('' )}></i></a>
                    <a href="#" onClick={this.repairStarSelected.bind(this,4)}><i className={this.repairStarRatingArray[4].join('' )}></i></a>
                  </div>
    	          </div>

    	          <div class="form-group">
    	            <label>What was the condition of the property compared to the listing?</label>
    	            <div class="lh-5 tx-24">
                    <a href="#" onClick={this.conditionStarSelected.bind(this,0)}><i className={this.conditionStarRatingArray[0].join('' )}></i></a>
                    <a href="#" onClick={this.conditionStarSelected.bind(this,1)}><i className={this.conditionStarRatingArray[1].join('' )}></i></a>
                    <a href="#" onClick={this.conditionStarSelected.bind(this,2)}><i className={this.conditionStarRatingArray[2].join('' )}></i></a>
                    <a href="#" onClick={this.conditionStarSelected.bind(this,3)}><i className={this.conditionStarRatingArray[3].join('' )}></i></a>
                    <a href="#" onClick={this.conditionStarSelected.bind(this,4)}><i className={this.conditionStarRatingArray[4].join('' )}></i></a>
                  </div>
    	          </div>

    	          <div class="form-group">
    	            <label>How much did you pay monthly for rent?</label>
    	            <input type="text" class="form-control wd-200" placeholder="$" />
    	          </div>

    	          <div class="form-group">
    	            <label>Did your rental property require a security deposit?</label>
    	            <div class="d-flex align-items-center mg-t-10">
    	              <label class="rdiobox mg-r-20">
    	                <input name="rdio2" type="radio" checked />
    	                <span>Yes</span>
    	              </label>
    	              <label class="rdiobox">
    	                <input name="rdio2" type="radio" />
    	                <span>No</span>
    	              </label>
    	            </div>
    	          </div>

    	          <div class="form-group">
    	            <label>What was the dollar amount you received back from your security deposit?</label>
    	            <input type="text" class="form-control wd-200" placeholder="$" />
    	          </div>

    	          <div class="form-group">
    	            <label>What date did you receive your security deposit back?</label>
    	            <div class="input-group wd-200">
    	              <span class="input-group-addon tx-gray-600"><i class="icon ion-calendar"></i></span>
						<DatePicker
          						onChange={this.handleSecurityDepositDateDateChange}
          						selected={this.state.securityDepositDate}
        					/>	
    	            </div>
    	          </div>

    	          <div class="form-group">
    	            <label>Did your rent increase while living in the property?</label>
    	            <div class="d-flex align-items-center mg-t-10">
    	              <label class="rdiobox mg-r-20">
    	                <input name="rdio3" type="radio" checked />
    	                <span>Yes</span>
    	              </label>
    	              <label class="rdiobox">
    	                <input name="rdio3" type="radio" />
    	                <span>No</span>
    	              </label>
    	            </div>
    	          </div>

    	          <div class="form-group">
    	            <label>What was the length of your lease?</label>
    	            <input type="text" class="form-control wd-200" placeholder="MM-DD" />
    	          </div>

    	          <div class="form-group">
    	            <label>What date does your lease expire?</label>
    	            <div class="input-group wd-200">
    	              <span class="input-group-addon tx-gray-600"><i class="icon ion-calendar"></i></span>
    	              	<DatePicker
          						onChange={this.handleLeaseDateChange}
          						selected={this.state.leaseDate}
        					/>
    	            </div>
						
    	          </div>

    	          <div class="form-group">
    	            <label>Did your rent increase while living in the property?</label>
    	            <div class="d-flex align-items-center mg-t-10">
    	              <label class="rdiobox mg-r-20">
    	                <input name="rdio4" type="radio" checked />
    	                <span>Yes</span>
    	              </label>
    	              <label class="rdiobox">
    	                <input name="rdio4" type="radio" />
    	                <span>No</span>
    	              </label>
    	            </div>
    	          </div>

    	          <div class="form-group">
    	            <label>Did the landlord require an application fee? If so how much was the fee?</label>
    	            <div class="d-flex align-items-center mg-t-10">
    	              <label class="rdiobox mg-r-20">
    	                <input name="rdio5" type="radio" checked />
    	                <span>Yes</span>
    	              </label>
    	              <label class="rdiobox">
    	                <input name="rdio5" type="radio" />
    	                <span>No</span>
    	              </label>
    	            </div>

    	            <input type="text" class="form-control wd-300 mg-t-20" placeholder="Enter application fee, if any" />
    	          </div>

    	          <div class="form-group">
    	            <label>Did the landlord require rental insurance?</label>
    	            <div class="d-flex align-items-center mg-t-10">
    	              <label class="rdiobox mg-r-20">
    	                <input name="rdio4" type="radio" checked />
    	                <span>Yes</span>
    	              </label>
    	              <label class="rdiobox">
    	                <input name="rdio4" type="radio" />
    	                <span>No</span>
    	              </label>
    	            </div>
    	          </div>


    	          <hr />

    	          <div class="form-group tx-12">
    	            Upon submission of this review, you certify that this review is based on my own experience and is my genuine opinion of the landlord and it's property and that I have no personal or business relationship with this landlord, and have not been offered any incentive or payment originating from the establishment to write this review
    	          </div>

    	          <div class="form-group-footer">
    	            <button class="btn btn-primary" onClick={this.handleLogout}>Submit Review</button>
    	          </div>
    	        </div>

    	      </div>
    	      <div class="col-lg-4 mg-l-auto mg-t-40 mg-lg-t-0">
    	        <label class="tx-14 tx-uppercase tx-bold tx-gray-700 mg-b-25">Recent reviews</label>

    	        <div class="review-list">
    	          <div class="review-item">
    	            <div class="review-item-head">
    	              <div>
    	                <h6 class="tx-gray-800 tx-14 mg-b-5">A Renter <span class="tx-normal tx-gray-600">in San Francisco, CA</span></h6>
    	                <p class="mg-b-0 tx-12">December 12, 2017</p>
    	              </div>

    	              <div class="lh-5 tx-16 mg-b-5">
    	                <i class="icon ion-star tx-primary"></i>
    	                <i class="icon ion-star tx-primary"></i>
    	                <i class="icon ion-star tx-primary"></i>
    	                <i class="icon ion-star tx-primary"></i>
    	                <i class="icon ion-star"></i>
    	              </div>
    	            </div>

    	            <h6 class="tx-14 tx-gray-800">New view, amazing spot</h6>

    	            <p>Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo... <a href="">more</a></p>

    	          </div>

    	          <hr class="mg-y-25" />

    	          <div class="review-item">
    	            <div class="review-item-head">
    	              <div>
    	                <h6 class="tx-gray-800 tx-14 mg-b-5">A Renter <span class="tx-normal tx-gray-600">in San Diego, CA</span></h6>
    	                <p class="mg-b-0 tx-12">December 11, 2017</p>
    	              </div>

    	              <div class="lh-5 tx-16 mg-b-5">
    	                <i class="icon ion-star tx-primary"></i>
    	                <i class="icon ion-star tx-primary"></i>
    	                <i class="icon ion-star tx-primary"></i>
    	                <i class="icon ion-star tx-primary"></i>
    	                <i class="icon ion-star tx-primary"></i>
    	              </div>
    	            </div>

    	            <h6 class="tx-14 tx-gray-800">Friendly landlord</h6>

    	            <p>Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus... <a href="">more</a></p>

    	          </div>

    	          <hr />

    	          <div class="review-item">
    	            <div class="review-item-head">
    	              <div>
    	                <h6 class="tx-gray-800 tx-14 mg-b-5">A Renter <span class="tx-normal tx-gray-600">in Oakland, CA</span></h6>
    	                <p class="mg-b-0 tx-12">December 11, 2017</p>
    	              </div>

    	              <div class="lh-5 tx-16 mg-b-5">
    	                <i class="icon ion-star tx-primary"></i>
    	                <i class="icon ion-star tx-primary"></i>
    	                <i class="icon ion-star tx-primary"></i>
    	                <i class="icon ion-star tx-primary"></i>
    	                <i class="icon ion-star tx-primary"></i>
    	              </div>
    	            </div>

    	            <h6 class="tx-14 tx-gray-800">Great hospitality</h6>

    	            <p>Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus... <a href="">more</a></p>

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