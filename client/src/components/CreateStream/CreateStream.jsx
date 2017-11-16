import React from "react";
import { connect } from "react-redux";
import { Form, Modal, Input, Select } from "antd";
import { create, onCancel } from "../../actions/stream";
const FormItem = Form.Item;

class CreateStream extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkURL = this.checkURL.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((errors, values) => {
      if (!errors) {
        console.log(values);
        this.props.create(values);
      }
    });
    this.props.form.resetFields();
  }
  checkURL(rule, value, callback) {
    if (!value.includes("rtmp://")) {
      callback("Please input an rtmp url");
    }
    callback();
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Modal
        visible={this.props.stream.modalVisible}
        title="Create New Stream"
        okText="Create"
        cancelText="Cancel"
        onCancel={this.props.onCancel}
        onOk={this.handleSubmit}
      >
        <Form>
          <FormItem>
            {getFieldDecorator("name", {
              rules: [
                {
                  required: true,
                  message: "Please input the name of the stream"
                }
              ]
            })(<Input size="large" placeholder="Name" />)}
          </FormItem>
          <FormItem>
            {getFieldDecorator("url", {
              rules: [
                {
                  required: true,
                  message: "Please input the url of the stream"
                },
                {
                  validator: this.checkURL
                }
              ]
            })(<Input size="large" placeholder="URL" />)}
          </FormItem>
          <FormItem>
            {getFieldDecorator("location", {
              rules: [
                {
                  required: true,
                  message: "Please input the location of the stream"
                }
              ]
            })(<Input size="large" placeholder="Location" />)}
          </FormItem>
          <FormItem>
            {getFieldDecorator("resolution", {
              rules: [
                {
                  required: true,
                  message: "Please input the resolution of the stream"
                }
              ]
            })(
              <Select placeholder="Select a resolution">
                <Select.Option value="720p">720p</Select.Option>
                <Select.Option value="D1">D1</Select.Option>
              </Select>
            )}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

const mapStateToProps = state => {
  return {
    general: state.general,
    stream: state.stream
  };
};

const mapDispatchToProps = dispatch => {
  return {
    create: payload => dispatch(create(payload)),
    onCancel: () => dispatch(onCancel())
  };
};

CreateStream = Form.create()(CreateStream);

export default connect(mapStateToProps, mapDispatchToProps)(CreateStream);
