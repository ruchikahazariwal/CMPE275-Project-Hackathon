import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { loginUser } from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";
import fire from "../../config/firebaseConfig";
import "./Login.css";

class Login extends Component {
  constructor(props) {
    //Call the constrictor of Super class i.e The Component
    super(props);
    //maintain the state required for this component
    this.state = {
      email: "",
      password: "",
      authFlag: false,
      errors: {},
      token: ""
    };
  }
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit = e => {
    e.preventDefault();
    fire
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(u => {
        console.log(u);
        const userData = {
          email: this.state.email,
          password: this.state.password,
          uuid: u.user.uid
        };

        this.setState({ token: u.user.ra });
        console.log("Token:" + this.state.token);
        this.props.loginUser(userData, this.state.token);
      })
      .catch(error => {
        console.log(error);
      });

    // const userData = {
    //   userName: this.state.userName,
    //   password: this.state.password
    // };

    // this.props.loginUser(userData);
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { errors } = this.state;
    return (
      

            <TextFieldGroup
              type="email"
              name="email"
              value={this.state.email}
              placeholder="User name"
              onChange={this.onChange}
              error={errors.email}
            />
            <TextFieldGroup
              type="password"
              name="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.onChange}
              error={errors.password}
            />
            <Link to="/signup">Create an account?</Link>

            <input
              type="submit"
              name="signin_submit"
              value="Sign In"
              onClick={this.onSubmit}
            />
         
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(withRouter(Login));
