import { utils } from "../helpers/utils";
import { notify } from "../helpers/notification";

export const getUser = () => {
  return async (dispatch, getState) => {
    try {
      const res = await utils.call({
        endpoint: "/api/v1/user/me"
      });
      if (!getState().user.user === {}) {
        notify({
          type: "success",
          message: `Welcome back, ${res.data.username}!`
        });
      }
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

export const remove = () => {
  return async dispatch => {
    try {
      await utils.call({
        endpoint: "/api/v1/user/me",
        method: "delete"
      });
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

//TODO: handle 401 on all api calls
