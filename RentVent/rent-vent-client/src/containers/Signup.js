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
import AWS from "aws-sdk";

export default class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      email: "",
      password: "",
      confirmPassword: "",
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
      this.state.password.length > 0 &&
      this.state.password === this.state.confirmPassword
    );
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

  handleConfirmationSubmit = async event => {
    event.preventDefault();

    this.setState({ isLoading: true });

var result = "ash";
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
                AccountId: '651094143027',
                Logins : {
                    // Change the key below according to the specific region your user pool is in.
                    'cognito-idp.us-east-2.amazonaws.com/us-east-2_VBkSGcAr4' : result.getIdToken().getJwtToken()
                }
            });
            
            var params = {
               IdentityPoolId: config.cognito.IDENTITY_POOL_ID, /* required */
               AccountId: '651094143027',
               Logins: {
                    'cognito-idp.us-east-2.amazonaws.com/us-east-2_VBkSGcAr4' : result.getIdToken().getJwtToken()
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
                    'cognito-idp.us-east-2.amazonaws.com/us-east-2_VBkSGcAr4' : result.getIdToken().getJwtToken()
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
//    RoleArn: 'arn:aws:iam::651094143027:role/testcognitoRole',
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
      this.props.history.push("/");
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
      <form onSubmit={this.handleConfirmationSubmit}>
        <FormGroup controlId="confirmationCode" bsSize="large">
          <ControlLabel>Confirmation Code</ControlLabel>
          <FormControl
            autoFocus
            type="tel"
            value={this.state.confirmationCode}
            onChange={this.handleChange}
          />
          <HelpBlock>Please check your email for the code.</HelpBlock>
        </FormGroup>
        <LoaderButton
          block
          bsSize="large"
          disabled={!this.validateConfirmationForm()}
          type="submit"
          isLoading={this.state.isLoading}
          text="Verify"
          loadingText="Verifying…"
        />
      </form>
    );
  }

  renderForm() {
    return (
      <form onSubmit={this.handleSubmit}>
        <FormGroup controlId="email" bsSize="large">
          <ControlLabel>Email</ControlLabel>
          <FormControl
            autoFocus
            type="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
        <FormGroup controlId="name" bsSize="large">
          <ControlLabel>Name</ControlLabel>
          <FormControl
            autoFocus
            type="text"
            value={this.state.name}
            onChange={this.handleChange}
          />
        </FormGroup>
          <FormGroup controlId="familyName" bsSize="large">
          <ControlLabel>Family Name</ControlLabel>
          <FormControl
            autoFocus
            type="text"
            value={this.state.familyName}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup controlId="givenName" bsSize="large">
          <ControlLabel>Given Name</ControlLabel>
          <FormControl
            autoFocus
            type="text"
            value={this.state.givenName}
            onChange={this.handleChange}
          />
        </FormGroup>
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <ControlLabel>Password</ControlLabel>
          <FormControl
            value={this.state.password}
            onChange={this.handleChange}
            type="password"
          />
        </FormGroup>
        <FormGroup controlId="confirmPassword" bsSize="large">
          <ControlLabel>Confirm Password</ControlLabel>
          <FormControl
            value={this.state.confirmPassword}
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
          text="Signup"
          loadingText="Signing up…"
        />
      </form>
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