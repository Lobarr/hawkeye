import React from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { signup } from "../../actions/auth";
import { Form, Input, Button, Icon, Row } from "antd";
import { omit } from "underscore";
import "./Signup.css";

const FormItem = Form.Item;

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkPassword = this.checkPassword.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((errors, values) => {
      if (!errors) {
        this.props.signup(omit(values, "confirm"));
      }
    });
  }
  checkPassword(rule, value, callback) {
    const form = this.props.form;
    if (value && value !== form.getFieldValue("password")) {
      callback("Password's must match!");
    }
    callback();
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    if (this.props.general.access) {
      return <Redirect to="/" />;
    }
    return (
      <div className="signup-container">
        <Row>
          <h1 id="signup-title">Signup</h1>
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
              {getFieldDecorator("email", {
                rules: [
                  {
                    required: true,
                    type: "email",
                    message: "Please input you email"
                  }
                ]
              })(<Input size="large" prefix="@" placeholder="Email" />)}
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
              {getFieldDecorator("confirm", {
                rules: [
                  { required: true, message: "Please confirm your password!" },
                  { validator: this.checkPassword }
                ]
              })(
                <Input
                  type="password"
                  size="large"
                  prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
                  placeholder="Conrirm Password"
                />
              )}
            </FormItem>
            <FormItem>
              <Button
                loading={this.props.general.isLoading}
                type="primary"
                htmlType="submit"
              >
                Signup
              </Button>
              <br />
              <span>
                or <Link to="/login"> Login now!</Link>
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
    signup: payload => dispatch(signup(payload))
  };
};

Signup = Form.create()(Signup);

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
