import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import Login from "./containers/Login";
import AppliedRoute from "./components/AppliedRoute";
import Signup from "./containers/Signup";
import Questionnaire from "./containers/Questionnaire";
import Questionnaire2 from "./containers/Questionnaire2";
import NotFound from "./containers/NotFound";

export default ({ childProps }) =>
  <Switch>
    <AppliedRoute path="/" exact component={Login} props={childProps} />
    <AppliedRoute path="/home" exact component={Home} props={childProps} />
    <AppliedRoute path="/signup" exact component={Signup} props={childProps} />
    <AppliedRoute path="/questionnaire" exact component={Questionnaire} props={childProps} />
    <AppliedRoute path="/questionnaire2" exact component={Questionnaire2} props={childProps} />
    { /* Finally, catch all unmatched routes */ }
    <Route component={NotFound} />
  </Switch>;