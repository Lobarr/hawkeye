import React from "react";
import { connect } from "react-redux";
import { Layout, Icon } from "antd";
import { CreateStream, UserPopover } from "../index";
import { onView } from "../../store/actions/stream";
import { openPopover, closePopover } from "../../store/actions/user";
import "./Header.css";
const { Header } = Layout;

class DashboardHeader extends React.Component {
  handlePopover = () => {
    const { user, closePopover, openPopover } = this.props;

    user.popoverVisible ? closePopover() : openPopover();
  };

  render() {
    return (
      <Header className="header" style={{ backgroundColor: "#E8EEF2" }}>
        <div className="header-icon-container" onClick={this.onView}>
          <Icon
            type="plus"
            className="header-icon"
            onClick={this.props.onView}
          />
        </div>
        <div className="header-icon-container" onClick={this.handlePopover}>
          <Icon
            type="user"
            className="header-icon"
            onClick={this.handlePopover}
          >
            <UserPopover />
          </Icon>
        </div>
        <CreateStream />
      </Header>
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
    onView: () => dispatch(onView()),
    openPopover: () => dispatch(openPopover()),
    closePopover: () => dispatch(closePopover()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardHeader);
