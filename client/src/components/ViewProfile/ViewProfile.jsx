import React from "react";
import { connect } from "react-redux";
import { Modal, Button } from "antd";
import { closeViewProfile } from "../../actions/user";

class ViewProfile extends React.Component {
  render() {
    return (
      <Modal
        visible={this.props.user.viewProfile}
        title="Profile"
        okText="Done"
        footer={[null, null]}
      >
        <h4>Username: {this.props.user.user.username}</h4>
        <h4>Email: {this.props.user.user.email}</h4>
        <Button
          type="primary"
          onClick={this.props.closeViewProfile}
          style={{ float: "right" }}
        >
          Done
        </Button>
      </Modal>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeViewProfile: () => dispatch(closeViewProfile())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewProfile);
