import React from "react";
import { Route, Switch } from "react-router-dom";
import Landlord from "./containers/Landlord";
import Landing from "./containers/Landing";
import Property from "./containers/Property";
import Login from "./containers/Login";
import AppliedRoute from "./components/AppliedRoute";
import Signup from "./containers/Signup";
import Questionnaire1 from "./containers/Questionnaire1";
import Questionnaire2 from "./containers/Questionnaire2";
import PrivacyPolicy from "./containers/PrivacyPolicy";
import TermsofUse from "./containers/TermsofUse";
import SiteMap from "./containers/SiteMap";
import Support from "./containers/Support";
import NotFound from "./containers/NotFound";

export default ({ childProps }) =>
  <Switch>
    <AppliedRoute path="/" exact component={Login} props={childProps} />
    <AppliedRoute path="/home" exact component={Landing} props={childProps} />
    <AppliedRoute path="/landlord" exact component={Landlord} props={childProps} />
    <AppliedRoute path="/property" exact component={Property} props={childProps} />
    <AppliedRoute path="/signup" exact component={Signup} props={childProps} />
    <AppliedRoute path="/questionnaire1" exact component={Questionnaire2} props={childProps} />
    <AppliedRoute path="/privacypolicy" exact component={PrivacyPolicy} props={childProps} />
    <AppliedRoute path="/termsofuse" exact component={TermsofUse} props={childProps} />
    <AppliedRoute path="/sitemap" exact component={SiteMap} props={childProps} />
    <AppliedRoute path="/support" exact component={Support} props={childProps} />    
    { /* Finally, catch all unmatched routes */ }
    <Route component={NotFound} />
  </Switch>;