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
import config from "../config";
import ReactGA from 'react-ga';
import {LandlordModel} from '../models/LandlordModel';
import {ComplaintsModel} from '../models/ComplaintsModel';
import {DisputesModel} from '../models/DisputesModel';
import {PropertyModel} from '../models/PropertyModel';
import {LandlordReviewModel} from '../models/LandlordReviewModel';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import '../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

export default class Landing extends Component {
   constructor(props) {
    super(props);
    // this.landlordObj = props.landlordObject;
    this.showMe = false;
    this.userLoggedIn = JSON.parse(sessionStorage.getItem('userLoggedIn'));

    if(!this.userLoggedIn){
      this.showMe = false;
      this.props.history.push("/");
    } else {
      this.showMe = true;
    }
    this.myProps = props;
    // this.landlordObj = JSON.parse(sessionStorage.getItem('landlordObject'));

    // if(!this.landlordObj){
    //   this.showMe = false;
    //   this.props.history.push("/");
    // } else {
    //   this.showMe = true;
    // }

    this.state = {
      isAuthenticated: false,
      isAuthenticating: true,
      propertySearchField: null,
      landlordSearchField: null,
      propertySearchLocation: null,
      landlordResultsClass:["landlord-result-hidden"]
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
    this.landlords = [];
    this.landlordsDataSource = [];
    this.landlordResultsRowSelected = this.landlordResultsRowSelected.bind(this);

    this.options = {
      onRowClick: this.landlordResultsRowSelected
    };

  }

  landlordResultsRowSelected = row =>{
        var selectedLandlord = this.landlords[row.index];
        this.retrievelandlordDetails(selectedLandlord.landlordId);
  }

  retrievelandlordDetails = landlordId => {
    try{
     const GATEWAY_URL = config.apis.LANDLORD_LID_GET+landlordId;

     fetch(GATEWAY_URL, {
         method: 'GET',
         mode: 'cors'
     })
      .then((response) => {
                   return response.json();
               })
               .then((json) => {
                var landlord;
                 if(json && json.Items && json.Items.length > 0){
                  landlord = new LandlordModel;
                  var landlordObj = json.Items[0];
                          landlord.addressLine1 = landlordObj.L_Address_Line1 ? landlordObj.L_Address_Line1 : "";

                          landlord.fullName = landlordObj.L_Full_Name ? landlordObj.L_Full_Name : "";;
                          landlord.addressLine1 = landlordObj.L_Address_Line1 ? landlordObj.L_Address_Line1 : "";
                          landlord.addressLine2 = landlordObj.L_Address_Line2 ? landlordObj.L_Address_Line2 : "";
                          landlord.approval = landlordObj.L_Approval ? landlordObj.L_Approval : "";
                          landlord.avgApproval = landlordObj.L_Avg_Approval ? landlordObj.L_Avg_Approval : "";
                          landlord.avgRating = landlordObj.L_Avg_Rating ? landlordObj.L_Avg_Rating : "";
                          landlord.avgResponsiveness = landlordObj.L_Avg_Responsiveness ? landlordObj.L_Avg_Responsiveness : "";
                          landlord.city = landlordObj.L_City ? landlordObj.L_City : "";
                          landlord.country = landlordObj.L_Country ? landlordObj.L_Country : "";
                          landlord.county = landlordObj.L_County ? landlordObj.L_County : "";
                          landlord.inquiries = landlordObj.L_Inquiries ? landlordObj.L_Inquiries : "";
                          landlord.phone = landlordObj.L_Phone ? landlordObj.L_Phone : "";
                          landlord.rating = landlordObj.L_Rating ? landlordObj.L_Rating : "";
                          landlord.recommend = landlordObj.L_Recommend ? landlordObj.L_Recommend : "";
                          landlord.repair = landlordObj.L_Repair ? landlordObj.L_Repair : "";
                          landlord.repairRequests = landlordObj.L_Repair_Requests ? landlordObj.L_Repair_Requests : "";
                          landlord.state = landlordObj.L_State ? landlordObj.L_State : "";
                          landlord.title = landlordObj.L_Title ? landlordObj.L_Title : "";
                          landlord.zipCode = landlordObj.L_Zipcode ? landlordObj.L_Zipcode : "";
                          landlord.landlordId = landlordObj.L_ID ? landlordObj.L_ID : "";
                          landlord.createdBy = landlordObj.L_Created_By ? landlordObj.L_Created_By : "";
                          landlord.createdOn = landlordObj.L_Created_On ? landlordObj.L_Created_On : "";
                          landlord.updatedBy = landlordObj.L_Updated_By ? landlordObj.L_Updated_By : "";
                          landlord.updatedOn = landlordObj.L_Updated_On ? landlordObj.L_Updated_On : "";
                          landlord.description = landlordObj.L_Description ? landlordObj.L_Description : "";

                          var complaintsObj = landlordObj.L_Complaints ? landlordObj.L_Complaints : "";
                            landlord.complaints = [];
                          if(complaintsObj){
                            for(var i=0; i< complaintsObj.length; i++){
                              landlord.complaints[i] = new ComplaintsModel;
                              landlord.complaints[i].cid = complaintsObj[i];
                            }
                          }

                          var disputesObj = landlordObj.L_Disputes ? landlordObj.L_Disputes : "";
                          if(disputesObj){
                              landlord.disputes = [];
                            for(var i=0; i< disputesObj.length; i++){
                              landlord.disputes[i] = new DisputesModel;
                            landlord.disputes[i].did = disputesObj[i];
                          }
                        }

                          var propertiesObj = landlordObj.L_Properties ? landlordObj.L_Properties : "";
                          if(propertiesObj){
                              landlord.landlordProperties = [];
                            for(var i=0; i< propertiesObj.length; i++){
                              landlord.landlordProperties[i] = new PropertyModel;
                              var propChildObj = propertiesObj[i];
                              landlord.landlordProperties[i].pAdd1 = propChildObj.P_Address_Line1 ? propChildObj.P_Address_Line1 : "Add 1";
                              landlord.landlordProperties[i].pAdd2 = propChildObj.P_Address_Line2 ? propChildObj.P_Address_Line2 : "Add 2";
                              landlord.landlordProperties[i].pCity = propChildObj.P_City ? propChildObj.P_City : "City";
                              landlord.landlordProperties[i].pid = propChildObj.P_ID ? propChildObj.P_ID : "";
                              landlord.landlordProperties[i].pState = propChildObj.P_State ? propChildObj.P_State : "State";
                              landlord.landlordProperties[i].pZip = propChildObj.P_Zipcode ? propChildObj.P_Zipcode : "07095";
                              landlord.landlordProperties[i].pCounty = propChildObj.P_County ? propChildObj.P_County : "";
                              landlord.landlordProperties[i].pCreatedBy = propChildObj.P_Created_By ? propChildObj.P_Created_By : "";
                              landlord.landlordProperties[i].pCreatedOn = propChildObj.P_Created_On ? propChildObj.P_Created_On  : "";
                              landlord.landlordProperties[i].pCountry = propChildObj.P_Country ? propChildObj.P_Country : "";
                              landlord.landlordProperties[i].pAvgApproval = propChildObj.P_Approval_Rate ? propChildObj.P_Approval_Rate : "";
                              landlord.landlordProperties[i].pAvgRating = propChildObj.P_Avg_Rating ? propChildObj.P_Avg_Rating : "";
                              landlord.landlordProperties[i].pReviews = propChildObj.P_Reviews ? propChildObj.P_Reviews : "";
                              landlord.landlordProperties[i].pUpdatedBy = propChildObj.P_Updated_By ? propChildObj.P_Updated_By : "";
                              landlord.landlordProperties[i].pUpdatedOn = propChildObj.P_Updated_On ? propChildObj.P_Updated_On : "";
                              landlord.landlordProperties[i].pRCount = propChildObj.PR_Count ? propChildObj.PR_Count : "";
                              landlord.landlordProperties[i].prRating = propChildObj.PR_Rating ? propChildObj.PR_Rating : "";
                            }
                          }
                          
                          var reviewsObj = landlordObj.Landlord_Reviews ? landlordObj.Landlord_Reviews : "";
                          if(reviewsObj){
                              landlord.landlordReviews = [];
                            for(var i=0; i< reviewsObj.length; i++){
                                landlord.landlordReviews[i] = new LandlordReviewModel;
                                var propChildObj = reviewsObj[i];
                                landlord.landlordReviews[i].lrCreatedDate = propChildObj ? propChildObj.LR_Created_Date : "";
                                landlord.landlordReviews[i].lrDescription = propChildObj ? propChildObj.LR_Description : "";
                                landlord.landlordReviews[i].lrTitle = propChildObj ? propChildObj.LR_Title : "";
                                landlord.landlordReviews[i].lrtid = propChildObj ? propChildObj.T_ID : "";
                                landlord.landlordReviews[i].lrid = propChildObj ? propChildObj.ID : "";
                                landlord.landlordReviews[i].lrlpid = propChildObj ? propChildObj.LP_L_ID : "";
                                landlord.landlordReviews[i].lrApproval = propChildObj ? propChildObj.LR_Approval : "";
                                landlord.landlordReviews[i].lrCreatedBy = propChildObj ? propChildObj.LR_Created_By : "";
                                landlord.landlordReviews[i].lrRating = propChildObj ? propChildObj.LR_Rating : "";
                                landlord.landlordReviews[i].lrRepairRequests = propChildObj ? propChildObj.LR_Repair_Requests : "";
                                landlord.landlordReviews[i].lrResponsiveness = propChildObj ? propChildObj.LR_Responsiveness : "";
                                landlord.landlordReviews[i].lrType = propChildObj ? propChildObj.LR_Types : "";
                                landlord.landlordReviews[i].lrUpdatedBy = propChildObj ? propChildObj.LR_Updated_By : "";
                                landlord.landlordReviews[i].lrUpdatedOn = propChildObj ? propChildObj.LR_Updated_On : "";
                                landlord.landlordReviews[i].lrtState = propChildObj ? propChildObj.T_State : "";
                                landlord.landlordReviews[i].lrtCity = propChildObj ? propChildObj.T_City : "";

                                
                            }
                          }
                  sessionStorage.setItem('landlordObject', JSON.stringify(landlord));
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
    sessionStorage.setItem('userLoggedIn', null);
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
    var landlordString = config.apis.LANDLORD_NAME_GET+this.state.landlordSearchField;
    landlordString = encodeURI(landlordString);
    this.retrievelandlord(this,landlordString);
  }

  retrievelandlord(self_this,landlordString){
        // test api
        var self = self_this;
        

          try{
           const GATEWAY_URL = [landlordString];

           fetch(GATEWAY_URL, {
               method: 'GET',
               mode: 'cors'
           })
               .then((response) => {
                   return response.json();
               })
               .then((json) => {
                   // this.setState({ accessToken: json.done.json.access_token });
                   // this.search();
                   if(json){
                      if(json.length > 0) {
                          
                        var maxCount = 0;
                        if(json.length > 25)
                        {
                          maxCount = 25;
                        } else {
                          maxCount = json.length;
                        }
                          for(var i=0; i<maxCount; i++){
                            var landlordObj = json[i];
                          var landlord = new LandlordModel;
                          landlord.fullName = landlordObj.L_Full_Name ? landlordObj.L_Full_Name : "";;
                          landlord.landlordId = landlordObj.L_ID ? landlordObj.L_ID : "";
                          
                          self.landlords.push(landlord);
                          var dsobj = {
                            "landlordName":landlord.fullName,
                            "index": i
                          };
                          self.landlordsDataSource.push(dsobj);
                        }
                            // show landlord class
                            // self.landlordResultsClass = ["landlord-result"];
                            self.setState({
                              landlordResultsClass: ["landlord-result"]
                            });
                      }
                   }
               })
               .catch((err) => {console.log('There was an error:' + err);alert("Landlord error");})
             } catch (e) {
                console.log('There was an error:'+e); 
                alert("Landlord error");
        }
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
              
              <div className={this.state.landlordResultsClass.join('' )}>
                <BootstrapTable data={this.landlordsDataSource} striped hover options={ this.options } height='300' scrollTop={ 'Top' }>
                  <TableHeaderColumn isKey dataField='landlordName'>Landlord Results</TableHeaderColumn>
              </BootstrapTable>
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