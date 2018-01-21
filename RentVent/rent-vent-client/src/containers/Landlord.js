import React, { Component } from "react";
import "jquery";

import "./Home.css";
import "../libs/font-awesome/css/font-awesome.css";
import "../libs/Ionicons/css/ionicons.css";
import "../libs/select2/css/select2.min.css";
import { signOutUser } from "../libs/awsLib";
import ReactGA from 'react-ga';
import {PropertyModel} from '../models/PropertyModel';
import {LandlordModel} from '../models/LandlordModel';
import {ComplaintsModel} from '../models/ComplaintsModel';
import config from "../config";
import {PieChart} from 'react-easy-chart';

export default class Landlord extends Component {
   constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      isAuthenticating: true,
      reviewSectionStyle: ["review-header"],
      landlordPropertiesSectionStyle: ["col-lg-4 mg-t-40 mg-lg-t-0"],
      phoneNumberSectionStyle: [''],
      modalDialogStyle:['modal fade']
    };
    // this.landlordObj = props.landlordObject;
    this.showMe = false;
    this.landlordObj = JSON.parse(sessionStorage.getItem('landlordObject'));
    this.landlordRatingStarArray = [["icon ion-star"],["icon ion-star"],["icon ion-star"],["icon ion-star"],["icon ion-star"]];
    this.landlordOverallRatingArray = [["square-10"],["square-10"],["square-10"],["square-10"],["square-10"]];
    this.landlordResponsiveRatingArray = [["square-10"],["square-10"],["square-10"],["square-10"],["square-10"]];
    this.landlordRepairRequestRatingArray = [["square-10"],["square-10"],["square-10"],["square-10"],["square-10"]];
    this.complaintsObj = [];

      if(this.landlordObj){
        if(this.landlordObj.landlordReviews){
        for (var j = 0; j < this.landlordObj.landlordReviews.length; j++){
          var item = this.landlordObj.landlordReviews[j];
        for(var i = 0; i < item.lrType.length; i++){
            if(item.lrType[i].LR_Type.toUpperCase() == "ADVICE"){
                item.adviceObj = item.lrType[i];
            } else if(item.lrType[i].LR_Type.toUpperCase() == "PRO"){
                item.proObj = item.lrType[i];
            } else if(item.lrType[i].LR_Type.toUpperCase() == "CON"){
                item.conObj = item.lrType[i];
            }
          }
        }
      }
       if(!this.landlordObj.landlordReviews){
          this.state.reviewSectionStyle = ["review-header hide-review-section"];
        }
        if(!this.landlordObj.landlordProperties){
          this.state.landlordPropertiesSectionStyle = ["col-lg-4 mg-t-40 mg-lg-t-0 hide-property-section"];
        }
        if(!this.landlordObj.phone){
          this.state.phoneNumberSectionStyle = ["hide-phone-section"];
        }
        if(!this.landlordObj.description){
          this.landlordObj.description = "Hi, my name is "+this.landlordObj.fullName+"...";
        }
        if(this.landlordObj.avgRating){
            this.assignLandlordRatings(this.landlordObj.avgRating);
            this.landlordObj.avgRating = Math.round(this.landlordObj.avgRating);
        }
        if(this.landlordObj.repairRequests){
          this.assignLandlordRepairRequestRatings(this.landlordObj.repairRequests);
        }
        if(!this.landlordObj.recommend){
          this.landlordObj.recommend = 0;
        }
        if(this.landlordObj.complaints && this.landlordObj.complaints.length > 0){
          this.retrieveComplaintsData();
        }
        if(this.landlordObj.recommend){
          this.donutVal1 = Number(this.landlordObj.recommend);
          this.donutVal2 = 100 - Number(this.landlordObj.recommend);
        } else {
          this.donutVal1 = 0;
          this.donutVal2 = 100;
        }
        if(!this.landlordObj.addressLine1){
          if(this.landlordObj.landlordProperties && this.landlordObj.landlordProperties[0] && this.landlordObj.landlordProperties[0].pAdd1){
            this.landlordObj.addressLine1 = this.landlordObj.landlordProperties[0].pAdd1;
          } else {
            this.landlordObj.addressLine1 = "N/A";
          }
        }
        if(!this.landlordObj.addressLine2){
          if(this.landlordObj.landlordProperties && this.landlordObj.landlordProperties[0] && this.landlordObj.landlordProperties[0].pAdd2){
            this.landlordObj.addressLine2 = this.landlordObj.landlordProperties[0].pAdd2;
          } else {
            this.landlordObj.addressLine2 = "N/A";
          }
        }
        if(!this.landlordObj.city){
          if(this.landlordObj.landlordProperties && this.landlordObj.landlordProperties[0] && this.landlordObj.landlordProperties[0].pCity){
            this.landlordObj.city = this.landlordObj.landlordProperties[0].pCity;
          } else {
            this.landlordObj.city = "N/A";
          }
        }
        if(!this.landlordObj.state){
          if(this.landlordObj.landlordProperties && this.landlordObj.landlordProperties[0] && this.landlordObj.landlordProperties[0].pState){
            this.landlordObj.state = this.landlordObj.landlordProperties[0].pState;
          } else {
            this.landlordObj.state = "N/A";
          }
        }
        if(!this.landlordObj.zipCode){
          if(this.landlordObj.landlordProperties && this.landlordObj.landlordProperties[0] && this.landlordObj.landlordProperties[0].pZip){
            this.landlordObj.zipCode = this.landlordObj.landlordProperties[0].pZip;
          } else {
            this.landlordObj.zipCode = "N/A";
          }
        }
    } 

    sessionStorage.setItem('landlordObject', JSON.stringify(this.landlordObj));

    this.landlordObj ? this.landlordObj.avgRating ? this.assignLandlordRatings(this.landlordObj.avgRating) : "" : "";

    if(!this.landlordObj){
      this.showMe = false;
      this.props.history.push("/");
    } else {
      this.showMe = true;
    }

    
    
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

  }

  assignOverallExp = rating => {
    this.landlordOverallRatingArray = [["square-10"],["square-10"],["square-10"],["square-10"],["square-10"]];
    var ratings = Math.round(rating);
      for(var i=0; i<ratings; i++) {
        this.landlordOverallRatingArray[i]=["square-10 bg-primary"];
      }
  }

  assignResponsiveRate = rating => {
    this.landlordResponsiveRatingArray = [["square-10"],["square-10"],["square-10"],["square-10"],["square-10"]];
    var ratings = Math.round(rating);
      for(var i=0; i<ratings; i++) {
        this.landlordResponsiveRatingArray[i]=["square-10 bg-primary"];
      }
  }

  assignLandlordRepairRequestRatings = rating => {
    this.landlordRepairRequestRatingArray = [["square-10"],["square-10"],["square-10"],["square-10"],["square-10"]];
    var ratings = Math.round(rating);
      for(var i=0; i<ratings; i++) {
        this.landlordRepairRequestRatingArray[i]=["square-10 bg-primary"];
      }
  }
  
  assignLandlordRatings = rating => {
    this.landlordRatingStarArray = [["icon ion-star"],["icon ion-star"],["icon ion-star"],["icon ion-star"],["icon ion-star"]];
    var ratings = Math.round(rating);
      for(var i=0; i<ratings; i++) {
        this.landlordRatingStarArray[i]=["icon ion-star active"];
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

  revealDisputes() {
    alert("Under development");
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
  
  retrieveComplaintsData = event => {
    this.complaintsObj = [];
      for(var i=0; i<this.landlordObj.complaints.length; i++){
          var cid = this.landlordObj.complaints[i].cid.C_ID;
          this.fetchComplaintsService(cid);
      }
  }
  modalShowClicked = event => {
    if(this.landlordObj.complaints.length > 0){
      this.setState({ modalDialogStyle: ["modal fade show modal-complaints-section"] });
    } else {
      alert("No Complaints founds");
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
                  if(json && json.resultlist && json.resultlist.length > 0){
                   var complaintObj = json.resultlist[0];
                   var complaint = new ComplaintsModel;
                   if(complaintObj){
                      complaint.cAddressDirection = complaintObj.C_Address_Street_Direction ? complaintObj.C_Address_Street_Direction : "";
                      complaint.cCreateOn = complaintObj.C_Created_On ? complaintObj.C_Created_On : "";
                      complaint.cUpdatedBy = complaintObj.C_Updated_By ? complaintObj.C_Updated_By : "";
                      complaint.cZip = complaintObj.C_Address_Zip ? complaintObj.C_Address_Zip : "";
                      complaint.cid = complaintObj.C_ID ? complaintObj.C_ID : "";
                      complaint.cAddressLine1 = complaintObj.C_Address_Line1 ? complaintObj.C_Address_Line1 : "";
                      complaint.cUpdatedOn =  complaintObj.C_Updated_On ? complaintObj.C_Updated_On : "";
                      complaint.cCaseGenerated =  complaintObj.C_Case_Generated ? complaintObj.C_Case_Generated : "";
                      complaint.cpID =  complaintObj.P_ID ? complaintObj.P_ID : "";
                      complaint.cCaseClosed =  complaintObj.C_Case_Closed ? complaintObj.C_Case_Closed : "";
                      complaint.cCaseNumber =  complaintObj.C_Case_Number ? complaintObj.C_Case_Number : "";
                      complaint.cCreatedBy =  complaintObj.C_Created_By ? complaintObj.C_Created_By : "";
                      complaint.cResponseDays =  complaintObj.C_Response_Days ? complaintObj.C_Response_Days : "";
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
  
  modalHideClicked = event => {
    this.setState({ modalDialogStyle: ["modal fade"] });
  }

  navigateToPropertyScreen = item => {
    // this.retrievePropertyDetails(item.pid);

    ReactGA.event({
            category: 'Navigation',
            action: 'Property',
        });
    sessionStorage.setItem('propertyID', JSON.stringify(item.pid));

    this.props.history.push("/property");
  }

  retrievePropertyDetails = propertyId => {
    try{
     const GATEWAY_URL = config.apis.PROPERTY_PID_GET+propertyId;

     fetch(GATEWAY_URL, {
         method: 'GET',
         mode: 'cors'
     })
      .then((response) => {
                   return response.json();
               })
               .then((json) => {
                var property;
                 if(json && json.Items && json.Items.length > 0){
                  property = new PropertyModel;
                  var propertyObj = json.Items[0];
                          property.pid = propertyObj.P_ID ? propertyObj.P_ID : "";

                          property.pAdd1 = propertyObj.P_Address_Line1 ? propertyObj.P_Address_Line1 : "Add 1";
                          property.pAdd2 = propertyObj.P_Address_Line2 ? propertyObj.P_Address_Line2 : "Add 2";
                          property.pCity = propertyObj.P_City ? propertyObj.P_City : "City";
                          property.pid = propertyObj.P_ID ? propertyObj.P_ID : "";
                          property.pPhotos = propertyObj.P_Photos ? propertyObj.P_Photos : "";
                          property.pState = propertyObj.P_State ? propertyObj.P_State : "State";
                          property.pZip = propertyObj.P_Zipcode ? propertyObj.P_Zipcode : "07095";
                          property.pCounty = propertyObj.P_County ? propertyObj.P_County : "";
                          property.pCreatedBy = propertyObj.P_Created_By ? propertyObj.P_Created_By : "";
                          property.pCreatedOn = propertyObj.P_Created_On ? propertyObj.P_Created_On  : "";
                          property.pBathrooms = propertyObj.P_Bathrooms ? propertyObj.P_Bathrooms : "";
                          property.pBedrooms = propertyObj.P_Bedrooms ? propertyObj.P_Bedrooms : "";
                          property.pCountry = propertyObj.P_Country ? propertyObj.P_Country : "";
                          property.pAvgApproval = propertyObj.P_Approval_Rate ? propertyObj.P_Approval_Rate : "";
                          property.pAvgRating = propertyObj.P_Avg_Rating ? propertyObj.P_Avg_Rating : "";
                          property.pComplaints = propertyObj.P_Complaints ? propertyObj.P_Complaints : "";
                          property.pInsuranceCost = propertyObj.P_Insurance_Cost ? propertyObj.P_Insurance_Cost : "";
                          property.pRCount = propertyObj.PR_Count ? propertyObj.PR_Count : "";
                          property.prRating = propertyObj.PR_Rating ? propertyObj.PR_Rating : "";

                          var propertiesObj = propertyObj.P_Landlords ? propertyObj.P_Landlords : "";
                          property.pLandlords = [];
                          if(propertyObj && propertyObj.P_Landlords){
                            for(var i=0; i< propertiesObj.length; i++){
                              property.pLandlords[i] = new LandlordModel;
                              property.pLandlords[i].landlordId = propertyObj.P_Landlords[i].L_ID;
                            }
                          }
                          
                          property.pLat = propertyObj.P_Lat ? propertyObj.P_Lat : "";
                          property.pLong = propertyObj.P_Long ? propertyObj.P_Long : "";
                          property.pMortgage = propertyObj.P_Mortgage ? propertyObj.P_Mortgage : "";
                          property.pOwnerShipPeriod = propertyObj.P_Ownership_Period ? propertyObj.P_Ownership_Period : "";
                          property.pPhotos = propertyObj.P_Photos ? propertyObj.P_Photos : "";
                          property.pRentals = propertyObj.P_Rentals ? propertyObj.P_Rentals : "";
                          property.pReviews = propertyObj.P_Reviews ? propertyObj.P_Reviews : "";
                          property.pSqft = propertyObj.P_Sqft ? propertyObj.P_Sqft : "";
                          property.pTaxAmount = propertyObj.P_Tax_Amount ? propertyObj.P_Tax_Amount : "";
                          property.pUpdatedBy = propertyObj.P_Updated_By ? propertyObj.P_Updated_By : "";
                          property.pUpdatedOn = propertyObj.P_Updated_On ? propertyObj.P_Updated_On : "";
                          property.pYearBuilt = propertyObj.P_Year_Bulit ? propertyObj.P_Year_Bulit : "";
                          property.pZoning = propertyObj.P_Zoning ? propertyObj.P_Zoning : "";

                          property.pAvailability = propertyObj.P_Availability ? propertyObj.P_Availability: "";
                          property.pLandbaseYear = propertyObj.P_LandBase_Year ? propertyObj.P_LandBase_Year: "";
                          property.pWorkPermitsGranted = propertyObj.P_Work_Permits_Granted ? propertyObj.P_Work_Permits_Granted: "";


                         

                          
                          
                         
                  sessionStorage.setItem('propertyObject', JSON.stringify(property));
                  this.props.userHasAuthenticated(true);
                  ReactGA.event({
                          category: 'Navigation',
                          action: 'Landlord',
                      });
                  this.props.history.push("/landlord");
                 }
                 
                          
                })
               .catch((err) => {console.log('There was an error:' + err);alert("Landlord retrieve error");})
             } catch (e) {
                console.log('There was an error:'+e); 
                alert("Landlord error");
        }

  }

  
  handleReview = event => {
        sessionStorage.setItem('reviewType', 'L');
    ReactGA.event({
            category: 'Navigation',
            action: 'Questionnaire part 1',
        });
    this.props.history.push("/questionnaire1");
  }

  componentDidMount () {
      window.scrollTo(0, 0)
  }

  render() {
    if(this.landlordObj && this.landlordObj.landlordReviews){
     var listItems = this.landlordObj.landlordReviews.map(function(item) {
      return (



          <div class="review-item">
            <div class="review-item-header">
              <div>
                <h6 class="review-item-title">{item.lrTitle}</h6>
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
                          for(var i=0; i<item.lrRating;i++){
                             starArray[i] = '<i class="icon ion-star tx-primary"></i>';
                          }   
                          var str = starArray[0]+starArray[1]+starArray[2]+starArray[3]+starArray[4];
                                return <div dangerouslySetInnerHTML={{__html: str}}></div>
                      })()}

                </div>
              </div>
            </div>
            {(() => {
              if(item.lrApproval){
                return <div class="row mg-b-25">
              <div class="col-sm-6 col-md-4">
                <i class="fa fa-check tx-success"></i> Approve this landlord
              </div>
            </div>;
              }
            
            })()}
            <div class="row row-landlord-rating">
              <div class="col-sm-6 col-md-3 mg-t-15 mg-sm-t-0">
                <p class="mg-b-5">Repair Request</p>
                <div>
                  {(() => {
                          var starArray = ['<span class="square-10"></span>','<span class="square-10"></span>',
                          '<span class="square-10"></span>','<span class="square-10"></span>',
                          '<span class="square-10"></span>'];
                          for(var i=0; i<item.lrRepairRequests;i++){
                             starArray[i] = '<span class="square-10 bg-primary"></span>';
                          }   
                          var str = starArray[0]+starArray[1]+starArray[2]+starArray[3]+starArray[4];
                                return <div dangerouslySetInnerHTML={{__html: str}}></div>
                      })()}
                </div>
              </div>
              <div class="col-md-6 mg-t-15 mg-md-t-0">
                <p class="mg-b-5">Responsiveness to renter messages</p>
                <div>
                  {(() => {
                          var starArray = ['<span class="square-10"></span>','<span class="square-10"></span>',
                          '<span class="square-10"></span>','<span class="square-10"></span>',
                          '<span class="square-10"></span>'];
                          for(var i=0; i<item.lrResponsiveness;i++){
                             starArray[i] = '<span class="square-10 bg-primary"></span>';
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
               <p class="mg-t-30 mg-b-0">Added: {item.lrCreatedDate} &nbsp;</p>
              </div>

      );
    });
    var self = this;
    if(this.landlordObj && this.landlordObj.landlordProperties){
    var propertyItems = this.landlordObj.landlordProperties.map(function(item) {
      return (
      <div class="bd pd-20 bg-white mg-b-20 div-cursor-section" onClick={self.navigateToPropertyScreen.bind(self,item)}>
        <p class="mg-b-5">{item.pAdd1+" "+item.pAdd2+" "+item.pCity+" "+item.pState+" "+item.pZip+" "}</p>
        <div class="lh-5 tx-14">
        {(() => {
                var starArray = ['<i class="icon ion-star"></i>','<i class="icon ion-star"></i>',
                '<i class="icon ion-star"></i>','<i class="icon ion-star"></i>',
                '<i class="icon ion-star"></i>'];
                for(var i=0; i<item.lrResponsiveness;i++){
                   starArray[i] = '<i class="icon ion-star tx-primary"></i>';
                }   
                var str = starArray[0]+starArray[1]+starArray[2]+starArray[3]+starArray[4];
                      return <div dangerouslySetInnerHTML={{__html: str}}></div>
            })()}
          <a href="" class="mg-l-5 tx-13">{item.pReviews.length} Reviews</a>
        </div>
      </div>
      )
    });
  }
  if(this.landlordObj && this.complaintsObj){
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
            <div class="profile-head">
              <div class="profile-head-left">
                <div class="landlord-rating">
                   <h2 class="landlord-name">{this.landlordObj.fullName}</h2>

                  
                </div>
              </div>
              <div class="landlord-star">
                    <div class="landlord-rating-star">
                      <i className={this.landlordRatingStarArray[0].join('' )}></i>
                      <i className={this.landlordRatingStarArray[1].join('' )}></i>
                      <i className={this.landlordRatingStarArray[2].join('' )}></i>
                      <i className={this.landlordRatingStarArray[3].join('' )}></i>
                      <i className={this.landlordRatingStarArray[4].join('' )}></i>
                    </div> 
                    <span class="mg-l-10 tx-16">{this.landlordObj.avgRating}</span>
                  </div>
              <a href="#" class="btn btn-primary landlord-section-review mg-t-20 mg-md-t-0" onClick={this.handleReview}><i class="icon ion-edit mg-r-10"></i>Write a Review</a>
            </div>


            <div class="row row-landlord-rating">
            <div class="col-sm-6 col-md-4">
                <p class="mg-b-5">Repair Requests</p>
                <div>
                  <span className={this.landlordRepairRequestRatingArray[0].join('' )}></span>
                  <span className={this.landlordRepairRequestRatingArray[1].join('' )}></span>
                  <span className={this.landlordRepairRequestRatingArray[2].join('' )}></span>
                  <span className={this.landlordRepairRequestRatingArray[3].join('' )}></span>
                  <span className={this.landlordRepairRequestRatingArray[4].join('' )}></span>
                </div>
              </div>
              <div class="col-sm-6 col-md-4 mg-t-20 mg-sm-t-0">
                <p class="mg-b-5">Responsiveness to Renters</p>
                <div>
                  <span className={this.landlordResponsiveRatingArray[0].join('' )}></span>
                  <span className={this.landlordResponsiveRatingArray[0].join('' )}></span>
                  <span className={this.landlordResponsiveRatingArray[0].join('' )}></span>
                  <span className={this.landlordResponsiveRatingArray[0].join('' )}></span>
                  <span className={this.landlordResponsiveRatingArray[0].join('' )}></span>
                </div>
              </div>
              <div class="col-md-4 mg-t-20 mg-md-t-0">
                <div class="d-flex align-items-center">
                  <div class="approve-landlord-donut">
                  <PieChart
                          size={50}
                          innerHoleSize={36}
                           data={[
                             { key: 'A', value: this.donutVal1, color: '#2567C0' },
                             { key: 'C', value: this.donutVal2, color: '#EAECEF' }
                            ]}/>
                    <div class="approve-landlord-percent">
                      <h6>{this.landlordObj.recommend}%</h6>
                    </div>
                  </div>
                  <p class="mg-b-0 mg-l-15">Recommend this landlord</p>
                </div>
              </div>
            </div>



                        <div class="row mg-b-25">
                          <div class="col-sm-4">
                            <p class="mg-b-5">Mailing Address</p>
                            <p class="tx-gray-800 mg-b-0">{this.landlordObj.addressLine1}<br />{this.landlordObj.addressLine2}<br />{this.landlordObj.city} {this.landlordObj.state}, {this.landlordObj.zipCode}</p>
                          </div>

                          <div className={this.state.phoneNumberSectionStyle.join('' )}>
                           <div class="col-sm-4 mg-t-20 mg-sm-t-0">
                              <p class="mg-b-5">Phone Number</p>
                              <p class="tx-gray-800 mg-b-0">{this.landlordObj.phone}</p>
                            </div>
                          </div>
                        </div>

            

            <p>Hi, my name is {this.landlordObj.fullName}... <a href="javascript:void(0)">Read more</a></p>
              <h6 class="section-label mg-t-50 mg-b-15">Reviews (86)</h6>
            <div className={this.state.reviewSectionStyle.join('' )}>
               <div class="input-form-group wd-250">
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

            <div class="review-list">
                                         {listItems}

            </div>

          </div>


          <div className={this.state.landlordPropertiesSectionStyle.join('' )}>

          <div class="complaint-wrapper">
            <p>This landlord has</p>
            <h1><a href="#complaintModal" data-toggle="modal" onClick={this.modalShowClicked.bind(this)}>{this.landlordObj.complaints.length}</a></h1>
            <p>Complaints</p>
          </div>

            <div class="mg-t-30"></div>

            <label class="tx-uppercase tx-medium tx-gray-800 mg-b-15">Owned Properties ({this.landlordObj.landlordProperties.length})</label>
            
            {propertyItems}

            <div class="mg-t-20 bd pd-25 tx-center" hidden>
              <p class="mg-b-5 tx-gray-800 tx-medium">Is this your profile?</p>
              <a href="javascript:void(0)" class="d-block">Claim Your Profile</a>
              <span>It's Free</span>
            </div>

          </div>
        </div>
      </div>

      <div class="modal fade" id="complaintModal" tabindex="-1" role="dialog" className={this.state.modalDialogStyle.join('' )}>
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h6 class="tx-15 modal-title">Landlord Complaint History</h6>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close" onClick={this.modalHideClicked.bind(this)}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="table-responsive">
              <table class="table table-complaint">
                <thead>
                  <tr>
                    <th>Date Received</th>
                    <th>Property</th>
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

    </div>
    </div>
    : null
    );
  }
}