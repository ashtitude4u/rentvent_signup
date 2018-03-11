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
import config from "../config";
import {PieChart} from 'react-easy-chart';
import Dropdown from 'react-dropdown'
import {PropertyModel} from '../models/PropertyModel';
import {LandlordModel} from '../models/LandlordModel';
import {ComplaintsModel} from '../models/ComplaintsModel';
import { ScaleLoader } from 'react-spinners';
import {LandlordReviewModel} from '../models/LandlordReviewModel';
import {RentalModel} from '../models/RentalModel';
import moment from 'moment';

export default class Property extends Component {
   constructor(props) {
    super(props);
    // this.landlordObj = props.landlordObject;
    this.showMe = false;
  
    this.landlordObj = JSON.parse(sessionStorage.getItem('landlordObject'));
    this.userLoggedIn = JSON.parse(sessionStorage.getItem('userLoggedIn'));
    this.propertyObject = JSON.parse(sessionStorage.getItem('propertyObject'));

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
      selectedInterestDropDownOption: "Renter",
      loading:false,
      wrapperClass: [],
      rentalObj:[]
    };
    this.propertyRatingStarArray = [["icon ion-star"],["icon ion-star"],["icon ion-star"],["icon ion-star"],["icon ion-star"]];
    this.propertyLandlordRatingStarArray = [["icon ion-star"],["icon ion-star"],["icon ion-star"],["icon ion-star"],["icon ion-star"]];
    
    this.headerpanelClass = ["headerpanel-right d-lg-block d-none"];
    this.headerOption = true;
    this.rentalsObj = [];

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

    if(this.propertyObject.pAvgRating){
        this.assignPropertyRatings(this.propertyObject.pAvgRating);
        this.propertyObject.pAvgRating = Math.round(this.propertyObject.pAvgRating);
    }
    if(this.propertyObject.pLandlord && this.propertyObject.pLandlord.avgRating){
      this.assignPropertyLandlordRatings(this.propertyObject.pLandlord.avgRating);
      this.propertyObject.pLandlord.avgRating = Math.round(this.propertyObject.pLandlord.avgRating);
    }
    // if(!this.propertyObject.prRecommend){
    //   this.propertyObject.prRecommend = 0;
    // } else {
    //   this.propertyObject.prRecommend = parseInt(this.propertyObject.prRecommend * 100);
    // }
    if(this.propertyObject.pComplaints && this.propertyObject.pComplaints.length > 0){
      this.retrieveComplaintsData();
    }
    if(this.propertyObject.pReviews){
      for (var j = 0; j < this.propertyObject.pReviews.length; j++){
        var item = this.propertyObject.pReviews[j];
        for(var i = 0; i < item.prDescription.length; i++){
          if(item.prDescription[i].PR_Type.toUpperCase() == "ADVICE"){
              item.adviceObj = item.prDescription[i];
          } else if(item.prDescription[i].PR_Type.toUpperCase() == "PRO"){
              item.proObj = item.prDescription[i];
          } else if(item.prDescription[i].PR_Type.toUpperCase() == "CON"){
              item.conObj = item.prDescription[i];
          }
        }
        var str = "rental-link collapsed "+j;
          item.prRentalArray = [str];
          str = "property-review-data-list collapse "+j; 
          item.prRentalStyleArray = [str];
          item.prRentalObj = new RentalModel;
        if(this.propertyObject.pReviews[j].prRental){
            var rentalItem = this.propertyObject.pReviews[j].prRental;
            item.rentalID = rentalItem.R_ID;
            this.fetchRentalInfo(item.rentalID,item.prRentalObj);
        }

      }
    }
    if(this.propertyObject.prRecommend){
      this.donutVal1 = Number(this.propertyObject.prRecommend);
      this.donutVal2 = 100 - Number(this.propertyObject.prRecommend);
    } else {
      this.donutVal1 = 0;
      this.donutVal2 = 100;
    }
  }

setLoadingIndicator = val => {
  if(val){
    this.setState({ wrapperClass: ["overlay-wrapper"] });
  } else {
    this.setState({ wrapperClass: [] });
  }
  this.setState({ loading: val });
}

retrieveComplaintsData = event => {
  this.complaintsObj = [];
    for(var i=0; i<this.propertyObject.pComplaints.length; i++){
        var cid = this.propertyObject.pComplaints[i].cid;
        this.fetchComplaintsService(cid);
    }
}

fetchComplaintsService = cid =>{
  var self = this;
  try{
    const GATEWAY_URL = config.apis.COMPLAINTS_GET+cid;

    fetch(GATEWAY_URL, {
        method: 'GET',
        mode: 'cors'
    })
     .then((response) => {
                  return response.json();
              })
              .then((json) => {
               var property;
                if(json && json.length > 0){
                 var complaintObj = json[0];
                 var complaint = new ComplaintsModel;
                 if(complaintObj){
                    complaint.cAddressDirection = complaintObj.c_address_street_direction ? complaintObj.c_address_street_direction : "";
                    complaint.cCreateOn = complaintObj.c_created_on ? complaintObj.c_created_on : "";
                    complaint.cUpdatedBy = complaintObj.c_updated_by ? complaintObj.c_updated_by : "";
                    complaint.cZip = complaintObj.c_address_zip ? complaintObj.c_address_zip : "";
                    complaint.cid = complaintObj.c_id ? complaintObj.c_id : "";
                    complaint.cAddressLine1 = complaintObj.c_address_line1 ? complaintObj.c_address_line1 : "";
                    complaint.cUpdatedOn =  complaintObj.c_updated_on ? complaintObj.c_updated_on : "";
                    complaint.cCaseGenerated =  complaintObj.c_case_generated ? complaintObj.c_case_generated : "";
                    complaint.cpID =  complaintObj.p_id ? complaintObj.p_id : "";
                    complaint.cCaseClosed =  complaintObj.c_case_closed ? complaintObj.c_case_closed : "";
                    complaint.cCaseNumber =  complaintObj.c_case_number ? complaintObj.c_case_number : "";
                    complaint.cCreatedBy =  complaintObj.c_created_by ? complaintObj.c_created_by : "";
                    complaint.cResponseDays =  complaintObj.c_response_days ? complaintObj.c_response_days : "";
                    self.complaintsObj.push(complaint);
                 }
                }
                return null;
               })
              .catch((err) => {console.log('There was an error:' + err);alert("Complaints retrieve error");})
            } catch (e) {
               console.log('There was an error:'+e); 
               alert("Complaints error");
       }

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

  assignPropertyRatings = rating => {
    this.propertyRatingStarArray = [["icon ion-star"],["icon ion-star"],["icon ion-star"],["icon ion-star"],["icon ion-star"]];
    var ratings = Math.round(rating);
      for(var i=0; i<ratings; i++) {
        this.propertyRatingStarArray[i]=["icon ion-star active"];
      }
  }

  assignPropertyLandlordRatings = rating => {
    this.propertyLandlordRatingStarArray = [["icon ion-star"],["icon ion-star"],["icon ion-star"],["icon ion-star"],["icon ion-star"]];
    var ratings = Math.round(rating);
      for(var i=0; i<ratings; i++) {
        this.propertyLandlordRatingStarArray[i]=["icon ion-star active"];
      }
  }

  revealDisputes() {
    alert("Under development");
  }

  modalShowClicked = event => {
    if(this.propertyObject.pComplaints.length > 0) {
        this.setState({ modalDialogStyle: ["modal fade show modal-complaints-section"] });
    } else {
      alert("No Complaints available");
    }
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

  rentalInfoClicked = (rentalID,index,item) => {
    if(item.prRentalArray[0].includes("show")){
      var str = "rental-link collapsed "+index;
      item.prRentalArray = [str];
      str = "property-review-data-list collapse "+index; 
      item.prRentalStyleArray = [str];
    } else {

      for(var i=0; i<this.rentalsObj.length;i++){
        if(this.rentalsObj[i].rid == item.rentalID){
          item.prRentalObj = this.rentalsObj[i];
        }
     } 
          // item.prRentalObj = this.rentalsObj[index]
      var str = "rental-link show "+index;
      item.prRentalArray = [str];
      str = "property-review-data-list collapse show "+index; 
      item.prRentalStyleArray = [str];
    }
    // if(this.rentalsObj[index].rExpanded == false || this.rentalsObj[index].rExpanded == ""){
    //   this.rentalsObj[index].rExpanded = true;
    //   if(this.rentalsObj[index]){
    //     this.setState({ rentalObj: this.rentalsObj[index] });
    //   } else {
    //     this.setState({ rentalObj: [] });
    //   }
    //     this.setState({ showRentalInfo: true });
    //     this.setState({ showRentalInfoStyle: ["property-review-data-list collapse " + index + " show" ] });
    //     this.setState({ showRentalInfoLinkStyle: ["rental-link"] }); 
    //   } else {
    //     this.rentalsObj[index].rExpanded = false;
    //     this.setState({ showRentalInfo: false });
    //     this.setState({ showRentalInfoStyle: ["property-review-data-list collapse" + index] }); 
    //     this.setState({ showRentalInfoLinkStyle: ["rental-link collapsed"] }); 
        
    //   }
        
  }

  fetchRentalInfo = (rentalID,prRentalObj) => {
    var self = this;
    try{
      const GATEWAY_URL = config.apis.RENTAL_GET+rentalID;
  
      fetch(GATEWAY_URL, {
          method: 'GET',
          mode: 'cors'
      })
       .then((response) => {
                    return response.json();
                })
                .then((json) => {
                 var rental = new RentalModel;
                  if(json && json.Items && json.Items.length > 0){
                   var rentalObj = json.Items[0];
                   
                   if(rentalObj){
                    rental.rid = rentalObj.R_ID ? rentalObj.R_ID : "";
                    rental.rCreatedBy = rentalObj.R_Created_By ? rentalObj.R_Created_By : "";
                    rental.rStartDate = rentalObj.R_Start_Date ? rentalObj.R_Start_Date : "";
                    rental.rDepositRequired = rentalObj.R_Deposit_Required ? rentalObj.R_Deposit_Required : "";
                    rental.rUpdatedOn = rentalObj.R_Updated_On ? rentalObj.R_Updated_On : "";
                    rental.rEndDate = rentalObj.R_End_Date ? rentalObj.R_End_Date : "";
                    rental.rRentersInsurance = rentalObj.R_Renters_Insurance ? rentalObj.R_Renters_Insurance : "";
                    rental.rUpdatedBy = rentalObj.R_Updated_By ? rentalObj.R_Updated_By : "";
                    rental.rApplicationFee = rentalObj.R_Application_Fee ? rentalObj.R_Application_Fee : "";
                    rental.prID = rentalObj.PR_ID ? rentalObj.PR_ID : "";
                    rental.rAnnualIncrease = rentalObj.R_Annual_Increase ? rentalObj.R_Annual_Increase : "";
                    rental.rCreatedOn = rentalObj.R_Created_On ? rentalObj.R_Created_On : "";
                    rental.rTenants = rentalObj.R_Tenants ? rentalObj.R_Tenants : "";
                    rental.rPrice = rentalObj.R_Price ? rentalObj.R_Price : "";

                      self.rentalsObj.push(rental);
                   }
                  }
                  prRentalObj = rental;
                  return null;
                 })
                .catch((err) => {console.log('There was an error:' + err);alert("Rental retrieve error");})
              } catch (e) {
                 console.log('There was an error:'+e); 
                 alert("Rental error");
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
    if(this.propertyObject){
      var self = this;
      if(this.propertyObject.pReviews && this.propertyObject.pReviews.length  > 0) {
      var listItems = this.propertyObject.pReviews.map(function(item,index) {
       return (
           <div class="review-item">
             <div class="review-item-header">
               <div>
                 <h6 class="tx-15 review-item-title">{item.prTitle}</h6>
                 <div>
                   <span class="tx-gray-800">Previous Renter</span>
                   <span class="mg-l-2">in San Francisco, CA</span>
                 </div>
               </div>
               <div class="tx-sm-right mg-t-10 mg-sm-t-0">
                 <p class="mg-b-0">Overall Rating</p>
                 <div class="lh-5 tx-18">
                 {(() => {
                           var starArray = ['<i class="icon ion-star"></i>','<i class="icon ion-star"></i>',
                           '<i class="icon ion-star"></i>','<i class="icon ion-star"></i>',
                           '<i class="icon ion-star"></i>'];
                           for(var i=0; i<item.prRating;i++){
                              starArray[i] = '<i class="icon ion-star tx-primary"></i>';
                           }   
                           var str = starArray[0]+starArray[1]+starArray[2]+starArray[3]+starArray[4];
                                 return <div dangerouslySetInnerHTML={{__html: str}}></div>
                       })()}
 
                 </div>
               </div>
             </div>
                 {(() => {
                         if (item.proObj && item.proObj.description.replace(/^\s+/g, '')) {
                           return <div>
                           <div>
                           <label class="tx-medium">Pros</label>
                           <p class="tx-gray-700">{item.proObj.description}</p>
                           </div>
                           </div>;
                          } 
                       })()}
 
                       {(() => {
                         if (item.adviceObj && item.adviceObj.description.replace(/^\s+/g, '')) {
                           return <div>
                           <div>
                           <label class="tx-medium">Advice</label>
                           <p class="tx-gray-700">{item.adviceObj.description}</p>
                           </div>
                           </div>;
 
                          }  
                       })()}
 
                       {(() => {
                         if (item.conObj && item.conObj.description.replace(/^\s+/g, '')) {
                           return <div>
                           <div>
                           <label class="tx-medium">Cons</label>
                           <p class="tx-gray-700">{item.conObj.description}</p>
                           </div>
                           </div>;
                          }
                       })()}

                       <a href="#rentalInformation" data-toggle="collapse" class="rental-link collapsed" onClick={self.rentalInfoClicked.bind(self,item.rentalID,index,item)} className={item.prRentalArray.join('' )}>Rental Information</a>

<div id="rentalInformation" class="property-review-data-list collapse" className={item.prRentalStyleArray.join('' )}>
  <div class="row">
    <div class="col-6 col-md-5">Rental Price</div>
    <div class="col-6 col-md-7">{item.prRentalObj.rPrice}</div>
  </div>
  <div class="row">
    <div class="col-6 col-md-5">Rental Length</div>
    <div class="col-6 col-md-7">{moment(item.prRentalObj.rStartDate).format('MMMM YYYY')} - {moment(item.prRentalObj.rEndDate).format('MMMM YYYY')}</div>
  </div>
  <div class="row">
    <div class="col-6 col-md-5">Security deposit required</div>
    <div class="col-6 col-md-7">{item.prRentalObj.rDepositRequired}</div>
  </div>
  <div class="row">
    <div class="col-6 col-md-5">Annual rent increase</div>
    <div class="col-6 col-md-7">{item.prRentalObj.rAnnualIncrease}</div>
  </div>
  <div class="row">
    <div class="col-6 col-md-5">Application fee required</div>
    <div class="col-6 col-md-7">{item.prRentalObj.rApplicationFee}</div>
  </div>
  <div class="row">
    <div class="col-6 col-md-5">Renters insurance required</div>
    <div class="col-6 col-md-7">{item.prRentalObj.rRentersInsurance}</div>
  </div>
  <div class="row">
    <div class="col-6 col-md-5 d-flex align-items-center">Issues photos</div>
    <div class="col-6 col-md-7">
      <div class="row row-xs">
        <div class="col-6 col-md-3"><img src={self.houseImage1} class="img-fit-cover" alt="" /></div>
        <div class="col-6 col-md-3"><img src={self.houseImage2} class="img-fit-cover" alt="" /></div>
        <div class="col-6 col-md-3 mg-t-10 mg-md-t-0"><img src={self.houseImage3} class="img-fit-cover" alt="" /></div>
        <div class="col-6 col-md-3 mg-t-10 mg-md-t-0">
          <div class="img-more">
            <img src={self.houseImage4} class="img-fit-cover" alt="" />
            <div class="img-more-link-wrapper">
              <a href="">2+ more</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
                <p class="tx-13 mg-t-25 mg-b-0">Added: {moment(item.prCreatedOn).format('MMMM YYYY')} &nbsp;</p>
               </div>
       );
     });
    }
   if(this.complaintsObj && this.complaintsObj.length  > 0){
     var complaintItems = this.complaintsObj.map(function(item) {
       return (
         <tr>
           <td>{item.cCreateOn}</td>
           <td class="tx-gray-700">{item.cAddressLine1}</td>
           <td class="tx-success">{(() => {
                         if (item.cCaseClosed) {
                           return "Closed";
                          } else {
                            return "Open";
                          }
                       })()}</td>
           <td>LADBS</td>
         </tr>
       )
     });
   }
 }
    return (
      this.showMe ? 
  <div>
      <div className={this.state.wrapperClass.join('' )}>
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
              <h3 class="tx-light tx-gray-800 mg-b-0"> {this.propertyObject.pAdd1}{this.propertyObject.pAdd2}{this.propertyObject.pCity} {this.propertyObject.pState}, {this.propertyObject.pZip}</h3>
              <a href="#interestModal" data-toggle="modal" class="show-interest-link" onClick={this.interestModalShowClicked.bind(this)}>Show interest in property</a>
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
                      <i className={this.propertyRatingStarArray[0].join('' )}></i>
                      <i className={this.propertyRatingStarArray[1].join('' )}></i>
                      <i className={this.propertyRatingStarArray[2].join('' )}></i>
                      <i className={this.propertyRatingStarArray[3].join('' )}></i>
                      <i className={this.propertyRatingStarArray[4].join('' )}></i>
                  </div>
                  <span class="mg-l-10 tx-16">{this.propertyObject.pAvgRating}</span>
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
                    <h6>{this.propertyObject.prRecommend}%</h6>
                  </div>
                </div>
                <p class="mg-b-0 mg-l-15">Recommend this property</p>
              </div>
              <div>
                <a href="#" class="btn btn-primary btn-review" onClick={this.handleReview}><i class="icon ion-edit mg-r-10"></i>Write a Review</a>
                <div class="mg-t-2 wd-165 tx-12 tx-center">It's Anonymous</div>
              </div>
            </div>

            <div class="upload-photo-wrapper">
              <button class="btn btn-primary" onClick={this.handleReview}>Upload Property Photos</button>
            </div>

            <div class="mg-y-25"></div>

            <div id="propertyInfoMobileWrapper">

              <div class="complaint-wrapper">
                <p>This property has</p>
                <h1><a href="#complaintModal" data-toggle="modal" onClick={this.modalShowClicked.bind(this)}>{this.propertyObject.pComplaints.length}</a></h1>
                <p>Complaints</p>
              </div>

              <div class="mg-t-30"></div>

              <label class="d-block tx-medium tx-gray-800 mg-b-5">Landlord Information</label>
              <div class="d-flex align-items-center mg-b-5">
                <p class="tx-15 tx-medium mg-b-0 mg-r-10"><a href="">{this.propertyObject.pLandlord.fullName}</a></p>
                <div class="landlord-rating-star lrs-sm">
                  <i className={this.propertyLandlordRatingStarArray[0].join('' )}></i>
                  <i className={this.propertyLandlordRatingStarArray[1].join('' )}></i>
                  <i className={this.propertyLandlordRatingStarArray[2].join('' )}></i>
                  <i className={this.propertyLandlordRatingStarArray[3].join('' )}></i>
                  <i className={this.propertyLandlordRatingStarArray[4].join('' )}></i>
                </div>
              </div>
              <p class="mg-b-0">{this.propertyObject.pLandlord.addressLine1} {this.propertyObject.pLandlord.addressLine2} {this.propertyObject.pLandlord.city} {this.propertyObject.pLandlord.state}, {this.propertyObject.pLandlord.zipCode}</p>

              <div class="mg-t-30"></div>

              <label class="tx-medium tx-gray-800 mg-b-5">Last Renovated 
              <a href="#renovationModal" class="tx-gray-600" data-toggle="modal" data-target="#renovationModal"  onClick={this.renovationModalShowClicked.bind(this)}>
              (Click for Building Permits)</a></label>
              <p class="mg-b-0 tx-primary">{this.propertyObject.pLandbaseYear}</p>

              <div class="mg-t-20"></div>

              <label class="tx-medium tx-gray-800 mg-b-5">Rental Price <a href="" class="tx-gray-600 tx-normal">(Click for Rental Price History)</a></label>
              <p class="mg-b-0 tx-primary">${this.propertyObject.pLastRentPrice} per month</p>

              <div class="mg-t-30"></div>

              <label class="tx-medium tx-gray-800 mg-b-10">Property Information</label>
              <div class="property-info-group">
                <div class="property-info-item">
                  <p class="tx-gray-700"><i class="icon ion-checkmark"></i> Property Available</p>
                  <p>{moment(this.propertyObject.pLastRentDate).format('MMMM YYYY')}</p>
                </div>
                <div class="property-info-item">
                  <p class="tx-gray-700"><i class="fa fa-bed"></i> Bedrooms</p>
                  <p>{this.propertyObject.pBedrooms}</p>
                </div>
                <div class="property-info-item">
                  <p class="tx-gray-700"><i class="fa fa-bath"></i> Bathrooms</p>
                  <p>{this.propertyObject.pBathrooms}</p>
                </div>
                <div class="property-info-item">
                  <p class="tx-gray-700"><i class="icon ion-crop"></i> Square Footage</p>
                  <p>{this.propertyObject.pSqft} sq. ft</p>
                </div>
                <div class="property-info-item">
                  <p class="tx-gray-700"><i class="icon ion-calendar"></i> Year Built</p>
                  <p>{this.propertyObject.pYearBuilt}</p>
                </div>
              </div>

              <div class="mg-t-30"></div>

              <label class="tx-medium tx-gray-800 mg-b-10">Landlord's Estimated Monthly Expenses</label>

              <div class="property-info-group">
                <div class="property-info-item">
                  <p class="tx-gray-700"><i class="icon ion-social-usd"></i> Mortgage</p>
                  <p>${this.propertyObject.pMortgage}</p>
                </div>
                <div class="property-info-item">
                  <p class="tx-gray-700"><i class="icon ion-social-usd"></i> Property Tax</p>
                  <p>{this.propertyObject.pTaxAmount}</p>
                </div>
              </div>

              <div class="mg-t-30"></div>

              <label class="d-block tx-medium tx-gray-800 mg-b-10">Map Location</label>
              <a href=""><img src={this.houseImage6} class="img-fluid" alt="" /></a>

            </div>

            <h6 class="section-label mg-t-50 mg-b-0 pd-b-10 bd-b bd-gray-300">Reviews ({this.propertyObject.pReviews.length})</h6>

              <div class="review-list">
                                         {listItems}
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
              {complaintItems}
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
      <div className="overlay-indicator">
      <div className="loading-indicator">
          <ScaleLoader
          color={'#8E54E9'} 
          loading={this.state.loading}
           />
          </div>
      </div>

    </div>
    : null
    );
  }
}