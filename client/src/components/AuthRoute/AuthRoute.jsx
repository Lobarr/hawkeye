import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const AuthRoute = ({ component: Component, ...rest }) => {
  const { general } = rest;
  const { access } = general;

  return (
    <Route
      {...rest}
      render={(props) =>
        access === false ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

const mapStateToProps = (state) => {
  const { general } = state;

  return {
    general,
  };
};

export default connect(mapStateToProps)(AuthRoute);
