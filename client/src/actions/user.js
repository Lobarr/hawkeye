import { utils } from "../helpers/utils";
import { notify } from "../helpers/notification";
import { omit } from "underscore";

export const getUser = () => {
  return async (dispatch, getState) => {
    try {
      const res = await utils.call({
        endpoint: "/api/v1/user/me"
      });
      dispatch({ type: "USER", payload: { user: res.data } });
    } catch (err) {
      if (!err.response) {
        notify({
          type: "error",
          message: "Unable to connect to server!"
        });
      } else {
        notify({
          type: "error",
          message: err.response.data.status
        });
      }
    }
  };
};

export const update = username => {
  return async dispatch => {
    try {
      const res = await utils.call({
        endpoint: "/api/v1/user/me",
        method: "patch",
        data: {
          username
        }
      });
      notify({
        type: "success",
        message: "Successfully updated user!"
      });
      sessionStorage.setItem("hawkeye", res.data.token);
      dispatch({ type: "USER", payload: { user: omit(res.data, "token") } });
    } catch (err) {
      if (!err.response) {
        notify({
          type: "error",
          message: "Unable to connect to server!"
        });
      } else {
        notify({
          type: "error",
          message: err.response.data.status
        });
      }
    }
  };
};

export const remove = () => {
  return async dispatch => {
    try {
      await utils.call({
        endpoint: "/api/v1/user/me",
        method: "delete"
      });
      utils.resetToken();
      dispatch({ type: "LOGOUT" });
    } catch (err) {
      if (!err.response) {
        notify({
          type: "error",
          message: "Unable to connect to server!"
        });
      } else {
        notify({
          type: "error",
          message: err.response.data.status
        });
      }
    }
  };
};

export const openPopover = () => {
  return dispatch => {
    dispatch({ type: "OPENPOPOVER" });
  };
};

export const closePopover = () => {
  return dispatch => {
    dispatch({ type: "CLOSEPOPOVER" });
  };
};

export const viewProfile = () => {
  return dispatch => {
    dispatch({ type: "VIEWPROFILE" });
  };
};

export const closeViewProfile = () => {
  return dispatch => {
    dispatch({ type: "CLOSEVIEWPROFILE" });
  };
};

export const updateProfile = () => {
  return dispatch => {
    dispatch({ type: "UPDATEPROFILE" });
  };
};

export const closeUpdateProfile = () => {
  return dispatch => {
    dispatch({ type: "CLOSEUPDATEPROFILE" });
  };
};
