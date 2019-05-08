import React, { Component } from "react";
//import { Route } from "react-router-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "../utils/setAuthToken";
import { setCurrentUser, logoutUser } from "../actions/authActions";

import { Provider } from "react-redux";
import { store } from "../store";

import PrivateRoute from "./common/PrivateRoute";

import SignUp from "./auth/SignUp";
import Login from "./auth/Login";
import Dashboard from "./DashBoard/Dashboard.js";

import CreateHackathon from "./CreateHackathon/CreateHackathon";
import JoinHackathon from "./JoinHackathon/JoinHackathon";
import GradeHackathon from "./GradeHackathon/GradeHackathon";
import Organization from "./Organization/Organization";
import AllGradeHackathons from "./GradeHackathon/AllGradeHackathons"
import Checkout from "./Checkout/Checkout";
import Profile from "./Profile/Profile";
import Submissions from "./Submissions/Submissions";

//Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Clear current Profile
   // store.dispatch(clearCurrentProfile());
    // Redirect to login
    window.location.href = "/";
  }
}

class Main extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/signup" exact component={SignUp} />
          <Route path="/" exact component={Login} />
          <Route path="/login" exact component={Login} />
          <Route path="/dashboard" exact component={Dashboard} />
          <Route path="/create-hackathon" exact component={CreateHackathon} />
          <Route path="/join-hackathon/:id" exact component={JoinHackathon} />
          <Route path="/grade-hackathon/:id" exact component={GradeHackathon} />
          <Route path="/organization" exact component={Organization} />
          <Route path="/profile" exact component={Profile} />

          <Route path="/all-grade-hackathons" exact component={AllGradeHackathons} />
          

          <Route path="/submissions" exact component={Submissions} />
          <Route path="/team/payment" exact component={Checkout} />
          
        </Switch>
      </div>
    );
  }
}
//Export The Main Componentnp
export default Main;
