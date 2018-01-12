import React, { Component } from "react";
import {
  HelpBlock,
  FormGroup,
  FormControl,
  ControlLabel
} from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import "./Signup.css";
import { AuthenticationDetails, CognitoUserPool } from "amazon-cognito-identity-js";
import config from "../config";
import {TenantModel} from '../models/TenantModel';
import {SocialLoginModel} from '../models/SocialLoginModel';
import AWS from "aws-sdk";
import "../libs/font-awesome/css/font-awesome.css";
import "../libs/Ionicons/css/ionicons.css";

export default class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      email: "",
      password: "",
      name: "",
      familyName: "",
      givenName: "",
      confirmationCode: "",
      newUser: null
    };
  }

  validateForm() {
    return (
      this.state.email.length > 0 &&
      this.state.password.length > 0
    );
  }

  navigateToHomeScreen(self) {
    this.postTenantLogin(self);
   // self.props.history.push("/home");
  }

  postTenantLogin = self => {
    var tenantObj = new TenantModel;
    tenantObj.tFirstName = self.state.givenName;
    tenantObj.tLastName = self.state.familyName;
    tenantObj.tEmail = self.state.email;
    var today  = new Date();
    tenantObj.tUpdatedOn = today.toLocaleDateString("en-US");
    tenantObj.tCreatedOn = today.toLocaleDateString("en-US");
    var jsonObj = this.formTenantObject(tenantObj);
    this.postTenantService(jsonObj);
  }

  formTenantObject(tenantObj){
    var json = {};
      json = {
          // complete this
            "T_ID":tenantObj.tEmail ? tenantObj.tEmail : "",
           "Anonymous":"oo",
           "FirstName":tenantObj.tFirstName ? tenantObj.tFirstName : "",
           "LastName":tenantObj.tLastName ? tenantObj.tLastName : "",
           "CreatedOn":tenantObj.tCreatedOn ? tenantObj.tCreatedOn : "",
           "UpdatedOn":tenantObj.tUpdatedOn ? tenantObj.tUpdatedOn : "",
           "CreatedBy":"SignUp",
           "UpdatedBy":"SignUp"           
      }
    return json;
  }

  postTenantService(json){
    const GATEWAY_URL = config.apis.TENANT_POST;

    var jsonReqObj = JSON.stringify(json);
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
           sessionStorage.setItem('userLoggedIn', 'true');
           sessionStorage.setItem('tenantID', json);
           this.props.history.push("/home");
          } else {
            alert("Login error - "+json.message);
            // temp flow
            sessionStorage.setItem('userLoggedIn', 'true');
            this.props.history.push("/home");          
          }
      })
      .catch((err) => {
        console.log('There was an error:' + err);alert("tenant post error");
      })
        } catch (e) {
                console.log('There was an error:'+e); 
                alert("tenant login error");
        }
  }

  validateConfirmationForm() {
    return this.state.confirmationCode.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = async event => {
    this.state.name = this.state.givenName + " " + this.state.familyName;
    event.preventDefault();

    this.setState({ isLoading: true });
    try {
      const newUser = await this.signup(this.state.email, this.state.password, this.state.name, this.state.familyName, this.state.givenName);
      this.setState({
        newUser: newUser
      });
    } catch (e) {
      alert(e);
    }

    this.setState({ isLoading: false });
  }

  handleKeyPress = (event) => {
    if(event.key == 'Enter'){
      if(this.validateForm()){
        this.handleSubmit(event);
      }
    }
  }

  handleConfirmKeyPress = (event) => {
    if(event.key == 'Enter'){
      if(this.state.confirmationCode){
        this.handleConfirmationSubmit(event);
      }
    }
  }

  handleBacktoLogin = event => {
    this.props.history.push("/");
  }

  handleConfirmationSubmit = async event => {
    event.preventDefault();

    this.setState({ isLoading: true });

    try {
      await this.confirm(this.state.newUser, this.state.confirmationCode);


      await this.authenticate(
        this.state.newUser,
        this.state.email,
        this.state.password,
        this.state.name,
        this.state.familyName,
        this.state.givenName
      ).then(result => {
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

//             AWS.config.credentials = new AWS.WebIdentityCredentials({
//    RoleArn: 'arn:aws:iam::337562365152:role/testcognitoRole',
//    // ProviderId: 'cognito-identity.amazonaws.com', // this is null for Google
//    WebIdentityToken: result.getIdToken().getJwtToken()
// });



            //refreshes credentials using AWS.CognitoIdentity.getCredentialsForIdentity()
            // AWS.config.credentials.refresh((error) => {
            //     if (error) {
            //          console.error(error);
            //     } else {
            //          // Instantiate aws sdk service objects now that the credentials have been updated.
            //          // example: var s3 = new AWS.S3();
            //          console.log('Successfully logged!');
            //     }
            // });

      });

 

      this.props.userHasAuthenticated(true);
      // this.props.history.push("/home");
      this.navigateToHomeScreen(this);
    } catch (e) {
      alert(e);
      this.setState({ isLoading: false });
    }
  }

  signup(email, password, name, familyName, givenName) {

    const userPool = new CognitoUserPool({
      UserPoolId: config.cognito.USER_POOL_ID,
      ClientId: config.cognito.APP_CLIENT_ID
    });





  var userAttributes = [ 
      { 
         "Name": "name",
         "Value": name
      },
      {
         "Name": "given_name",
         "Value": givenName
      },
      {
         "Name": "family_name",
         "Value": familyName
      }
   ];

    return new Promise((resolve, reject) =>
      userPool.signUp(email, password, userAttributes, null, (err, result) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(result.user);
      })
    );
  }

  confirm(user, confirmationCode) {
    return new Promise((resolve, reject) =>
      user.confirmRegistration(confirmationCode, true, function(err, result) {
        if (err) {
          reject(err);
          return;
        }
        resolve(result);
      })
    );
  }

  authenticate(user, email, password) {
    const authenticationData = {
      Username: email,
      Password: password
    };
    const authenticationDetails = new AuthenticationDetails(authenticationData);

    return new Promise((resolve, reject) =>
      user.authenticateUser(authenticationDetails, {
        onSuccess: result => resolve(result),
        onFailure: err => reject(err)
      })
    );
  }


  renderConfirmationForm() {
    return (

    <div class="signin-wrapper">
      <div class="signup-box">
        <div class="signin-logo">
          <div class="signin-icon">
            <i class="icon ion-ios-home"></i>
          </div>
          <h2 class="signin-logo-text">rentvent</h2>
        </div>
        <h4 class="signin-title signin-title-verify">Verify your email address</h4>
        <p class="mg-b-25">We now need to verify your email address. A verification code has been sent to <span class="tx-primary">{this.state.email}</span> to verify your email address. Please enter the confirmation code.</p>

        <FormGroup controlId="confirmationCode" bsSize="large">
          <ControlLabel>Confirmation Code</ControlLabel>
          <FormControl
            autoFocus
            type="tel"
            value={this.state.confirmationCode}
            onChange={this.handleChange}
            onKeyPress={this.handleConfirmKeyPress}
          />
        </FormGroup>
      
        <a href="javascript:void(0)" class="btn btn-primary btn-block mg-b-15" onClick={this.handleConfirmationSubmit} disabled={!this.state.confirmationCode}>Verify Code</a>
        <a href="#" class="btn bg-gray-300 bd-0 btn-block" onClick={this.handleBacktoLogin}>Go back to Signin</a>
      </div>
    </div>
    );
  }

  renderForm() {
    return (

    <div class="signin-wrapper">
      <div class="signup-box">
        <div class="signin-logo">
          <div class="signin-icon">
            <i class="icon ion-ios-home"></i>
          </div>
          <h2 class="signin-logo-text">rentvent</h2>
        </div>
        <h4 class="signin-title">Create your own account</h4>

        <div class="form-group">
          <div class="row row-xs">

            <div class="col-sm input-div">
            <FormGroup controlId="givenName" bsSize="large">
            <FormControl
              autoFocus
              type="text"
              value={this.state.givenName}
              onChange={this.handleChange}
              placeholder="Enter your First Name"
            />
            </FormGroup>
            </div>

            <div class="col-sm input-div mg-t-15 mg-sm-t-0">
            <FormGroup controlId="familyName" bsSize="large">
            <FormControl
              type="text"
              value={this.state.familyName}
              onChange={this.handleChange}
              placeholder="Enter your Last Name"
            />
            </FormGroup>
            </div>

          </div>
        </div>

        <div class="form-group">
          <div class="row row-xs">

            <div class="col-sm input-div">
            <FormGroup controlId="email" bsSize="large">
            <FormControl
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
              placeholder="Enter your email"
            />
            </FormGroup>
            </div>

          <div class="col-sm input-div mg-t-15 mg-sm-t-0">
            <FormGroup controlId="password" bsSize="large">
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
              placeholder="Enter your password"
              onKeyPress={this.handleKeyPress}
            />
            </FormGroup>
            </div>

          </div>
        </div>

        <div class="form-group mg-y-25">
          <img src="../img/recaptcha.png" alt="" />
        </div>

        <button class="btn btn-primary btn-block" onClick={this.handleSubmit} disabled={!this.validateForm()}>Create Account</button>

        <div class="signin-footer">
          Already have an account? <a href="#" onClick={this.handleBacktoLogin}>Sign In</a>
        </div>
      </div>
    </div>

    );
  }

  render() {
    return (
      <div className="Signup">
        {this.state.newUser === null
          ? this.renderForm()
          : this.renderConfirmationForm()}
      </div>
    );
  }
}