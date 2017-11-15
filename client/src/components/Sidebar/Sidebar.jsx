import React from "react";
import { connect } from "react-redux";
import { Layout, Menu, Icon } from "antd";
const { Sider } = Layout;
const { Item } = Menu;

class Sidebar extends React.Component {
  render() {
    return (
      <Sider style={{ backgroundColor: "white" }}>
        <Menu mode="inline">
          <Item key="1">
            <h1 id="dashboard-hawkeye">HAWKEYE</h1>
          </Item>

          <Item key="2">
            <Icon type="appstore" />
            <span>2 x 2</span>
          </Item>
          <Item key="3">
            <Icon type="laptop" />
            <span>Fullscreen</span>
          </Item>
        </Menu>
      </Sider>
    );
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

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
