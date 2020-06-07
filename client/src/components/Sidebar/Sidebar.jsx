import React from "react";
import { connect } from "react-redux";
import { Layout, Menu, Icon } from "antd";
import { select } from "../../store/actions/stream";
const { Sider } = Layout;
const { Item, SubMenu } = Menu;

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.displayStreams = this.displayStreams.bind(this);
  }
  displayStreams() {
    if (this.props.stream.streams.length !== 0) {
      return this.props.stream.streams.map((stream, index) => (
        <Item key={index + 4}>
          <span onClick={() => this.props.select(stream)}>
            {stream.name.toUpperCase()} - {stream.location.toUpperCase()}
          </span>
        </Item>
      ));
    } else {
      return <Item key="0">No streams</Item>;
    }
  }
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
            {this.displayStreams()}
          </SubMenu>
        </Menu>
      </Sider>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    general: state.general,
    stream: state.stream,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    select: (stream) => dispatch(select(stream)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
