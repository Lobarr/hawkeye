import React from "react";
import { connect } from "react-redux";
import { Layout } from "antd";
import { Sidebar, Header, Fullscreen, TwoByTwo } from "../../components";
import { getUser } from "../../store/actions/user";
import { getStreams } from "../../store/actions/stream";
import "./Dashboard.css";

const { Content } = Layout;

class Dashboard extends React.Component {
  componentDidMount() {
    this.props.getUser();
    this.props.getStreams();
  }
  render() {
    return (
      <div className="dashboard">
        <Layout style={{ minHeight: "100vh" }}>
          <Sidebar />
          <Layout>
            <Header />
            <Content style={{ height: "100%" }}>
              {this.props.general.displayMode === "FULLSCREEN" ? (
                <Fullscreen />
              ) : (
                <TwoByTwo />
              )}
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    general: state.general,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUser: () => dispatch(getUser()),
    getStreams: () => dispatch(getStreams()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
