import React, { Component } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import SocialButton from "../components/SocialButton";
import SocialButton2 from "../components/SocialButton2";
import config from "../config";
import { CognitoUserPool, AuthenticationDetails, CognitoUser } from "amazon-cognito-identity-js";
import "./Login.css";
import ReactGA from 'react-ga';

import AWS from "aws-sdk";
import {LandlordModel} from '../models/LandlordModel';
import "../libs/font-awesome/css/font-awesome.css";
import "../libs/Ionicons/css/ionicons.css";

// import CognitoIdentityServiceProvider from 'aws-sdk/clients/cognitoidentityserviceprovider';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      email: "",
      password: ""
    };
    this.myProps = props;

    ReactGA.initialize('UA-111517732-1', {
      debug: true,
      titleCase: false,
      gaOptions: {
        userId: 123
      }
    });
    ReactGA.set({ userId: 123 });


  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleSignup = event => {
    this.props.history.push("/signup");
  }

  navigateToHomeScreen(self) {

    // test api
      var landlord = new LandlordModel;
      try{
       const GATEWAY_URL = ['https://w82vygua3l.execute-api.us-east-1.amazonaws.com/prod/Vent.Rent/landlord/arya/stark'];
       fetch(GATEWAY_URL, {
           method: 'GET',
           mode: 'cors'
       })
           .then((response) => {
               return response.json();
           })
           .then((json) => {
               console.log('Landlord data received '+JSON.stringify(json));
               // this.setState({ accessToken: json.done.json.access_token });
               // this.search();
               if(json){
                  if(json.Items.length > 0) {
                      var landlordObj = json.Items[0];
                      landlord.firstName = landlordObj.L_First_Name ? landlordObj.L_First_Name : "";
                      landlord.lastName = landlordObj.L_Last_Name ? landlordObj.L_Last_Name : "";
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
                      landlord.landlordId = landlordObj.landlord_id ? landlordObj.landlord_id : "";
                      self.myProps.myCallback(landlord);
                      self.props.userHasAuthenticated(true);
                      self.props.history.push("/home");
                  }
               }
           })
           .catch((err) => {console.log('There was an error:' + err);alert("Landlord error");})
         } catch (e) {
            console.log('There was an error:'+e); 
            alert("Landlord error");
      // dummy login for testing purpose
      // this.props.userHasAuthenticated(true);
      // this.props.history.push("/");
    }
   // }


    
  }

  handleKeyPress = (event) => {
    if(event.key == 'Enter'){
      if(this.validateForm()){
        this.handleSubmit(event);
      }
    }
  }

  handleSocialLogin = (user) => {
      var userToken;
      var socialLoginType;
      if(user.token.idToken){
               userToken = user.token.idToken;
               socialLoginType = "google";
            } else {
              userToken = user.token.accessToken;
               socialLoginType = "fb";
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
              var homeScreenNavigate = this.navigateToHomeScreen;
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

  handleSocialLoginFailure = (err) => {
    console.error(err);
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = async event => {
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
      this.navigateToHomeScreen(this);
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
      </div>
    </div>

      // <div className="Login">
      //   <form onSubmit={this.handleSubmit}>
      //     <FormGroup controlId="email" bsSize="large">
      //       <ControlLabel>Email</ControlLabel>
      //       <FormControl
      //         autoFocus
      //         type="email"
      //         value={this.state.email}
      //         onChange={this.handleChange}
      //       />
      //     </FormGroup>
      //     <FormGroup controlId="password" bsSize="large">
      //       <ControlLabel>Password</ControlLabel>
      //       <FormControl
      //         value={this.state.password}
      //         onChange={this.handleChange}
      //         type="password"
      //       />
      //     </FormGroup>
      //     <LoaderButton
      //       block
      //       bsSize="large"
      //       disabled={!this.validateForm()}
      //       type="submit"
      //       isLoading={this.state.isLoading}
      //       text="Login"
      //       loadingText="Logging in…"
      //     />
      //   </form>
      //   <div className="social-buttons">
      //   <SocialButton
      //           provider='facebook'
      //           appId={config.facebook.APP_ID}
      //           onLoginSuccess={this.handleSocialLogin}
      //           onLoginFailure={this.handleSocialLoginFailure}
      //         >
      //           Login with Facebook
      //   </SocialButton>
      //   <SocialButton
      //           provider='google'
      //           appId={config.google.APP_ID}
      //           onLoginSuccess={this.handleSocialLogin}
      //           onLoginFailure={this.handleSocialLoginFailure}
      //         >
      //           Login with Google
      //   </SocialButton>
      //   </div>
      // </div>
    );
  }
}