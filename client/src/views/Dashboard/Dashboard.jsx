import React from "react";
import { connect } from "react-redux";
import { Layout } from "antd";
import { Sidebar, Header, Fullscreen } from "../../components";
import { getUser } from "../../actions/user";
import { getStreams, getStream } from "../../actions/stream";
import "./Dashboard.css";
import { Redirect } from "react-router-dom";
const { Content, Footer } = Layout;

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.getUser();
    this.props.getStreams();
  }
  render() {
    if (!this.props.general.access) {
      return <Redirect to="/login" />;
    }
    return (
      <div className="dashboard">
        <Layout style={{ minHeight: "100vh" }}>
          <Sidebar />
          <Layout>
            <Header />
            <Content style={{ height: "100%" }}>
              <Fullscreen />
            </Content>
          </Layout>
        </Layout>
      </div>
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
    getUser: () => dispatch(getUser()),
    getStreams: () => dispatch(getStreams())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
