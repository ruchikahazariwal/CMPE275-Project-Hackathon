import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { Field, reduxForm } from "redux-form";

import "./Organization.css";
import { TextField } from "material-ui";
import { createOrganization } from "../../actions/organizationActions";
import Select from "react-select";
import Navbar from "../Navbar/Navbar";

class Organization extends Component {
  constructor(props) {
    super(props);
    this.state = {
      organizationName: "",
      owner: "",
      description: "",
      address: {
        street: "",
        city: "",
        stateName: "",
        zip: ""
      }
    };
  }

  componentWillMount() {
    console.log("Inside Component did Mount");
    if (this.props.auth.user !== undefined) {
      this.setState({ user: this.props.auth.user });
      this.setState({ owner: this.props.auth.user });
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const owner = {
      orgName: judge.uuid,
      screenName: judge.screenName,
      name: judge.name,
      email: judge.email,
      bussinessTitle: judge.bussinessTitle,
      organization: judge.organization,
      photoUrl: judge.photoUrl,
      aboutMe: judge.aboutMe,
      address: judge.address,
      judging: judge.judging,
      teams: judge.teams,
      username: judge.username
    };

    const newHachathon = {
      eventName: this.state.eventName,
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      description: this.state.description,
      fees: this.state.fees,
      minTeamSize: this.state.minTeamSize,
      maxTeamSize: this.state.maxTeamSize,
      sponsors: this.state.sponsors,
      discount: this.state.discount,
      user: this.state.user,
      judges: new_judge
    };
    console.log(newHachathon);

    this.props.createHackathon(newHachathon, this.props.history);
  };

  render() {
    console.log("Inside render");

    return (
      <div>
        <Navbar />
        <div className="col-md-3" />
        <div className="col-md-6">
          <div className="row ">
            <h1 className="organization-header">Create Organization</h1>
            <p className="header">
              Create your own Organization. You can add people in the
              organization. People in the same organization have their own perks
              <br />
              Get started by providing the initial details for your Organization
              and then ask people to join.
            </p>
          </div>

          <br />
          <br />
          <form>
            <div className="row ">
              <span className="inputspan">
                <label className="form-label">Organization Name</label>
              </span>
              <input
                className="form-input"
                type="text"
                name="organizationName"
                value={this.state.organizationName}
                onChange={this.onChange}
                required
              />
              <br />
              <br />
            </div>

            <div className="row">
              <span className="inputspan">
                <label className="form-label">Description</label>
              </span>
              <textarea
                className="form-input"
                rows="5"
                name="description"
                value={this.state.description}
                onChange={this.onChange}
                required
              />
            </div>

            <br />

            <p className="header">Enter your address details</p>

            <br />
            <div className="row ">
              <span className="inputspan">
                <label className="form-label">Street</label>
              </span>
              <input
                className="form-input"
                type="text"
                name="street"
                value={this.state.street}
                onChange={this.onChange}
              />
              <br />
              <br />
            </div>

            <div className="row ">
              <span className="inputspan">
                <label className="form-label">City</label>
              </span>
              <input
                className="form-input"
                type="text"
                name="city"
                value={this.state.city}
                onChange={this.onChange}
              />
              <br />
              <br />
            </div>

            <div className="row ">
              <span className="inputspan">
                <label className="form-label">State</label>
              </span>
              <input
                className="form-input"
                type="text"
                name="stateName"
                value={this.state.stateName}
                onChange={this.onChange}
              />
              <br />
              <br />
            </div>

            <div className="row ">
              <span className="inputspan">
                <label className="form-label">Zipcode</label>
              </span>
              <input
                className="form-input"
                type="text"
                name="zip"
                value={this.state.zip}
                onChange={this.onChange}
              />
              <br />
              <br />
            </div>

            <br />
            <br />

            <div className="row">
              <input
                className="form-submit"
                type="submit"
                value="Submit"
                onClick={this.onSubmit}
              />
            </div>
          </form>
        </div>

        <div className="col-md-3" />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createOrganization }
)(withRouter(Organization));