// import React from "react";
import { Modal } from "antd";
const confirm = Modal.confirm;

const ConfirmDelete = (title, ok) =>
  confirm({
    title,
    okText: "Yes",
    okType: "danger",
    cancelText: "No",
    onOk() {
      ok();
    }
  });

export default ConfirmDelete;
