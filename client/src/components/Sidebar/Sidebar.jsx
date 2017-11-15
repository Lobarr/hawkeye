import React from "react";
import { connect } from "react-redux";
import { Layout, Menu, Icon } from "antd";
const { Sider } = Layout;
const { Item, SubMenu } = Menu;

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
          <SubMenu
            key="streams"
            title={
              <span>
                <Icon type="folder" />
                <span>Streams</span>
              </span>
            }
          >
            <Item key="4">Option 9</Item>
            <Item key="5">Option 10</Item>
            <Item key="6">Option 11</Item>
            <Item key="7">Option 12</Item>
          </SubMenu>
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
