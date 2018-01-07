import React, { Component } from "react";
import "jquery";

import "./Home.css";
import "../libs/font-awesome/css/font-awesome.css";
import "../libs/Ionicons/css/ionicons.css";
import "../libs/select2/css/select2.min.css";
import { signOutUser } from "../libs/awsLib";
import DatePicker from 'react-datepicker';
import moment from 'moment';
import ReactGA from 'react-ga';

export default class QuestionnaireProperty1 extends Component {
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
      file: '',
      imagePreviewUrl: '',
      issueImagePreviewUrl: '',
      moveInDate: moment(),
      moveOutDate:moment(),
      leaseDate:moment(),
      securityDepositDate:moment(),
      increaseDate:moment(),
      expiredCheckBox: false,
      disableLeaseExpireDate: false
    };

    this.headerpanelClass = ["headerpanel-right d-lg-block d-none"];
    this.headerOption = true;
    this.starOptionSelected = false;

    this.starRatingArray = [["icon ion-star"],["icon ion-star"],["icon ion-star"],["icon ion-star"],["icon ion-star"]];
    this.conditionStarRatingArray = [["icon ion-star"],["icon ion-star"],["icon ion-star"],["icon ion-star"],["icon ion-star"]];

    this.previousButtonStyle = ["btn btn-primary"];
    this.currentButtonStyle = ["btn btn-primary"];
    this.landlordReviewButtonStyle = ["btn btn-primary"];
    this.propertyReviewButtonStyle = ["btn btn-primary"];
  }

  handleCheckBoxChange(e){
    const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
          [name]: value
        });
        if(!value){
          disableLeaseExpireDate = true;
        }
  }

  currentButtonSelected(option) {
    this.previousButtonStyle = ["btn btn-primary"];
    this.currentButtonStyle = ["btn btn-primary"];
    if(option == "current"){
      this.previousButtonStyle = ["btn btn-primary"];
      this.currentButtonStyle = ["btn btn-primary active"];
    } else {
      this.previousButtonStyle = ["btn btn-primary active"];
      this.currentButtonStyle = ["btn btn-primary"];
    }
  }

  reviewTypeButtonSelected(option) {
    this.landlordReviewButtonStyle = ["btn btn-primary"];
    this.propertyReviewButtonStyle = ["btn btn-primary"];
    if(option == "landlord"){
      this.landlordReviewButtonStyle = ["btn btn-primary active"];
    this.propertyReviewButtonStyle = ["btn btn-primary"];
    } else {
      this.landlordReviewButtonStyle = ["btn btn-primary"];
          this.propertyReviewButtonStyle = ["btn btn-primary active"];
    }
  }

  handleImageUploaded(e) {
    e.preventDefault();
    // TODO: do something with -> this.state.file
    console.log('handle uploading-', this.state.file);
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
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    }
        reader.readAsDataURL(file)
  }

  handleIssueImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        issueImagePreviewUrl: reader.result
      });
    }
        reader.readAsDataURL(file)
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

  handleIncreaseDateChange = date => {
    this.setState({ increaseDate:date })
  }

  conditionStarSelected(index){
    this.conditionStarRatingArray = [["icon ion-star"],["icon ion-star"],["icon ion-star"],["icon ion-star"],["icon ion-star"]];
      for(var i=0; i<=index; i++) {
        this.conditionStarRatingArray[i]=["icon ion-star active"];
      }
  }

  starSelected(index){
    this.starOptionSelected = true;
    this.starRatingArray = [["icon ion-star"],["icon ion-star"],["icon ion-star"],["icon ion-star"],["icon ion-star"]];
      for(var i=0; i<=index; i++) {
        this.starRatingArray[i]=["icon ion-star active"];
      }
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

  componentDidMount () {
      window.scrollTo(0, 0)
  }

  render() {

    let {imagePreviewUrl} = this.state;
    let $imagePreview = null;
    let {issueImagePreviewUrl} = this.state;
    let $issueImagePreview = null;

    if (imagePreviewUrl) {
      $imagePreview = (<img src={imagePreviewUrl} />);
    } else {
      // $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
    }

    if (issueImagePreviewUrl) {
      $issueImagePreview = (<img src={issueImagePreviewUrl} />);
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
                <label>Would you like to review a landlord's performance or the rental property?</label>
                <div class="btn-group">
                  <button class="btn btn-primary" onClick={this.reviewTypeButtonSelected.bind(this,"current")}
                   className={this.landlordReviewButtonStyle.join('' )}>Landlord</button>
                  <button class="btn btn-primary" onClick={this.reviewTypeButtonSelected.bind(this,"current")}
                   className={this.propertyReviewButtonStyle.join('' )}>Property</button>
                </div>
              </div>

                <div class="form-group">
                <label>Are you a current or former renter?</label>
                <div class="btn-group">
                  <button class="btn btn-primary" onClick={this.currentButtonSelected.bind(this,"current")}
                   className={this.currentButtonStyle.join('' )}>Current</button>
                  <button class="btn btn-primary" onClick={this.currentButtonSelected.bind(this,"previous")}
                   className={this.previousButtonStyle.join('' )}>Previous</button>
                </div>
              </div>

                <div class="form-group">
                <label>How was your overall experience living at this property?</label>
                <div class="landlord-rating-star">
                    <a href="#" onClick={this.starSelected.bind(this,0)}><i className={this.starRatingArray[0].join('' )}></i></a>
                    <a href="#" onClick={this.starSelected.bind(this,1)}><i className={this.starRatingArray[1].join('' )}></i></a>
                    <a href="#" onClick={this.starSelected.bind(this,2)}><i className={this.starRatingArray[2].join('' )}></i></a>
                    <a href="#" onClick={this.starSelected.bind(this,3)}><i className={this.starRatingArray[3].join('' )}></i></a>
                    <a href="#" onClick={this.starSelected.bind(this,4)}><i className={this.starRatingArray[4].join('' )}></i></a>
                  </div>
                </div>

                <div class="form-group">
                  <label>Would you recommend this property to friends?</label>
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
                <label>Write a title for your review</label>
                  <input type="text" class="form-control" placeholder="Summarize your experience to the landlord" />
                </div>

                <div class="form-group">
                  <label>What are some pros of the property?</label>
                  <textarea class="form-control" rows="3" placeholder="Write some pros"></textarea>
                </div>

                <div class="form-group">
                  <label>What are some cons of the property?</label>
                  <textarea class="form-control" rows="3" placeholder="Write some cons"></textarea>
                </div>

                <div class="form-group">
                  <label class="d-block mg-b-15">Share photos of this property</label>
                </div>

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

                <div class="form-group">
                  <label>What was the time period you lived in this rental?</label>
                  <div class="row">
                    <div class="col-9 col-sm-6 col-md-5">
                      <div class="input-group">
                        <span class="input-group-addon"><i class="icon ion-calendar"></i></span>
                        <DatePicker
                            onChange={this.handleMoveInDateChange}
                            selected={this.state.moveInDate}
                        />
                      </div>
                    </div>
                    <div class="col-9 col-sm-6 col-md-5 mg-t-10 mg-sm-t-0">
                      <div class="input-group">
                        <span class="input-group-addon"><i class="icon ion-calendar"></i></span>
                        <DatePicker
                            onChange={this.handleMoveOutDateChange}
                            selected={this.state.moveOutDate}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div class="form-group">
                  <label>What was the condition of the property compared to the listing?</label>
                <div class="landlord-rating-star">
                    <a href="#" onClick={this.conditionStarSelected.bind(this,0)}><i className={this.conditionStarRatingArray[0].join('' )}></i></a>
                    <a href="#" onClick={this.conditionStarSelected.bind(this,1)}><i className={this.conditionStarRatingArray[1].join('' )}></i></a>
                    <a href="#" onClick={this.conditionStarSelected.bind(this,2)}><i className={this.conditionStarRatingArray[2].join('' )}></i></a>
                    <a href="#" onClick={this.conditionStarSelected.bind(this,3)}><i className={this.conditionStarRatingArray[3].join('' )}></i></a>
                    <a href="#" onClick={this.conditionStarSelected.bind(this,4)}><i className={this.conditionStarRatingArray[4].join('' )}></i></a>
                  </div>
                </div>

                <div class="form-group">
                <label>Did the landlord require an application fee?</label>
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
                <label>If the landlord did require an application fee, how much was the fee?</label>
                <input type="text" class="form-control wd-300" placeholder="Enter amount" />
              </div>

              <div class="form-group">
                <label>How much did you pay monthly for rent?</label>
                <input type="text" class="form-control wd-300" placeholder="Enter amount" />
              </div>

              <div class="form-group">
                <label>Did your property require a security deposit?</label>
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
              </div>

              <div class="form-group">
                <label>What was the dollar amount of your security deposit?</label>
                <input type="text" class="form-control wd-300" placeholder="Enter amount" />
              </div>

              <div class="form-group">
                <label>What was the dollar amount you received back from your security deposit?</label>
                <input type="text" class="form-control wd-300" placeholder="Enter amount" />
              </div>

              <div class="form-group">
                <label>What date did you receive your security deposit back?</label>
                <div class="input-group wd-250">
                  <span class="input-group-addon"><i class="icon ion-calendar"></i></span>
                  <DatePicker
                      onChange={this.handleSecurityDepositDateDateChange}
                      selected={this.state.securityDepositDate}
                  />
                </div>
              </div>

              <div class="form-group">
                <label>What date does your lease expire?</label>
                <div class="input-group wd-250">
                  <span class="input-group-addon"><i class="icon ion-calendar"></i></span>
                  <DatePicker
                      onChange={this.handleLeaseDateChange}
                      selected={this.state.leaseDate}
                      disabled={this.disableLeaseExpireDate}
                  />
                </div>
                <label class="ckbox mg-t-15">
                  <input name="ckbox1" type="checkbox" checked={this.state.expiredCheckBox} onChange={this.handleCheckBoxChange} />
                  <span>My lease has already expired</span>
                </label>
              </div>

              <div class="form-group">
                <label>Did your rent increase while you were living at this property?</label>
                <div class="d-flex align-items-center mg-t-10">
                  <label class="rdiobox mg-r-20">
                    <input name="rdio6" type="radio" checked />
                    <span>Yes</span>
                  </label>
                  <label class="rdiobox">
                    <input name="rdio6" type="radio" />
                    <span>No</span>
                  </label>
                </div>
              </div>

              <div class="form-group">
                <label>What was the date of your increase?</label>
                <div class="input-group wd-250">
                  <span class="input-group-addon"><i class="icon ion-calendar"></i></span>
                  <DatePicker
                      onChange={this.handleIncreaseDateChange}
                      selected={this.state.increaseDate}
                  />
                </div>
              </div>

              <div class="form-group">
                <label>What was the monthly amount of your increase?</label>
                <input type="text" class="form-control wd-300" placeholder="Enter amount" />
              </div>

              <div class="form-group">
                <label>Were there general issues with the property?</label>
                <div class="d-flex align-items-center mg-t-10">
                  <label class="rdiobox mg-r-20">
                    <input name="rdio7" type="radio" checked />
                    <span>Yes</span>
                  </label>
                  <label class="rdiobox">
                    <input name="rdio7" type="radio" />
                    <span>No</span>
                  </label>
                </div>
              </div>

              <div class="form-group">
                <label>Do you have photos of those issues?</label>
                <div className="previewComponent">
                  <form onSubmit={(e)=>this.handleIssueImageUploaded(e)}>
                  <input className="fileInput" 
                    type="file" 
                    onChange={(e)=>this.handleIssueImageChange(e)} />
                  </form>
                <div className="imgPreview">
                  {$issueImagePreview}
                </div>
              </div>
              </div>

              <div class="form-group">
                <label>Did the landlord require rental insurance?</label>
                <div class="d-flex align-items-center mg-t-10">
                  <label class="rdiobox mg-r-20">
                    <input name="rdio8" type="radio" checked />
                    <span>Yes</span>
                  </label>
                  <label class="rdiobox">
                    <input name="rdio8" type="radio" />
                    <span>No</span>
                  </label>
                </div>
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