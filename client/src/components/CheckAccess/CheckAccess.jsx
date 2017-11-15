import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class CheckAccess extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return !this.props.general.access ? null : <Redirect to="/" />;
  }
}

const mapStateToProps = state => {
  return {
    general: state.general
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckAccess);
