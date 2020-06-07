import React from "react";
import { connect } from "react-redux";
import { Popover, Menu, Icon } from "antd";
import { logout } from "../../store/actions/auth";
import { viewProfile, updateProfile, remove } from "../../store/actions/user";
import { ViewProfile, UpdateProfile, ConfirmDelete } from "../index";

class UserPopover extends React.Component {
  render() {
    return (
      <div>
        <Popover
          // title="Title"
          trigger="click"
          content={
            <Menu mode="inline">
              <Menu.Item key="1">
                <div onClick={this.props.viewProfile}>
                  <Icon type="user" />
                  <span>View Profile</span>
                </div>
              </Menu.Item>
              <Menu.Item key="2">
                <div onClick={this.props.updateProfile}>
                  <Icon type="setting" />
                  <span>Update Profile</span>
                </div>
              </Menu.Item>
              <Menu.Item key="3">
                <div onClick={this.props.logout}>
                  <Icon type="poweroff" />
                  <span>Signout</span>
                </div>
              </Menu.Item>
              <Menu.Item key="4">
                <div
                  onClick={() =>
                    ConfirmDelete(
                      "Are you sure you want to be deleted?",
                      this.props.remove
                    )
                  }
                >
                  <Icon type="delete" style={{ color: "red" }} />
                  <span>Delete Profile</span>
                </div>
              </Menu.Item>
            </Menu>
          }
          visible={this.props.user.popoverVisible}
        />
        <ViewProfile />
        <UpdateProfile />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    general: state.general,
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
    viewProfile: () => dispatch(viewProfile()),
    updateProfile: () => dispatch(updateProfile()),
    remove: () => dispatch(remove()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserPopover);
