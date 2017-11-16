import { utils } from "../helpers/utils";
import { notify } from "../helpers/notification";

export const login = payload => {
  return async dispatch => {
    try {
      //show loading
      dispatch({ type: "LOADING" });
      const res = await utils.call({
        endpoint: "/api/v1/login",
        method: "post",
        data: payload
      });
      sessionStorage.setItem("hawkeye", res.data.token);
      dispatch({ type: "LOGIN" });
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
    } finally {
      dispatch({ type: "LOADED" });
    }
  };
};

export const signup = payload => {
  return async dispatch => {
    try {
      dispatch({ type: "LOADING" });
      await utils.call({
        endpoint: "/api/v1/signup",
        method: "post",
        data: payload
      });
      notify({
        type: "success",
        message: "You have successfully signed up!"
      });
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
    } finally {
      dispatch({ type: "LOADED" });
    }
  };
};

export const logout = () => {
  return dispatch => {
    utils.resetToken();
    dispatch({ type: "LOGOUT" });
  };
};