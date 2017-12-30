import React, { Component } from "react";
import "jquery";

import "./Home.css";
import "../libs/font-awesome/css/font-awesome.css";
import "../libs/Ionicons/css/ionicons.css";
import "../libs/select2/css/select2.min.css";
import { signOutUser } from "../libs/awsLib";
import ReactGA from 'react-ga';

export default class Questionnaire1 extends Component {
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
      imagePreviewUrl: ''
    };

    this.headerpanelClass = ["headerpanel-right d-lg-block d-none"];
    this.headerOption = true;
    this.starOptionSelected = false;

    this.starRatingArray = [["icon ion-star"],["icon ion-star"],["icon ion-star"],["icon ion-star"],["icon ion-star"]];

  }

  handleImageUploaded(e) {
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
  starSelected(index){
    this.starOptionSelected = true;
    this.starRatingArray = [["icon ion-star"],["icon ion-star"],["icon ion-star"],["icon ion-star"],["icon ion-star"]];
      for(var i=0; i<=index; i++) {
        this.starRatingArray[i]=["icon ion-star filled"];
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
    if (imagePreviewUrl) {
      $imagePreview = (<img src={imagePreviewUrl} />);
    } else {
      // $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
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

                <div class="form-group">
                  <label>Are you a current or previous renter?</label>
                  <div class="d-flex align-items-center mg-t-10">
                    <label class="rdiobox mg-r-20">
                      <input name="rdio" type="radio" checked />
                      <span>Previous</span>
                    </label>
                    <label class="rdiobox">
                      <input name="rdio" type="radio" />
                      <span>Current</span>
                    </label>
                  </div>
                </div>
                <div class="form-group">
                  <label>How was your overall experience working with this landlord?</label>
                  <div class="lh-5 tx-24">
                    <a href="#" onClick={this.starSelected.bind(this,0)}><i className={this.starRatingArray[0].join('' )}></i></a>
                    <a href="#" onClick={this.starSelected.bind(this,1)}><i className={this.starRatingArray[1].join('' )}></i></a>
                    <a href="#" onClick={this.starSelected.bind(this,2)}><i className={this.starRatingArray[2].join('' )}></i></a>
                    <a href="#" onClick={this.starSelected.bind(this,3)}><i className={this.starRatingArray[3].join('' )}></i></a>
                    <a href="#" onClick={this.starSelected.bind(this,4)}><i className={this.starRatingArray[4].join('' )}></i></a>
                  </div>
                </div>

                <div class="form-group">
                  <label>Title of your review</label>
                  <input type="text" class="form-control" placeholder="Summarize your experience to the landlord" />
                </div>

                <div class="form-group">
                  <label>What are some pros of the property?</label>
                  <textarea class="form-control" rows="3" placeholder="Write some pros about the property"></textarea>
                </div>

                <div class="form-group">
                  <label>What are some cons of the property?</label>
                  <textarea class="form-control" rows="3" placeholder="Write some cons about the property"></textarea>
                </div>

                <div class="form-group">
                  <label>What advice would you give the landlord?</label>
                  <textarea class="form-control" rows="3" placeholder="Write some advice to landlord"></textarea>
                </div>

                <div class="form-group">
                  <label>Do you approve this landlord?</label>
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
                  <label class="d-block mg-b-15">Do you have photos to share? (optional)</label>
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

                <hr />

                <div class="form-group tx-12">
                  Upon submission of this review, you certify that this review is based on my own experience and is my genuine opinion of the landlord and it's property and that I have no personal or business relationship with this landlord, and have not been offered any incentive or payment originating from the establishment to write this review
                </div>

                <div class="form-group-footer">
                  <button class="btn btn-success" onClick={this.moreDetails}>Save &amp; Continue</button>
                  <button class="btn btn-primary" onClick={this.handleLogout}>Submit anyway</button>
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