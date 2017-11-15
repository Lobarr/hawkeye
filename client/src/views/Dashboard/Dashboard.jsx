import React from "react";
import { connect } from "react-redux";
import { Layout } from "antd";
import { Sidebar, Header } from "../../components";
import { getUser } from "../../actions/user";
import "./Dashboard.css";
const { Content, Footer } = Layout;

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.getUser();
  }
  render() {
    return (
      <div className="dashboard">
        <Layout style={{ minHeight: "100vh" }}>
          <Sidebar />
          <Layout>
            <Header />
            <Content>Content</Content>
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
    getUser: () => dispatch(getUser())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
