import React, { Component } from "react";
import "jquery";

import "./Home.css";
import "../libs/font-awesome/css/font-awesome.css";
import "../libs/Ionicons/css/ionicons.css";
import "../libs/select2/css/select2.min.css";
import houseImage1 from '../img/1.jpg';
import houseImage2 from '../img/2.jpg';
import houseImage3 from '../img/3.jpg';
import houseImage4 from '../img/4.jpg';
import houseImage5 from '../img/5.jpg';
import houseImage6 from '../img/6.jpg';
import profileImage1 from '../img/7.jpg';
import profileImage2 from '../img/8.jpg';
import profileImage3 from '../img/9.jpg';
import { signOutUser } from "../libs/awsLib";

export default class Home extends Component {
   constructor(props) {
    super(props);
    console.log(props);

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
    this.userHasAuthenticated(false);
    this.props.history.push("/");
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
            <li class="nav-item"><a href="/questionnaire" class="nav-link">Questionnaire</a></li>
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
          <div class="col-lg-8">
            <div class="profile-head">
              <div class="profile-head-left">
                <div class="d-sm-flex align-items-start">
                  <h2 class="tx-gray-900 tx-light">Teresa Auyeung</h2>
                  <div class="d-flex align-items-center mg-sm-l-20">
                    <div class="lh-5 tx-24">
                      <i class="icon ion-star tx-primary"></i>
                      <i class="icon ion-star tx-primary"></i>
                      <i class="icon ion-star tx-primary"></i>
                      <i class="icon ion-star tx-primary"></i>
                      <i class="icon ion-star"></i>
                    </div>
                    <span class="mg-l-10 tx-16">4.3</span>
                  </div>
                </div>
                <p class="mg-b-0">2051 Norwalk Ave., Los Angeles CA, 90041</p>
              </div>
              <a href="write-review.html" class="btn btn-primary mg-t-20 mg-md-t-0"><i class="icon ion-edit mg-r-10"></i>Write a Review</a>
            </div>

            <div class="d-flex mg-y-30">
              <div>
                <p class="mg-b-10">Phone Number</p>
                <h6 class="tx-lato tx-bold tx-14 tx-gray-800 mg-b-0">(543) 427-4901</h6>
              </div>
              <div class="mg-l-25 bd-l pd-l-25">
                <p class="mg-b-10">Approval Rate</p>
                <h6 class="tx-14 mg-b-0 tx-lato"><span class="tx-success">92%</span> <span class="tx-gray-500">(99/109)</span></h6>
              </div>
            </div>

            <p>Hi, my name is Teresa, Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa... <a href="">Read more</a></p>

            <hr class="mg-y-25" />

            <div class="row">
              <div class="col-lg-6">
                <p class="mg-b-10">Period of ownership by landlord</p>
                <p class="mg-b-5 d-flex justify-content-between">
                  <span class="tx-medium tx-gray-700">Teresa Auyeung</span>
                  <span>8/28/2015 to present</span>
                </p>
                <p class="mg-b-0 d-flex justify-content-between">
                  <span class="tx-medium tx-gray-700">Annette Bernardino</span>
                  <span>06/2012 - 8/28/2015</span>
                </p>

                <p class="mg-b-5 mg-t-30">Legal disputes history</p>
                <p class="tx-gray-800 mg-b-0">No evidence of legal disputes reported.</p>

                <p class="mg-b-5 mg-t-30">Utility costs for this property per month on average.</p>
                <p class="tx-gray-800 mg-b-0 tx-lato">$184</p>

                <p class="mg-b-5 mg-t-30">Authorized improvements on this property since</p>
                <p class="tx-gray-800 mg-b-0 tx-lato">October 07, 2015</p>
              </div>

              <div class="col-lg-5 mg-l-auto mg-t-25 mg-lg-t-0">
                <p class="mg-b-5">Landlord's profit margin</p>
                <p class="tx-gray-800 mg-b-0 tx-lato">$450</p>

                <p class="mg-b-5 mg-t-30">Property taxes paid per year</p>
                <p class="tx-gray-800 mg-b-0 tx-lato">$9187</p>

                <p class="mg-b-5 mg-t-30">Owners monthly mortgage</p>
                <p class="tx-gray-800 mg-b-0 tx-lato">$3570</p>
              </div>
            </div>

            <h6 class="section-label mg-t-50 mg-b-15">Reviews (86)</h6>
            <div class="review-header">
              <div class="input-form-group">
                <input type="search" class="form-control" placeholder="Search within the reviews" />
                <button class="btn btn-primary"><i class="fa fa-search"></i></button>
              </div>
              <div class="mg-t-15 mg-sm-t-0">
                <span>Sort by</span>
                <select class="select2">
                  <option value="1" selected>Newest First</option>
                  <option value="2">Oldest First</option>
                  <option value="3">Highest Rated</option>
                  <option value="2">Lowest Rated</option>
                </select>
              </div>
            </div>

            <div class="media-list">
              <div class="pd-y-30 bd-b">
                <div class="d-sm-flex justify-content-between mg-b-20 mg-sm-b-0">
                  <div>
                    <h6 class="tx-gray-800 tx-14 mg-b-5">A Renter <span class="tx-gray-600 tx-normal mg-l-2">in Vancouver, WA</span></h6>
                    <p>October 20, 2017 <a href="" class="mg-l-5 tx-gray-500"><i class="icon ion-ios-flag tx-16 lh-0"></i></a></p>
                  </div>
                  <div class="tx-sm-right">
                    <p class="mg-b-0">Rating</p>
                    <div class="lh-5 tx-16">
                      <i class="icon ion-star tx-primary"></i>
                      <i class="icon ion-star tx-primary"></i>
                      <i class="icon ion-star tx-primary"></i>
                      <i class="icon ion-star tx-primary"></i>
                      <i class="icon ion-star tx-primary"></i>
                    </div>
                  </div>
                </div>

                <h6 class="tx-gray-800 mg-b-20">Amazing Landlord!</h6>

                <label class="tx-bold tx-uppercase tx-12 tx-primary">Pros</label>
                <p>Fantastic spot!! We loved our stay here. Beautiful space with room for several people, amazing views from the patio! Our host was friendly and helpful. Couldn't be happier.</p>

                <div class="row row-xs">
                  <div class="col-sm">
                    <p class="mg-b-5">Approve Landlord?</p>
                    <p class="tx-success mg-b-0">Yes</p>
                  </div>
                  <div class="col-sm mg-t-20 mg-sm-t-0">
                    <p class="mg-b-5">Recommend Property?</p>
                    <p class="tx-success mg-b-0">Yes</p>
                  </div>
                  <div class="col-sm mg-t-20 mg-sm-t-0">
                    <p class="mg-b-5">Security deposit returned</p>
                    <p class="tx-lato tx-gray-800 mg-b-0">$200</p>
                  </div>
                </div>
              </div>

              <div class="pd-y-30 bd-b">
                <div class="d-sm-flex justify-content-between mg-b-20 mg-sm-b-0">
                  <div>
                    <h6 class="tx-gray-800 tx-14 mg-b-5">A Renter <span class="tx-gray-600 tx-normal mg-l-2">in San Francisco, CA</span></h6>
                    <p>November 18, 2017 <a href="" class="mg-l-5 tx-gray-500"><i class="icon ion-ios-flag tx-16 lh-0"></i></a></p>
                  </div>
                  <div class="tx-sm-right">
                    <p class="mg-b-0">Rating</p>
                    <div class="lh-5 tx-16">
                      <i class="icon ion-star tx-primary"></i>
                      <i class="icon ion-star tx-primary"></i>
                      <i class="icon ion-star tx-primary"></i>
                      <i class="icon ion-star"></i>
                      <i class="icon ion-star"></i>
                    </div>
                  </div>
                </div>

                <h6 class="tx-gray-800 mg-b-20">Wonderful landlord and the space is amazing</h6>

                <label class="tx-bold tx-uppercase tx-12 tx-primary">Pros</label>
                <p>Fantastic spot!! We loved our stay here. Beautiful space with room for several people, amazing views from the patio! Our host was friendly and helpful. Couldn't be happier.</p>

                <label class="tx-bold tx-uppercase tx-12 tx-primary">Cons</label>
                <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis</p>

                <div class="row row-xs">
                  <div class="col-sm">
                    <p class="mg-b-5">Approve Landlord?</p>
                    <p class="tx-success mg-b-0">Yes</p>
                  </div>
                  <div class="col-sm mg-t-20 mg-sm-t-0">
                    <p class="mg-b-5">Recommend Property?</p>
                    <p class="tx-danger mg-b-0">No</p>
                  </div>
                  <div class="col-sm mg-t-20 mg-sm-t-0">
                    <p class="mg-b-5">Security deposit returned</p>
                    <p class="tx-lato tx-gray-800 mg-b-0">$110</p>
                  </div>
                </div>
              </div>
            </div>

            <a href="" class="btn btn-loadreviews">Load More Reviews</a>


          </div>
          <div class="col-lg-4 mg-t-40 mg-lg-t-0">
            <label class="tx-uppercase tx-medium tx-gray-700 mg-b-15">Owned Properties (2)</label>

            <div class="bd pd-20 bg-white mg-b-30">
              <div class="row no-gutters mg-b-20">
                <div class="col ht-100 pd-r-1-force"><img src="../img/1.jpg" alt="" class="wd-100p ht-100p object-fit-cover" /></div>
                <div class="col ht-100 pd-x-1-force"><img src="../img/2.jpg" alt="" class="wd-100p ht-100p object-fit-cover" /></div>
                <div class="col ht-100 pd-l-1-force"><img src="../img/3.jpg" alt="" class="wd-100p ht-100p object-fit-cover" /></div>
              </div>
              <h6 class="tx-15 tx-primary">Amazing Sea View</h6>
              <p class="mg-b-5">2051 Norwalk Ave., Los Angeles CA, 90041</p>
              <div class="lh-5 tx-14">
                <i class="icon ion-star tx-primary"></i>
                <i class="icon ion-star tx-primary"></i>
                <i class="icon ion-star tx-primary"></i>
                <i class="icon ion-star"></i>
                <i class="icon ion-star"></i>
                <a href="" class="mg-l-5 tx-13">28 Reviews</a>
              </div>
            </div>

            <div class="bd pd-20 bg-white mg-b-30">
              <div class="row no-gutters mg-b-20">
                <div class="col ht-100 pd-r-1-force"><img src="../img/4.jpg" alt="" class="wd-100p ht-100p object-fit-cover" /></div>
                <div class="col ht-100 pd-x-1-force"><img src="../img/5.jpg" alt="" class="wd-100p ht-100p object-fit-cover" /></div>
                <div class="col ht-100 pd-l-1-force"><img src="../img/6.jpg" alt="" class="wd-100p ht-100p object-fit-cover" /></div>
              </div>
              <h6 class="tx-15 tx-primary">Elegant 2 Bedroom House</h6>
              <p class="mg-b-5">2051 Norwalk Ave., Los Angeles CA, 90041</p>
              <div class="lh-5 tx-14">
                <i class="icon ion-star tx-primary"></i>
                <i class="icon ion-star tx-primary"></i>
                <i class="icon ion-star tx-primary"></i>
                <i class="icon ion-star tx-primary"></i>
                <i class="icon ion-star tx-primary"></i>
                <a href="" class="mg-l-5 tx-13">12 Reviews</a>
              </div>
            </div>

            <div class="mg-t-20 bd pd-25 tx-center">
              <p class="mg-b-5 tx-gray-800 tx-medium">Do you own or manage this property?</p>
              <a href="">Claim Your Profile</a>
            </div>

          </div>
        </div>
      </div>
    </div>
    </div>

    );
  }
}