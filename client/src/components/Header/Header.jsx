import React from "react";
import { connect } from "react-redux";
import { Layout, Menu, Icon } from "antd";
import { CreateStream } from "../index";
import { onView } from "../../actions/stream";
import "./Header.css";
const { Header } = Layout;
const { Item } = Menu;

class DashboardHeader extends React.Component {
  render() {
    return (
      <Header className="header" style={{ backgroundColor: "#E8EEF2" }}>
        <div className="header-icon-container">
          <Icon
            type="plus"
            className="header-icon"
            onClick={this.props.onView}
          />
        </div>
        <div className="header-icon-container">
          <Icon type="user" className="header-icon" />
        </div>
        <CreateStream />
      </Header>
    );
  }
}

const mapStateToProps = state => {
  return {
    general: state.general
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onView: () => dispatch(onView())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardHeader);
