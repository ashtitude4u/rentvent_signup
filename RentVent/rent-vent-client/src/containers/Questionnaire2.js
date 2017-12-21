import React, { Component } from "react";
import "jquery";

import "./Home.css";
import "../libs/font-awesome/css/font-awesome.css";
import "../libs/Ionicons/css/ionicons.css";
import "../libs/select2/css/select2.min.css";
import { signOutUser } from "../libs/awsLib";

export default class Questionnaire2 extends Component {
   constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
      isAuthenticating: true
    };

    this.headerpanelClass = ["headerpanel-right d-lg-block d-none"];
    this.headerOption = true;

  }

  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  }

  handleLogout = event => {
    signOutUser();
    this.userHasAuthenticated(false);
    this.props.history.push("/");
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

  render() {
    return (
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
            <li class="nav-item"><a href="/home" class="nav-link active">Home</a></li>
            <li class="nav-item"><a href="#" class="nav-link" onClick={this.handleLogout}>Logout</a></li>
          </ul>
        </div>
      </div>
    </div>

    	<div class="pd-t-10 pd-b-50">
    	  <div class="container">
    	    <nav aria-label="breadcrumb" role="navigation">
    	      <ol class="breadcrumb bg-transparent pd-x-0 tx-13">
    	        <li class="breadcrumb-item"><a href="#">Home</a></li>
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
    	                  <input type="text" class="form-control" placeholder="Choose date" />
    	                </div>
    	              </div>
    	            </div>
    	            <div class="col">
    	              <div class="form-group">
    	                <label>What was your move out date?</label>
    	                <div class="input-group wd-200">
    	                  <span class="input-group-addon tx-gray-600"><i class="icon ion-calendar"></i></span>
    	                  <input type="text" class="form-control" placeholder="Choose date" />
    	                </div>
    	              </div>
    	            </div>
    	          </div>
    	          <div class="form-group">
    	            <label>How responsive was your landlord to your inquiries?</label>
    	            <div class="lh-5 tx-24">
    	              <i class="icon ion-star"></i>
    	              <i class="icon ion-star"></i>
    	              <i class="icon ion-star"></i>
    	              <i class="icon ion-star"></i>
    	              <i class="icon ion-star"></i>
    	            </div>
    	          </div>

    	          <div class="form-group">
    	            <label>Did your landlord respond to repair requests in a timely manner?</label>
    	            <div class="lh-5 tx-24">
    	              <i class="icon ion-star"></i>
    	              <i class="icon ion-star"></i>
    	              <i class="icon ion-star"></i>
    	              <i class="icon ion-star"></i>
    	              <i class="icon ion-star"></i>
    	            </div>
    	          </div>

    	          <div class="form-group">
    	            <label>What was the condition of the property compared to the listing?</label>
    	            <div class="lh-5 tx-24">
    	              <i class="icon ion-star"></i>
    	              <i class="icon ion-star"></i>
    	              <i class="icon ion-star"></i>
    	              <i class="icon ion-star"></i>
    	              <i class="icon ion-star"></i>
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
    	              <input type="text" class="form-control" placeholder="Choose date" />
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
    	              <input type="text" class="form-control" placeholder="Choose date" />
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
    );
  }
}