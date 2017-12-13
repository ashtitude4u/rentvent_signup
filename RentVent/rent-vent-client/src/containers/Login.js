import React, { Component } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import SocialButton from "../components/SocialButton";
import config from "../config";
import { CognitoUserPool, AuthenticationDetails, CognitoUser } from "amazon-cognito-identity-js";
import "./Login.css";
import AWS from "aws-sdk";
import {Landlord} from '../models/Landlord';

// import CognitoIdentityServiceProvider from 'aws-sdk/clients/cognitoidentityserviceprovider';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      email: "",
      password: ""
    };
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  navigateToHomeScreen(self) {

    // test api
      var landlord = new Landlord;
    // getToken() {
       const GATEWAY_URL = ['https://t3d8pqk8bk.execute-api.us-east-1.amazonaws.com/prod/Vent.Rent/landlord/Mike/moNtagano'];
       fetch(GATEWAY_URL, {
           method: 'GET',
           mode: 'cors'
       })
           .then((response) => {
               return response.json();
           })
           .then((json) => {
               console.log('new token received')
               // this.setState({ accessToken: json.done.json.access_token });
               // this.search();
               if(json){
                  if(json.Items.length > 0) {
                      landlord.firstName = json.Items[0].L_First_Name ? json.Items[0].L_First_Name : "";
                      landlord.lastName = json.Items[0].L_Last_Name ? json.Items[0].L_Last_Name : "";;
                  }
               }
           })
           .catch(err => console.log('There was an error:' + err))

   // }


    self.props.userHasAuthenticated(true);
    self.props.history.push("/home");
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
      this.props.history.push("/home");
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
      <div className="Login">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="email" bsSize="large">
            <ControlLabel>Email</ControlLabel>
            <FormControl
              autoFocus
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <LoaderButton
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
            isLoading={this.state.isLoading}
            text="Login"
            loadingText="Logging in…"
          />
        </form>
        <div className="social-buttons">
        <SocialButton
                provider='facebook'
                appId={config.facebook.APP_ID}
                onLoginSuccess={this.handleSocialLogin}
                onLoginFailure={this.handleSocialLoginFailure}
              >
                Login with Facebook
        </SocialButton>
        <SocialButton
                provider='google'
                appId={config.google.APP_ID}
                onLoginSuccess={this.handleSocialLogin}
                onLoginFailure={this.handleSocialLoginFailure}
              >
                Login with Google
        </SocialButton>
        </div>
      </div>
    );
  }
}