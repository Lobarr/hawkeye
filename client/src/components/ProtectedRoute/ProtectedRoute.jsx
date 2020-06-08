import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { general } = rest;
  const { access } = general;

  return (
    <Route
      {...rest}
      render={(props) => {
        console.log(props);
        return access ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/login" }} />
        );
      }}
    />
  );
};

const mapStateToProps = (state) => {
  const { general } = state;

  return {
    general,
  };
};

export default connect(mapStateToProps)(ProtectedRoute);
