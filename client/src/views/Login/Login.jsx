import React from "react";
import { connect } from "react-redux";
import { Form, Input, Button, Icon, Row } from "antd";
import { login } from "../../actions/auth";
import { Link, Redirect } from "react-router-dom";
import { notify } from "../../helpers/notification";
import "./Login.css";

const FormItem = Form.Item;

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    if (typeof Storage !== undefined) {
      this.props.form.validateFields((errors, values) => {
        if (!errors) {
          this.props.login(values);
        }
      });
    } else {
      notify({
        type: "warning",
        message: "Please use another browser"
      });
    }
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    if (this.props.general.access) {
      return <Redirect to="/" />;
    }
    return (
      <div className="login-container">
        <Row>
          <h1 id="login-title">Login</h1>
        </Row>
        <Row>
          <Form onSubmit={this.handleSubmit}>
            <FormItem>
              {getFieldDecorator("username", {
                rules: [
                  { required: true, message: "Please input you username" }
                ]
              })(
                <Input
                  size="large"
                  prefix={<Icon type="user" style={{ fontSize: 13 }} />}
                  placeholder="Username"
                />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator("password", {
                rules: [
                  { required: true, message: "Please input your password" }
                ]
              })(
                <Input
                  type="password"
                  size="large"
                  prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
                  placeholder="Password"
                />
              )}
            </FormItem>
            <FormItem>
              <Button
                loading={this.props.general.isLoading}
                type="primary"
                htmlType="submit"
              >
                Login
              </Button>
              <br />
              <span>
                or <Link to="/signup"> Register now!</Link>
              </span>
            </FormItem>
          </Form>
        </Row>
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
    login: payload => dispatch(login(payload))
  };
};

Login = Form.create()(Login);

export default connect(mapStateToProps, mapDispatchToProps)(Login);
