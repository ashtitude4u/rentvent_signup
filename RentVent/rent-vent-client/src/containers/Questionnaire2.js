import React, { Component } from "react";
import "jquery";

import "./Home.css";
import "../libs/font-awesome/css/font-awesome.css";
import "../libs/Ionicons/css/ionicons.css";
import "../libs/select2/css/select2.min.css";
import { signOutUser } from "../libs/awsLib";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import ReactGA from 'react-ga';
import {LQuestionnaireModel} from '../models/LQuestionnaireModel';
import {PQuestionnaireModel} from '../models/PQuestionnaireModel';


export default class Questionnaire2 extends Component {
   constructor(props) {
    super(props);

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
      file: '',
      imagePreviewUrl: '',
      issueImagePreviewUrl: '',
      moveInDate: moment(),
      moveOutDate:moment(),
      leaseDate:moment(),
      securityDepositDate:moment(),
      increaseDate:moment(),
      expiredCheckBox: false,
      rentingCheckBox: false,
      disableLeaseExpireDate: false,
      recommendOn: false,
      recommendOff: false,
      lpMoveInDate: moment(),
      pSecurityDepositBackDate: moment(),
      pRentIncreaseDate: moment(),
      pLeaseExpiryDate: moment(),
      lpMoveOutDate: moment(),
      starRatingArray: [["icon ion-star"],["icon ion-star"],["icon ion-star"],["icon ion-star"],["icon ion-star"]],
      landlordGeneralResponsiveStarArray:[["icon ion-star"],["icon ion-star"],["icon ion-star"],["icon ion-star"],["icon ion-star"]],
      landlordRepairResponsiveStarArray:[["icon ion-star"],["icon ion-star"],["icon ion-star"],["icon ion-star"],["icon ion-star"]],
      conditionStarRatingArray:[["icon ion-star"],["icon ion-star"],["icon ion-star"],["icon ion-star"],["icon ion-star"]]
    };

    this.headerpanelClass = ["headerpanel-right d-lg-block d-none"];
    this.headerOption = true;
    this.starOptionSelected = false;
    this.reviewType = "L";

    this.previousButtonStyle = ["btn btn-primary"];
    this.currentButtonStyle = ["btn btn-primary"];
    this.landlordReviewButtonStyle = ["btn btn-primary"];
    this.propertyReviewButtonStyle = ["btn btn-primary"];
    this.moveInQuestion = "What was the time period your rented from this landlord?";
    this.overallExpQuestion = "How would you rate your overall experience with this landlord?";
    this.recommendQuestion = "Would you recommend this landlord to friends?";
    this.prosQuestion = "What are some pros of working with this landlord?";
    this.consQuestion = "What are some cons of working with this landlord?";
    this.landlordQuestionStyle = ["form-group"];
    this.propertyQuestionStyle = ["form-group hide-review-section"];
    if(sessionStorage.getItem('reviewType') == "L"){
      this.reviewTypeButtonSelected("landlord");
    }else{
      this.reviewTypeButtonSelected("property");
    }
    this.PQuestionnaireObj = new PQuestionnaireModel;
    this.LQuestionnaireObj = new LQuestionnaireModel;
    this.questionnaireObj = this.LQuestionnaireObj;

  }


  handleCheckBoxChange(event){
    const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
          expiredCheckBox: value
        });
        if(!value){
          this.disableLeaseExpireDate = false;
        } else {
          this.disableLeaseExpireDate = true;
          this.state.pLeaseExpiryDate = null;
          this.questionnaireObj.pLeaseExpiryDate = null;
        }
  }
  handleRentingCheckBoxChange(event){
    const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
          rentingCheckBox: value
        });
        this.questionnaireObj.lpCurrentRenting = value;
  }

  currentButtonSelected(option) {
    this.previousButtonStyle = ["btn btn-primary"];
    this.currentButtonStyle = ["btn btn-primary"];
    if(option == "current"){
      this.previousButtonStyle = ["btn btn-primary"];
      this.currentButtonStyle = ["btn btn-primary active"];
      this.questionnaireObj.lpCurrent = "current";
    } else {
      this.previousButtonStyle = ["btn btn-primary active"];
      this.currentButtonStyle = ["btn btn-primary"];
      this.questionnaireObj.lpCurrent = "former";
    }
  }

  reviewTypeButtonSelected(option) {
    this.landlordReviewButtonStyle = ["btn btn-primary"];
    this.propertyReviewButtonStyle = ["btn btn-primary"];
    if(option == "landlord"){
      this.landlordReviewButtonStyle = ["btn btn-primary active"];
    this.propertyReviewButtonStyle = ["btn btn-primary"];
        this.reviewType = "L";
        this.landlordQuestionStyle = ["form-group hide-review-section"];
        this.propertyQuestionStyle = ["form-group"];
        this.questionnaireObj = this.LQuestionnaireObj;
        this.landlordTypeQuestions();
    } else {
      this.landlordReviewButtonStyle = ["btn btn-primary"];
          this.propertyReviewButtonStyle = ["btn btn-primary active"];
          this.reviewType = "P";
          this.landlordQuestionStyle = ["form-group"];
          this.propertyQuestionStyle = ["form-group hide-review-section"];
          this.questionnaireObj = this.PQuestionnaireObj;
          this.propertyTypeQuestions();
    }
  }

  landlordTypeQuestions(){
    this.moveInQuestion = "What was the time period your rented from this landlord?";
    this.overallExpQuestion = "How would you rate your overall experience with this landlord?";
    this.recommendQuestion = "Would you recommend this landlord to friends?";
    this.prosQuestion = "What are some pros of working with this landlord?";
    this.consQuestion = "What are some cons of working with this landlord?";
  }

  propertyTypeQuestions(){
    this.moveInQuestion = "What was the time period you lived in this rental?";
    this.overallExpQuestion = "How was your overall experience living at this property?";
    this.recommendQuestion = "Would you recommend this property to friends?";
    this.prosQuestion = "What are some pros of the property?";
    this.consQuestion = "What are some cons of the property?";
  }

  handleImageUploaded(e) {
    e.preventDefault();
    // TODO: do something with -> this.state.file
    console.log('handle uploading-', this.state.file);
    this.questionnaireObj.ppPhotos = this.state.file;
  }

  handleTitleInputChange = event =>{
    this.questionnaireObj.lpReviewTitle = event.target.value;
  }

  handleRecommendInputChange(event) {
   this.questionnaireObj.lpRecommend = event.target.value;
  }

  handleSecurityDepositInputChange(event) {
   this.questionnaireObj.pSecurityDepositReq = event.target.value;
  }
  
  handleApplicationFeeInputChange(event) {
   this.questionnaireObj.pApplicationFeeReq = event.target.value;
  }

  handleRentIncreaseInputChange(event) {
   this.questionnaireObj.pRentIncrease = event.target.value;
  }

  handleProsInputChange = event =>{
    this.questionnaireObj.lpPros = event.target.value;
  }

  handleConsInputChange = event =>{
    this.questionnaireObj.lpCons = event.target.value;
  }

  handleAdviceInputChange = event =>{
    this.questionnaireObj.lAdvice = event.target.value;
  }

  handleAppFeeInputChange = event =>{
    this.questionnaireObj.pApplicationFeeAmount = event.target.value;
  }
  
  handleSecDepositAmountInputChange = event =>{
    this.questionnaireObj.pSecurityDepositAmount = event.target.value;
  }

  handleMonthlyRentInputChange = event =>{
    this.questionnaireObj.pMonthlyRent = event.target.value;
  }

  handleSecDepositBackAmountInputChange = event =>{
    this.questionnaireObj.pSecurityDepositBackAmount = event.target.value;
  }

  handleMonthlyIncAmountInputChange = event =>{
    this.questionnaireObj.pRentIncreaseAmount = event.target.value;
  }

  handleGeneralIssuesInputChange = event =>{
    this.questionnaireObj.pGeneralIssues = event.target.value;
  }

  handleRentalInsuranceInputChange = event =>{
    this.questionnaireObj.pRentalInsuranceReq = event.target.value;
  }

  handleIssueImageUploaded(e) {
    e.preventDefault();
    // TODO: do something with -> this.state.file
    console.log('handle uploading-', this.state.file);
  }

  validateForm() {
    return this.starOptionSelected;
  }

  handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      // this.setState({
      //   file: file,
      //   imagePreviewUrl: reader.result
      // });
            this.questionnaireObj.ppPhotos = reader.result;
    }
        reader.readAsDataURL(file)
  }

  handleIssueImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      // this.setState({
      //   file: file,
      //   issueImagePreviewUrl: reader.result
      // });
      this.questionnaireObj.pIssuePhotos = reader.result;
    }
        reader.readAsDataURL(file)
  }

  handleMoveInDateChange = date => {
        this.setState({ lpMoveInDate:date });
        this.questionnaireObj.lpMoveInDate = date.toDate();
  }

  handleMoveOutDateChange = date => {
        this.setState({ lpMoveOutDate:date });
        this.questionnaireObj.lpMoveOutDate = date.toDate();
  }

  handleLeaseDateChange = date => {
        this.setState({ pLeaseExpiryDate:date });
        this.questionnaireObj.pLeaseExpiryDate = date.toDate();
  }

  handleSecurityDepositDateDateChange = date => {
        this.setState({ pSecurityDepositBackDate:date });
        this.questionnaireObj.pSecurityDepositBackDate = date.toDate();
  }

  handleIncreaseDateChange = date => {
        this.setState({ pRentIncreaseDate:date });
        this.questionnaireObj.pRentIncreaseDate = date.toDate();
  }

  conditionStarSelected(index){
    var locStarRatingArray=[["icon ion-star"],["icon ion-star"],["icon ion-star"],["icon ion-star"],["icon ion-star"]];
           this.setState({ 
             conditionStarRatingArray: [["icon ion-star"],["icon ion-star"],["icon ion-star"],["icon ion-star"],["icon ion-star"]] 
           });

         for(var i=0; i<=index; i++) {
           locStarRatingArray[i] =  ["icon ion-star active"];
           
         }
         this.setState({ 
             conditionStarRatingArray: locStarRatingArray
           });

      this.questionnaireObj.pCondition = index+1;
  }

  landlordRepairResponsiveStarSelected(index){

 var locStarRatingArray=[["icon ion-star"],["icon ion-star"],["icon ion-star"],["icon ion-star"],["icon ion-star"]];
        this.setState({ 
          landlordRepairResponsiveStarArray: [["icon ion-star"],["icon ion-star"],["icon ion-star"],["icon ion-star"],["icon ion-star"]] 
        });

      for(var i=0; i<=index; i++) {
        locStarRatingArray[i] =  ["icon ion-star active"];
        
      }
      this.setState({ 
          landlordRepairResponsiveStarArray: locStarRatingArray
        });

      this.questionnaireObj.lrResponsive = index+1;
  }

  landlordGeneralResponsiveStarSelected(index){

 var locStarRatingArray=[["icon ion-star"],["icon ion-star"],["icon ion-star"],["icon ion-star"],["icon ion-star"]];
        this.setState({ 
          landlordGeneralResponsiveStarArray: [["icon ion-star"],["icon ion-star"],["icon ion-star"],["icon ion-star"],["icon ion-star"]] 
        });

      for(var i=0; i<=index; i++) {
        locStarRatingArray[i] =  ["icon ion-star active"];
        
      }
      this.setState({ 
          landlordGeneralResponsiveStarArray: locStarRatingArray
        });
      this.questionnaireObj.lResponsive = index+1;
  }

  starSelected(index){
    this.starOptionSelected = true;
        var locStarRatingArray=[["icon ion-star"],["icon ion-star"],["icon ion-star"],["icon ion-star"],["icon ion-star"]];
        this.setState({ 
          starRatingArray: [["icon ion-star"],["icon ion-star"],["icon ion-star"],["icon ion-star"],["icon ion-star"]] 
        });

      for(var i=0; i<=index; i++) {
        locStarRatingArray[i] =  ["icon ion-star active"];
        
      }
      this.setState({ 
          starRatingArray: locStarRatingArray
        });
      this.questionnaireObj.lpExperience = index+1;
  }

  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
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

  handleSubmitQuestionnaire = event =>{
    var jsonObj = this.formQuestionnaireObject();

    this.postQuestionnaireService(jsonObj);
    signOutUser();
    sessionStorage.setItem('landlordObject', null);
    this.userHasAuthenticated(false);
    ReactGA.event({
            category: 'Navigation',
            action: 'Logout',
        });
    this.props.history.push("/");
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

  postQuestionnaireService(json){

    var jsonReqObj = JSON.stringify(json);
    try{
      fetch('https://h1zwqvevl5.execute-api.us-east-1.amazonaws.com/prod/Vent.Rent/questionnaire', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: jsonReqObj,
    }).then((response) => {
                   return response.json();
               })
    .then((json) => {
          console.log('questionnaire post success '+JSON.stringify(json));
      })
      .catch((err) => {
        console.log('There was an error:' + err);alert("questionnaire post error");
      })
        } catch (e) {
                console.log('There was an error:'+e); 
                alert("Landlord error");
        }
  }


  navigateToHomeScreen = event => {
    ReactGA.event({
            category: 'Navigation',
            action: 'Home Screen',
        });
    this.props.history.push("/home");
  }

  navigateToLandLordScreen = event => {
    ReactGA.event({
            category: 'Navigation',
            action: 'Landlord Screen',
        });
    this.props.history.push("/landlord");
  }

  moreDetails = event => {
    if(this.validateForm()){
      ReactGA.event({
            category: 'Navigation',
            action: 'Questionnaire part 2',
        });
      this.props.history.push("/questionnaire2");
    } else {
      alert("Please complete all fields");
    }
  }

  formQuestionnaireObject(){
    var json = {};
    if(this.reviewType == "L"){
      json = {
           "landlordID":this.landlordObj.landlordId ? this.landlordObj.landlordId : "",
           "tenant_id":3,
           "Q_Type":"L",
           "LL_Q_Title":this.questionnaireObj.lpReviewTitle?this.questionnaireObj.lpReviewTitle:"",
           "LL_Q_Advice":this.questionnaireObj.lAdvice?this.questionnaireObj.lAdvice:"",
           "LL_Q_Con":this.questionnaireObj.lpCons?this.questionnaireObj.lpCons:"",
           "LL_Q_Pro":this.questionnaireObj.lpPros?this.questionnaireObj.lpPros:"",
           "LL_Q_Current_Renting": this.questionnaireObj.lpCurrentRenting?this.questionnaireObj.lpCurrentRenting:"",
           "LL_Q_Overall_Experience":this.questionnaireObj.lpExperience?this.questionnaireObj.lpExperience:"",
           "Q_Movein_Date":this.questionnaireObj.lpMoveInDate?this.questionnaireObj.lpMoveInDate:"",
           "Q_Moveout_Date":this.questionnaireObj.lpMoveOutDate?this.questionnaireObj.lpMoveOutDate:"",
           "LL_Q_Recommend_Landlord": this.questionnaireObj.lpRecommend?this.questionnaireObj.lpRecommend:"",
           "Q_LL_Response": this.questionnaireObj.lResponsive?this.questionnaireObj.lResponsive:""
      }
    }else{
      json = {
           "propertyID":2,
            "Q_Type":"P",
           "Q_Title":this.questionnaireObj.lpReviewTitle?this.questionnaireObj.lpReviewTitle:"",
           "P_Q_Con":this.questionnaireObj.lpCons?this.questionnaireObj.lpCons:"",
           "P_Q_Pro":this.questionnaireObj.lpPros?this.questionnaireObj.lpPros:"",
           "P_Q_Current_Renting": this.questionnaireObj.lpCurrentRenting?this.questionnaireObj.lpCurrentRenting:"",
           "P_Q_Overall_Experience":this.questionnaireObj.lpExperience?this.questionnaireObj.lpExperience:"",
           "Q_Movein_Date":this.questionnaireObj.lpMoveInDate?this.questionnaireObj.lpMoveInDate:"",
           "Q_Moveout_Date":this.questionnaireObj.lpMoveOutDate?this.questionnaireObj.lpMoveOutDate:"",
           "P_Q_Recommend_Property": this.questionnaireObj.lpRecommend?this.questionnaireObj.lpRecommend:"",
           "P_Q_Property_Photos": this.questionnaireObj.ppPhotos?this.questionnaireObj.ppPhotos:"",
           "P_Q_Condition_Listing": this.questionnaireObj.pCondition?this.questionnaireObj.pCondition:"",
           "P_Q_Application_Fee_Required": this.questionnaireObj.pApplicationFeeReq?this.questionnaireObj.pApplicationFeeReq:"",
           "P_Q_Rental_Rate": this.questionnaireObj.pMonthlyRent?this.questionnaireObj.pMonthlyRent:"",
           "P_Q_Security_Required": this.questionnaireObj.pSecurityDepositReq?this.questionnaireObj.pSecurityDepositReq:"",
           "P_Q_RR_Increase": this.questionnaireObj.pRentIncrease?this.questionnaireObj.pRentIncrease:"",
           "P_Q_General_Issues": this.questionnaireObj.pGeneralIssues?this.questionnaireObj.pGeneralIssues:"",
           "P_Q_Insurance": this.questionnaireObj.pRentalInsuranceReq?this.questionnaireObj.pRentalInsuranceReq:"",

      }
    }
    return json;
  }

  componentDidMount () {
      window.scrollTo(0, 0)
  }

  render() {

    let {imagePreviewUrl} = this.state;
    let $imagePreview = null;
    let {issueImagePreviewUrl} = this.state;
    let $issueImagePreview = null;

    if (imagePreviewUrl) {
      $imagePreview = (<img src={imagePreviewUrl} alt="Image of User's review property"/>);
    } else {
      // $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
    }

    if (issueImagePreviewUrl) {
      $issueImagePreview = (<img src={issueImagePreviewUrl} alt="Image of User's review property having an issue" />);
    } else {
      // $issueImagePreview = (<div className="previewText">Please select an Image for Preview</div>);
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
            <li class="nav-item"><a href="#" class="nav-link" onClick={this.handleLogout.bind(this)}>Logout</a></li>
          </ul>
        </div>
      </div>
    </div>

      <div class="pd-t-10 pd-b-50">
        <div class="container">
          <nav aria-label="breadcrumb" role="navigation">
            <ol class="breadcrumb bg-transparent pd-x-0 tx-13">
              <li class="breadcrumb-item"><a href="#" onClick={this.navigateToHomeScreen}>Home</a></li>
              <li class="breadcrumb-item"><a href="#" onClick={this.navigateToLandLordScreen}>Landlords</a></li>
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

              <div class="form-group">
                <label>{this.moveInQuestion}</label>
                <div class="row">
                  <div class="col-9 col-sm-6 col-md-5">
                    <div class="input-group">
                      <span class="input-group-addon"><i class="icon ion-calendar"></i></span>
                      <DatePicker
                          onChange={this.handleMoveInDateChange}
                          selected={this.state.lpMoveInDate}
                      />
                    </div>
                  </div>
                  <div class="col-9 col-sm-6 col-md-5 mg-t-10 mg-sm-t-0">
                    <div class="input-group">
                      <span class="input-group-addon"><i class="icon ion-calendar"></i></span>
                      <DatePicker
                          onChange={this.handleMoveOutDateChange}
                          selected={this.state.lpMoveOutDate}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div class="form-group">
                <label class="ckbox mg-t-15">
                <input name="ckbox1" type="checkbox" checked={this.state.rentingCheckBox} onChange={this.handleRentingCheckBoxChange.bind(this)} />
                <span>Currently Renting</span>
              </label>
              </div>

                <div class="form-group">
                <label>{this.overallExpQuestion}</label>
                <div class="landlord-rating-star">
                    <i onClick={this.starSelected.bind(this,0)} className={this.state.starRatingArray[0].join('' )}></i>
                    <i onClick={this.starSelected.bind(this,1)} className={this.state.starRatingArray[1].join('' )}></i>
                    <i onClick={this.starSelected.bind(this,2)} className={this.state.starRatingArray[2].join('' )}></i>
                    <i onClick={this.starSelected.bind(this,3)} className={this.state.starRatingArray[3].join('' )}></i>
                    <i onClick={this.starSelected.bind(this,4)} className={this.state.starRatingArray[4].join('' )}></i>
                  </div>
                </div>

                <div class="form-group">
                  <label>{this.recommendQuestion}</label>
                  <div class="d-flex align-items-center mg-t-10" onChange={this.handleRecommendInputChange.bind(this)}>
                    <label class="rdiobox mg-r-20">
                      <input name="rdio3" type="radio" value="yes" />
                      <span>Yes</span>
                    </label>
                    <label class="rdiobox">
                      <input name="rdio3" type="radio" value="no" />
                      <span>No</span>
                    </label>
                  </div>
                </div>


                <div class="form-group">
                <label>Write a title for your review</label>
                  <input type="text" class="form-control" placeholder="Summarize your experience to the landlord" 
                  value={this.questionnaireObj.lpReviewTitle} onChange={ this.handleTitleInputChange.bind(this)} />
                </div>

                <div class="form-group">
                  <label>{this.prosQuestion}</label>
                  <textarea class="form-control" rows="3" placeholder="Write some pros" value={this.questionnaireObj.lpPros} onChange={ this.handleProsInputChange.bind(this)}></textarea>
                </div>

                <div class="form-group">
                  <label>{this.consQuestion}</label>
                  <textarea class="form-control" rows="3" placeholder="Write some cons" value={this.questionnaireObj.lpCons} onChange={ this.handleConsInputChange.bind(this)}></textarea>
                </div>

                <div class="form-group" className={this.propertyQuestionStyle.join('')}>
                  <label>What advice would you give this landlord?</label>
                  <textarea class="form-control" rows="3" placeholder="Give your landlord advice for the future" value={this.questionnaireObj.lAdvice} onChange={ this.handleAdviceInputChange.bind(this)}></textarea>
                </div>

                 <div class="form-group" className={this.propertyQuestionStyle.join('')}>
                  <label>Rate how responsive your landlord was to your questions and concerns.</label>
                <div class="landlord-rating-star">
                    <i onClick={this.landlordGeneralResponsiveStarSelected.bind(this,0)} className={this.state.landlordGeneralResponsiveStarArray[0].join('' )}></i>
                    <i onClick={this.landlordGeneralResponsiveStarSelected.bind(this,1)} className={this.state.landlordGeneralResponsiveStarArray[1].join('' )}></i>
                    <i onClick={this.landlordGeneralResponsiveStarSelected.bind(this,2)} className={this.state.landlordGeneralResponsiveStarArray[2].join('' )}></i>
                    <i onClick={this.landlordGeneralResponsiveStarSelected.bind(this,3)} className={this.state.landlordGeneralResponsiveStarArray[3].join('' )}></i>
                    <i onClick={this.landlordGeneralResponsiveStarSelected.bind(this,4)} className={this.state.landlordGeneralResponsiveStarArray[4].join('' )}></i>
                  </div>
                </div>

                <div class="form-group" className={this.landlordQuestionStyle.join('')}>
                  <label class="d-block mg-b-15">Share photos of this property</label>
                

                 <div className="previewComponent">
                    <form onSubmit={(e)=>this.handleImageUploaded(e)}>
                    <input className="fileInput" 
                      type="file" 
                      onChange={(e)=>this.handleImageChange(e)} />
                    </form>
                  <div className="imgPreview">
                    {$imagePreview}
                  </div>
                </div>
              </div>

                <div class="form-group" className={this.landlordQuestionStyle.join('')}>
                  <label>What was the condition of the property compared to the listing?</label>
                <div class="landlord-rating-star">
                    <i onClick={this.conditionStarSelected.bind(this,0)} className={this.state.conditionStarRatingArray[0].join('' )}></i>
                    <i onClick={this.conditionStarSelected.bind(this,1)} className={this.state.conditionStarRatingArray[1].join('' )}></i>
                    <i onClick={this.conditionStarSelected.bind(this,2)} className={this.state.conditionStarRatingArray[2].join('' )}></i>
                    <i onClick={this.conditionStarSelected.bind(this,3)} className={this.state.conditionStarRatingArray[3].join('' )}></i>
                    <i onClick={this.conditionStarSelected.bind(this,4)} className={this.state.conditionStarRatingArray[4].join('' )}></i>
                  </div>
                </div>

                <div class="form-group" className={this.landlordQuestionStyle.join('')}>
                <label>Did the landlord require an application fee?</label>
                <div class="d-flex align-items-center mg-t-10" onChange={this.handleApplicationFeeInputChange.bind(this)}>
                  <label class="rdiobox mg-r-20">
                    <input name="rdio4" type="radio" value="yes" />
                    <span>Yes</span>
                  </label>
                  <label class="rdiobox">
                    <input name="rdio4" type="radio" value="no" />
                    <span>No</span>
                  </label>
                </div>
              </div>

              <div class="form-group" className={this.landlordQuestionStyle.join('')}>
                <label>How much did you pay monthly for rent?</label>
                <input type="text" class="form-control wd-300" placeholder="Enter amount" 
                value={this.questionnaireObj.pMonthlyRent} onChange={ this.handleMonthlyRentInputChange.bind(this)}/>
              </div>

              <div class="form-group" className={this.landlordQuestionStyle.join('')}>
                <label>Did your property require a security deposit?</label>
                <div class="d-flex align-items-center mg-t-10" onChange={this.handleSecurityDepositInputChange.bind(this)}>
                  <label class="rdiobox mg-r-20">
                    <input name="rdio5" type="radio" value="yes" />
                    <span>Yes</span>
                  </label>
                  <label class="rdiobox">
                    <input name="rdio5" type="radio" value="no" />
                    <span>No</span>
                  </label>
                </div>
              </div>

              <div class="form-group" className={this.landlordQuestionStyle.join('')}>
                <label>Did your rent increase while you were living at this property?</label>
                <div class="d-flex align-items-center mg-t-10" onChange={this.handleRentIncreaseInputChange.bind(this)}>
                  <label class="rdiobox mg-r-20">
                    <input name="rdio6" type="radio" value="yes" />
                    <span>Yes</span>
                  </label>
                  <label class="rdiobox">
                    <input name="rdio6" type="radio" value="no"/>
                    <span>No</span>
                  </label>
                </div>
              </div>

              <div class="form-group" className={this.landlordQuestionStyle.join('')}>
                <label>Were there general issues with the property?</label>
                <div class="d-flex align-items-center mg-t-10" onChange={this.handleGeneralIssuesInputChange.bind(this)}>
                  <label class="rdiobox mg-r-20">
                    <input name="rdio7" type="radio" value="yes" />
                    <span>Yes</span>
                  </label>
                  <label class="rdiobox">
                    <input name="rdio7" type="radio" value="no" />
                    <span>No</span>
                  </label>
                </div>
              </div>

              <div class="form-group" className={this.landlordQuestionStyle.join('')}>
                <label>Did the landlord require rental insurance?</label>
                <div class="d-flex align-items-center mg-t-10" onChange={this.handleRentalInsuranceInputChange.bind(this)}>
                  <label class="rdiobox mg-r-20">
                    <input name="rdio8" type="radio" value="yes" />
                    <span>Yes</span>
                  </label>
                  <label class="rdiobox">
                    <input name="rdio8" type="radio" value="no" />
                    <span>No</span>
                  </label>
                </div>
              </div>

              <div class="form-group-footer">
                                <button class="btn btn-primary" onClick={this.handleSubmitQuestionnaire.bind(this)}>Submit Review</button>
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