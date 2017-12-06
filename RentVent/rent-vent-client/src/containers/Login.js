import React, { Component } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import SocialButton from "../components/SocialButton";
import config from "../config";
import { CognitoUserPool, AuthenticationDetails, CognitoUser } from "amazon-cognito-identity-js";
import "./Login.css";
import AWS from "aws-sdk";
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

  handleSocialLogin = (user) => {
    console.log(user.token.accessToken);

AWS.config.credentials = new AWS.WebIdentityCredentials({
   RoleArn: 'arn:aws:iam::337562365152:role/fbRole_nonProd',
   ProviderId: 'graph.facebook.com', // this is null for Google
   WebIdentityToken: user.token.accessToken
});


    AWS.config.region = 'us-east-1';

    // Obtain AWS credentials
    AWS.config.credentials.get(function(data){
        // Access AWS resources here.

    });



    //POTENTIAL: Region needs to be set if not already set previously elsewhere.
             AWS.config.region = config.cognito.REGION;

             AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                 IdentityPoolId : config.cognito.IDENTITY_POOL_ID, // your identity pool id here
                 AccountId: '337562365152',
                 Logins : {
                     // Change the key below according to the specific region your user pool is in.
                     'graph.facebook.com' : user.token.accessToken
                 }
             });
             
             var params = {
                IdentityPoolId: config.cognito.IDENTITY_POOL_ID, /* required */
                AccountId: '337562365152',
                Logins: {
                     'graph.facebook.com' : user.token.accessToken
                 /* '<IdentityProviderName>': ... */
                 }
               };

               var cognitoID = new AWS.CognitoIdentity();

               cognitoID.getId(params, function(err, data) {
                 if (err) console.log(err, err.stack); // an error occurred
                 else     
                 {
                                   console.log(data);           // successful response

                   // var params2 = {
                   //   IdentityId: data.IdentityId, /* required */
                   //   Logins: {
                   //   'graph.facebook.com/us-east-2_VBkSGcAr4' : user.token.accessToken
                   //     /* '<IdentityProviderName>': ... */
                   //   }
                   // };
                   // cognitoID.getCredentialsForIdentity(params2, function(err, data) {
                   //   if (err) console.log(err, err.stack); // an error occurred
                   //   else     console.log(data);           // successful response
                   // });
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
      this.props.history.push("/");
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