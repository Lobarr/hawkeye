import React from "react";
import { connect } from "react-redux";
import { Modal, Form, Input } from "antd";
import { closeUpdateProfile, update } from "../../store/actions/user";
const FormItem = Form.Item;

class UpdateProfile extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((errors, values) => {
      if (!errors) {
        this.props.update(values.username);
      }
    });
    this.props.form.resetFields();
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Modal
        visible={this.props.user.updateProfile}
        title="Update"
        okText="Update"
        cancelText="Cancel"
        onOk={this.handleSubmit}
        onCancel={this.props.closeUpdateProfile}
      >
        <Form>
          <FormItem>
            {getFieldDecorator("username", {
              rules: [
                {
                  required: true,
                  message: "Please input the username",
                },
              ],
            })(<Input size="large" placeholder="Username" />)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeUpdateProfile: () => dispatch(closeUpdateProfile()),
    update: (username) => dispatch(update(username)),
  };
};

UpdateProfile = Form.create()(UpdateProfile);

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProfile);
