import React from "react";
import { connect } from "react-redux";
import { Popover, Menu, Icon } from "antd";
import { logout } from "../../actions/auth";

const content = ({ logout }) => (
  <Menu mode="inline">
    <Menu.Item key="1">
      <Icon type="user" />
      <span>View Profile</span>
    </Menu.Item>
    <Menu.Item key="2">
      <Icon type="setting" />
      <span>Update Profile</span>
    </Menu.Item>
    <Menu.Item key="3">
      <Icon type="poweroff" />
      <span>Signout</span>
    </Menu.Item>
  </Menu>
);
class UserPopover extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Popover
        // title="Title"
        trigger="click"
        content={<div>{<content />}</div>}
        visible={this.props.user.popoverVisible}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    general: state.general,
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: dispatch => dispatch(logout())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserPopover);
