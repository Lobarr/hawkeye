import { utils } from "../helpers/utils";
import { notify } from "../helpers/notification";

export const getUser = () => {
  return async (dispatch, getState) => {
    try {
      const res = await utils.call({
        endpoint: "/api/v1/user/me"
      });
      dispatch({ type: "USER", payload: { user: res.data } });
      if (getState().user.user === {}) {
        notify({
          type: "success",
          message: `Welcome back, ${res.data.username}!`
        });
      }
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
    } catch (error) {
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

//TODO: handle 401 on all api calls
