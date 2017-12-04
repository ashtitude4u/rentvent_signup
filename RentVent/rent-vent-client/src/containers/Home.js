import React, { Component } from "react";
import "jquery";

import "./Home.css";
import "../libs/font-awesome/css/font-awesome.css";
import "../libs/Ionicons/css/ionicons.css";
import "../libs/font-awesome/css/font-awesome.css";
import houseImage1 from '../img/1.jpg';
import houseImage2 from '../img/2.jpg';
import houseImage3 from '../img/3.jpg';
import houseImage4 from '../img/4.jpg';
import houseImage5 from '../img/5.jpg';
import houseImage6 from '../img/6.jpg';
import profileImage1 from '../img/7.jpg';
import profileImage2 from '../img/8.jpg';
import profileImage3 from '../img/9.jpg';

export default class Home extends Component {
  render() {
    return (


      // <div className="Home">
      //   <div className="lander">
      //     <h1>Home</h1>
      //     <p>RentVent - Landlords review app</p>
      //   </div>
      // </div>


      <div class="bg-gray-100 pd-y-50">
      <div class="container">
        <div class="row">
          <div class="col-8">
            <div class="media align-items-start">
              <img src={profileImage2} class="wd-150 rounded-circle" alt="" />
              <div class="media-body mg-l-30">
                <h2 class="tx-gray-900 tx-light">Teresa Auyeung</h2>
                <p class="">2051 Norwalk Ave., Los Angeles CA, 90041</p>
                <p class="mg-b-0">Hi, my name is Teresa, Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa... <a href="">Read more</a></p>
              </div>
            </div>

            <div class="d-flex mg-y-40">
              <div>
                <p class="mg-b-10">Phone Number</p>
                <h6 class="tx-lato tx-bold tx-14 tx-gray-800 mg-b-0">(543) 427-4901</h6>
              </div>
              <div class="mg-l-25 bd-l pd-l-25">
                <p class="mg-b-5">Ratings</p>
                <div class="lh-5 tx-16">
                  <i class="icon ion-star tx-primary"></i>
                  <i class="icon ion-star tx-primary"></i>
                  <i class="icon ion-star tx-primary"></i>
                  <i class="icon ion-star tx-primary"></i>
                  <i class="icon ion-star"></i>
                  <span class="pd-l-5 tx-14 tx-gray-800 tx-lato tx-bold">3.5</span>
                </div>
              </div>
              <div class="mg-l-25 bd-l pd-l-25">
                <p class="mg-b-10">Approval Rate</p>
                <h6 class="tx-14 mg-b-0 tx-lato"><span class="tx-success">92%</span> <span class="tx-gray-500">(99/109)</span></h6>
              </div>
              <div class="mg-l-25 bd-l pd-l-25">
                <p class="mg-b-10">Recommendation Rate</p>
                <h6 class="tx-14 mg-b-0 tx-lato"><span class="tx-danger">78%</span> <span class="tx-gray-500">(81/109)</span></h6>
              </div>
            </div>

            <ul class="nav rv-tabs mg-t-40">
              <li class="nav-item"><a href="#propReviews" data-toggle="tab" class="nav-link active">Reviews (86)</a></li>
              <li class="nav-item"><a href="#propAdInfo" data-toggle="tab" class="nav-link">Landlord Additional Info</a></li>
            </ul>

            <div class="tab-content">
              <div id="propReviews" class="tab-pane active">
                <div class="media-list">
                  <div class="media pd-y-30  bd-b">
                    <img src={profileImage1} class="wd-60 rounded-circle" alt="" />
                    <div class="media-body mg-l-15">
                      <h6 class="tx-gray-800 tx-14 mg-b-5">Brandon Lewis <span class="tx-gray-600 tx-normal mg-l-2">Vancouver, WA</span></h6>
                      <p>October 20, 2017 <a href="" class="mg-l-5 tx-gray-500"><i class="icon ion-ios-flag tx-16 lh-0"></i></a></p>

                      <label class="tx-bold tx-uppercase tx-12 tx-primary">Pros</label>
                      <p>Fantastic spot!! We loved our stay here. Beautiful space with room for several people, amazing views from the patio! Our host was friendly and helpful. Couldn't be happier.</p>

                      <div class="row row-xs">
                        <div class="col">
                          <p class="mg-b-5">Approve Landlord?</p>
                          <p class="tx-success mg-b-0">Yes</p>
                        </div>
                        <div class="col">
                          <p class="mg-b-5">Recommend Property?</p>
                          <p class="tx-success mg-b-0">Yes</p>
                        </div>
                        <div class="col">
                          <p class="mg-b-5">Rating</p>
                          <div class="lh-5 tx-16">
                            <i class="icon ion-star tx-primary"></i>
                            <i class="icon ion-star tx-primary"></i>
                            <i class="icon ion-star tx-primary"></i>
                            <i class="icon ion-star tx-primary"></i>
                            <i class="icon ion-star tx-primary"></i>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                  <div class="media pd-y-30 bd-b">
                    <img src={profileImage3} class="wd-60 rounded-circle" alt="" />
                    <div class="media-body mg-l-15">
                      <h6 class="tx-gray-800 tx-14 mg-b-5">Amber Heard <span class="tx-gray-600 tx-normal mg-l-2">San Francisco, CA</span></h6>
                      <p>November 18, 2017 <a href="" class="mg-l-5 tx-gray-500"><i class="icon ion-ios-flag tx-16 lh-0"></i></a></p>

                      <label class="tx-bold tx-uppercase tx-12 tx-primary">Pros</label>
                      <p>Fantastic spot!! We loved our stay here. Beautiful space with room for several people, amazing views from the patio! Our host was friendly and helpful. Couldn't be happier.</p>

                      <label class="tx-bold tx-uppercase tx-12 tx-primary">Cons</label>
                      <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis</p>

                      <div class="row row-xs">
                        <div class="col">
                          <p class="mg-b-5">Approve Landlord?</p>
                          <p class="tx-success mg-b-0">Yes</p>
                        </div>
                        <div class="col">
                          <p class="mg-b-5">Recommend Property?</p>
                          <p class="tx-danger mg-b-0">No</p>
                        </div>
                        <div class="col">
                          <p class="mg-b-5">Rating</p>
                          <div class="lh-5 tx-16">
                            <i class="icon ion-star tx-primary"></i>
                            <i class="icon ion-star tx-primary"></i>
                            <i class="icon ion-star tx-primary"></i>
                            <i class="icon ion-star"></i>
                            <i class="icon ion-star"></i>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
              <div id="propAdInfo" class="tab-pane">
                <div class="mg-t-30">
                  <div class="row">
                    <div class="col-6">
                      <p class="mg-b-10">Period of ownership by landlord</p>
                      <p class="mg-b-5 d-flex justify-content-between">
                        <span class="tx-medium tx-primary">Teresa Auyeung</span>
                        <span>8/28/2015 to present</span>
                      </p>
                      <p class="mg-b-0 d-flex justify-content-between">
                        <span class="tx-medium tx-primary">Annette Bernardino</span>
                        <span>06/2012 - 8/28/2015</span>
                      </p>

                      <p class="mg-b-5 mg-t-30">Legal disputes history</p>
                      <p class="tx-gray-800 mg-b-0">No evidence of legal disputes reported.</p>

                      <p class="mg-b-5 mg-t-30">Utility costs for this property per month on average.</p>
                      <p class="tx-gray-800 mg-b-0 tx-lato">$184</p>

                      <p class="mg-b-5 mg-t-30">Authorized improvements on this property since</p>
                      <p class="tx-gray-800 mg-b-0 tx-lato">October 07, 2015</p>
                    </div>



                    <div class="col-5 mg-l-auto">
                      <p class="mg-b-5">Landlord's profit margin</p>
                      <p class="tx-gray-800 mg-b-0 tx-lato">$450</p>

                      <p class="mg-b-5 mg-t-30">Property taxes paid per year</p>
                      <p class="tx-gray-800 mg-b-0 tx-lato">$9187</p>

                      <p class="mg-b-5 mg-t-30">Owners monthly mortgage</p>
                      <p class="tx-gray-800 mg-b-0 tx-lato">$3570</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>



          </div>
          <div class="col-4">
            <label class="tx-uppercase tx-bold tx-gray-800 mg-b-15">Owned Properties (2)</label>

            <div class="bd pd-20 bg-white mg-b-30">
              <div class="row no-gutters mg-b-20">
                <div class="col ht-100 pd-r-1-force"><img src={houseImage1} alt="" class="wd-100p ht-100p object-fit-cover" /></div>
                <div class="col ht-100 pd-x-1-force"><img src={houseImage2} alt="" class="wd-100p ht-100p object-fit-cover" /></div>
                <div class="col ht-100 pd-l-1-force"><img src={houseImage3} alt="" class="wd-100p ht-100p object-fit-cover" /></div>
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
                <div class="col ht-100 pd-r-1-force"><img src={houseImage4} alt="" class="wd-100p ht-100p object-fit-cover" /></div>
                <div class="col ht-100 pd-x-1-force"><img src={houseImage5} alt="" class="wd-100p ht-100p object-fit-cover" /></div>
                <div class="col ht-100 pd-l-1-force"><img src={houseImage6} alt="" class="wd-100p ht-100p object-fit-cover" /></div>
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

            <hr class="mg-y-30" />

            <div class="mg-t-20 bd pd-25 tx-center">
              <p class="mg-b-5 tx-gray-800 tx-medium">Do you own or manage this property?</p>
              <a href="">Claim Your Profile</a>
            </div>

          </div>
        </div>
      </div>
    </div>

    );
  }
}