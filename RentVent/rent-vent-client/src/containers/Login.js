import React, { Component } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import SocialButton from "../components/SocialButton";
import SocialButton2 from "../components/SocialButton2";
import config from "../config";
import { CognitoUserPool, AuthenticationDetails, CognitoUser } from "amazon-cognito-identity-js";
import "./Login.css";
import ReactGA from 'react-ga';
import {SocialLoginModel} from '../models/SocialLoginModel';
import AWS from "aws-sdk";
import {LandlordModel} from '../models/LandlordModel';
import {ComplaintsModel} from '../models/ComplaintsModel';
import {DisputesModel} from '../models/DisputesModel';
import {PropertyModel} from '../models/PropertyModel';
import {LandlordReviewModel} from '../models/LandlordReviewModel';
import {TenantModel} from '../models/TenantModel';

import "../libs/font-awesome/css/font-awesome.css";
import "../libs/Ionicons/css/ionicons.css";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      email: "",
      password: ""
    };
    this.myProps = props;
    this.socialLoginUser = "";

    sessionStorage.setItem('landlordObject', null);

    ReactGA.initialize('UA-111517732-2');
    ReactGA.pageview(window.location.pathname + window.location.search);
    ReactGA.set({ userId: 123 });


  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleSignup = event => {
    ReactGA.event({
            category: 'Navigation',
            action: 'Sign Up',
        });
    this.props.history.push("/signup");
  }

  navigateToHomeScreen(self) {
    // this.postTenantLogin();
   sessionStorage.setItem('userLoggedIn', 'true');
   self.props.history.push("/home");
  }

  postSocialLogin = self =>{
    this.postSocialTenantLogin(self);
    // navigateToHomeScreen(self);
  }

  postLogin = self =>{
    this.postTenantLogin(self);
  }

  postTenantLogin = self => {
    var jsonObj = this.formLoginObject();
    this.postTenantService(self,jsonObj);
  }

  postSocialTenantLogin = self => {
    var jsonObj = this.formTenantObject(this.socialLoginUser);
    this.postTenantService(self,jsonObj);
  }
  
  postTenantService(self,jsonObj){
    const GATEWAY_URL = config.apis.TENANT_POST;

    var jsonReqObj = JSON.stringify(jsonObj);
    try{
      fetch(GATEWAY_URL, {
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
          if(json && !json.statusCode){
            console.log('tenant post success '+json);
            sessionStorage.setItem('tenantID', json);
            self.navigateToHomeScreen(self);
          } else {
            alert("Login error - "+json.message);
            // temp flow
            self.navigateToHomeScreen(self);
          }
         
      })
      .catch((err) => {
        console.log('There was an error:' + err);alert("tenant post error");
      })
        } catch (e) {
                console.log('There was an error:'+e); 
                alert("tenant post error");
        }
  }

  formTenantObject(socialLoginUser){
    var json = {};
      json = {
           "T_ID":this.socialLoginUser.tsid ? this.socialLoginUser.tsid : "",
           "Anonymous":"oo",
           "FirstName":this.socialLoginUser.tsfirstName ? this.socialLoginUser.tsfirstName : "",
           "LastName":this.socialLoginUser.tslastName ? this.socialLoginUser.tslastName : "",
           "Phone":this.socialLoginUser.tsPhone ? this.socialLoginUser.tsPhone : "",
           "AddressLine1":this.socialLoginUser.tsAddressLine1 ? this.socialLoginUser.tsAddressLine1 : "",
           "AddressLine2":this.socialLoginUser.tsAddressLine2 ? this.socialLoginUser.tsAddressLine2 : "",
           "Zipcode":this.socialLoginUser.tsZipcode ? this.socialLoginUser.tsZipcode : "",
           "City":this.socialLoginUser.tsCity ? this.socialLoginUser.tsCity : "",
           "State":this.socialLoginUser.tsState ? this.socialLoginUser.tsState : "",
           "Country":this.socialLoginUser.tsCountry ? this.socialLoginUser.tsCountry : "",
           "T_Profile_Pic_URL":this.socialLoginUser.tsprofilePicURL ? this.socialLoginUser.tsprofilePicURL : "",
           "CreatedOn":this.socialLoginUser.tsCreatedOn ? this.socialLoginUser.tsCreatedOn : "",
           "UpdatedOn":this.socialLoginUser.tsUpdatedOn ? this.socialLoginUser.tsUpdatedOn : "",
           "Email_ID": this.socialLoginUser.tsemail ? this.socialLoginUser.tsemail : ""
      }
    return json;
  }

  formLoginObject(){
    var json = {};
    json = {
         "T_ID":this.state.email? this.state.email: ""
    }
  return json;
  }

  handlePrivacyPolicy = event => {
    ReactGA.event({
            category: 'Navigation',
            action: 'Privacy Policy',
        });
    this.props.history.push("/privacypolicy");
  }

  handleTermsofUse = event => {
    ReactGA.event({
            category: 'Navigation',
            action: 'Terms of Use',
        });
    this.props.history.push("/termsofuse");
  }

  handleSiteMap = event => {
    ReactGA.event({
            category: 'Navigation',
            action: 'Site Map',
        });
    this.props.history.push("/sitemap");
  }

  handleKeyPress = (event) => {
    if(event.key == 'Enter'){
      if(this.validateForm()){
        this.handleSubmit(event);
      }
    }
  }

  handleSocialLogin = (user) => {
      var socUser = this.formSocialUserObj(user);
      this.socialLoginUser = socUser;

      var userToken;
      var socialLoginType;
      if(user.token.idToken){
               userToken = user.token.idToken;
               socialLoginType = "google";
               ReactGA.event({
                category: 'Social Login',
                action: 'Google',
              });
            } else {
              userToken = user.token.accessToken;
               socialLoginType = "fb";
               ReactGA.event({
                category: 'Social Login',
                action: 'Facebook',
              });
            }

    AWS.config.region = 'us-east-1';
    var params;
    if(socialLoginType == "fb"){
        AWS.config.credentials = new AWS.WebIdentityCredentials({
        RoleArn: 'arn:aws:iam::337562365152:role/fbRole_nonProd',
        ProviderId: 'graph.facebook.com', 
        WebIdentityToken: userToken
    });

   AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                 IdentityPoolId : config.cognito.IDENTITY_POOL_ID, // your identity pool id here
                 AccountId: '337562365152',
                 Logins : {
                     'graph.facebook.com' : userToken
                 }
             });
    params = {
                IdentityPoolId: config.cognito.IDENTITY_POOL_ID, /* required */
                AccountId: '337562365152',
                Logins: {
                     'graph.facebook.com' : userToken
                 }
               };

    } else {
        AWS.config.credentials = new AWS.WebIdentityCredentials({
        RoleArn: 'arn:aws:iam::337562365152:role/googleRole_nonProd',
        ProviderId: null, 
        WebIdentityToken: userToken
    });

   AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                 IdentityPoolId : config.cognito.IDENTITY_POOL_ID, // your identity pool id here
                 AccountId: '337562365152',
                 Logins : {
                     'accounts.google.com' : userToken
                 }
             });

  params = {
                IdentityPoolId: config.cognito.IDENTITY_POOL_ID, /* required */
                AccountId: '337562365152',
                Logins: {
                     'accounts.google.com' : userToken
                 }
               };
        }

    // Obtain AWS credentials
    AWS.config.credentials.get(function(data){
        // Access AWS resources here.
        console.log(data);
    });

             AWS.config.region = config.cognito.REGION;
              var self = this;
               var cognitoID = new AWS.CognitoIdentity();
              var homeScreenNavigate = this.postSocialLogin;
               cognitoID.getId(params, function(err, data) {
                 if (err) {
                      console.log(err, err.stack); // an error occurred
                 }
                 else {
                      console.log(data);           // successful response
                      homeScreenNavigate(self);
                 }
               });

                      

        
  }

  formSocialUserObj = user => {
    var suserObj = new SocialLoginModel;
    suserObj.tsemail = user.profile.email?user.profile.email:"";
    suserObj.tsfirstName = user.profile.firstName?user.profile.firstName:"";
    suserObj.tslastName = user.profile.lastName?user.profile.lastName:"";
    suserObj.tsname = user.profile.name?user.profile.name:"";
    suserObj.tsprofilePicURL = user.profile.profilePicURL?user.profile.profilePicURL:"";
    suserObj.tsid = user.profile.id?user.profile.id:"";
    suserObj.tsaccessToken = user.token.accessToken?user.token.accessToken:"";
    suserObj.tsexpiresAt = user.token.expiresAt?user.token.expiresAt:"";
    suserObj.tsexpiresIn = user.token.expiresIn?user.token.expiresIn:"";
    suserObj.tsfirstIssued_at = user.token.firstIssued_at?user.token.firstIssued_at:"";
    suserObj.tsidToken = user.token.idToken?user.token.idToken:"";
    suserObj.tsscope = user.token.scope?user.token.scope:"";
    suserObj.tsprovider = user.provider?user.provider:"";
    var today  = new Date();
    suserObj.tsUpdatedOn = today.toLocaleDateString("en-US");
    suserObj.tsCreatedOn = today.toLocaleDateString("en-US");
    return suserObj
  }

  handleSocialLoginFailure = (err) => {
    console.error(err);
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = async event => {
     ReactGA.event({
                category: 'Normal Login',
                action: 'Login',
              });
    event.preventDefault();
    this.setState({ isLoading: true });
    try {
      await this.login(this.state.email, this.state.password).then(result => { 

        //POTENTIAL: Region needs to be set if not already set previously elsewhere.
             AWS.config.region = config.cognito.REGION;

             AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                 IdentityPoolId : config.cognito.IDENTITY_POOL_ID, // your identity pool id here
                 AccountId: '337562365152',
                 Logins : {
                     // Change the key below according to the specific region your user pool is in.
                     'cognito-idp.us-east-1.amazonaws.com/us-east-1_PdeTltNLI' : result.getIdToken().getJwtToken()
                 }
             });
             
             var params = {
                IdentityPoolId: config.cognito.IDENTITY_POOL_ID, /* required */
                AccountId: '337562365152',
                Logins: {
                     'cognito-idp.us-east-1.amazonaws.com/us-east-1_PdeTltNLI' : result.getIdToken().getJwtToken()
                 /* '<IdentityProviderName>': ... */
                 }
               };

               var cognitoID = new AWS.CognitoIdentity();

               cognitoID.getId(params, function(err, data) {
                 if (err) console.log(err, err.stack); // an error occurred
                 else     
                 {
                                   console.log(data);           // successful response

                   var params2 = {
                     IdentityId: data.IdentityId, /* required */
                     Logins: {
                     'cognito-idp.us-east-1.amazonaws.com/us-east-1_PdeTltNLI' : result.getIdToken().getJwtToken()
                       /* '<IdentityProviderName>': ... */
                     }
                   };
                   cognitoID.getCredentialsForIdentity(params2, function(err, data) {
                     if (err) console.log(err, err.stack); // an error occurred
                     else     console.log(data);           // successful response
                   });
                 }
               });

      });


      this.props.userHasAuthenticated(true);
      this.postLogin(this);
      // this.navigateToHomeScreen(this);
      // this.props.history.push("/home");
    } catch (e) {
      alert(e);
      this.setState({ isLoading: false });

      // dummy login for testing purpose
      // this.props.userHasAuthenticated(true);
      // this.props.history.push("/");
    }
  }

  login(email, password) {
    const userPool = new CognitoUserPool({
      UserPoolId: config.cognito.USER_POOL_ID,
      ClientId: config.cognito.APP_CLIENT_ID
    });
    const user = new CognitoUser({ Username: email, Pool: userPool });
    const authenticationData = { Username: email, Password: password };
    const authenticationDetails = new AuthenticationDetails(authenticationData);

    return new Promise((resolve, reject) =>
      user.authenticateUser(authenticationDetails, {
        onSuccess: result => resolve(result),
        onFailure: err => reject(err)
      })
    );

  // return new Promise((resolve, reject) =>
  //     user.authenticateUser(authenticationDetails, null, (err, result) => {
  //       if (err) {
  //         reject(err);
  //         return;
  //       }

  //       resolve(result.user);
  //     })
  //   );

  }

  render() {
    return (

      <div class="signin-wrapper">
      <div class="signin-box">
        <div class="signin-logo">
          <div class="signin-icon">
            <i class="icon ion-ios-home"></i>
          </div>
          <h2 class="signin-logo-text">rentvent</h2>
        </div>
        <h4 class="signin-title">Sign in to continue</h4>

  <form>
          <FormGroup controlId="email" bsSize="large">
            <FormControl
              autoFocus
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
              placeholder="Enter your email"
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
              placeholder="Enter your password"
              onKeyPress={this.handleKeyPress}
            />
          </FormGroup>
        </form>

        <div class="form-group d-flex align-items-center justify-content-between hidden">
          <label class="ckbox ckbox-success mg-b-0">
            <input type="checkbox" /><span>Remember me</span>
          </label>
          <a href="">Forgot password?</a>
        </div>

        <button class="btn btn-primary btn-block" onClick={this.handleSubmit} disabled={!this.validateForm()}>Sign In</button>

        <div class="signwith"><span>or signin with</span></div>
         <div class="row row-xs signin-social">

        <SocialButton
                provider='facebook'
                appId={config.facebook.APP_ID}
                onLoginSuccess={this.handleSocialLogin}
                onLoginFailure={this.handleSocialLoginFailure}
                className="fb-button"
              >
                Facebook
        </SocialButton>
        <SocialButton2
                provider='google'
                appId={config.google.APP_ID}
                onLoginSuccess={this.handleSocialLogin}
                onLoginFailure={this.handleSocialLoginFailure}
              >
                Google
        </SocialButton2>
</div>
        <div class="signin-footer">
          Not yet a member? <a href="#" onClick={this.handleSignup}>Sign Up</a>
        </div>
        <br />
        <div class="signin-footer-helper-links">
           <a href="#" onClick={this.handlePrivacyPolicy}>Privacy Policy</a>
            <a href="#" onClick={this.handleTermsofUse}>Terms of Use</a>
        </div>
        <div class="sitemap-section"><a href="#" onClick={this.handleSiteMap}>Site Map</a></div>
        
      </div>
    </div>

    );
  }
}