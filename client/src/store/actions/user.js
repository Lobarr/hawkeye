import { utils } from "../../helpers/utils";
import { notify } from "../../helpers/notification";
import { omit } from "underscore";
import { UserActions } from "../reducers/user";
import { GeneralActions } from "../reducers/general";

export const getUser = () => {
  return async (dispatch, getState) => {
    try {
      const { data } = await utils.call({
        endpoint: "/user/me",
      });
      dispatch({ type: UserActions.USER, payload: { user: data.data } });
    } catch (err) {
      if (!err.response) {
        notify({
          type: "error",
          message: "Unable to connect to server!",
        });
      } else {
        notify({
          type: "error",
          message: err.response.data.status,
        });
      }
    }
  };
};

export const update = (username) => {
  return async (dispatch) => {
    try {
      const { data } = await utils.call({
        endpoint: "/user/me",
        method: "patch",
        data: {
          username,
        },
      });
      notify({
        type: "success",
        message: "Successfully updated user!",
      });
      sessionStorage.setItem("hawkeye", data.data.token);
      dispatch({
        type: UserActions.USER,
        payload: { user: omit(data.data, "token") },
      });
    } catch (err) {
      if (!err.response) {
        notify({
          type: "error",
          message: "Unable to connect to server!",
        });
      } else {
        notify({
          type: "error",
          message: err.response.data.status,
        });
      }
    }
  };
};

export const remove = () => {
  return async (dispatch) => {
    try {
      await utils.call({
        endpoint: "/user/me",
        method: "delete",
      });
      utils.resetToken();
      dispatch({ type: GeneralActions.LOGOUT });
    } catch (err) {
      if (!err.response) {
        notify({
          type: "error",
          message: "Unable to connect to server!",
        });
      } else {
        notify({
          type: "error",
          message: err.response.data.status,
        });
      }
    }
  };
};

export const openPopover = () => {
  return (dispatch) => {
    dispatch({ type: UserActions.OPENPOPOVER });
  };
};

export const closePopover = () => {
  return (dispatch) => {
    dispatch({ type: UserActions.CLOSEPOPOVER });
  };
};

export const viewProfile = () => {
  return (dispatch) => {
    dispatch({ type: UserActions.VIEWPROFILE });
  };
};

export const closeViewProfile = () => {
  return (dispatch) => {
    dispatch({ type: UserActions.CLOSEVIEWPROFILE });
  };
};

export const updateProfile = () => {
  return (dispatch) => {
    dispatch({ type: UserActions.UPDATEPROFILE });
  };
};

export const closeUpdateProfile = () => {
  return (dispatch) => {
    dispatch({ type: UserActions.CLOSEUPDATEPROFILE });
  };
};
