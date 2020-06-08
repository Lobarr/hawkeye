import { utils } from "../../helpers/utils";
import { notify } from "../..//helpers/notification";
import { GeneralActions } from "../reducers/general";

export const login = (payload) => {
  return async (dispatch) => {
    try {
      //show loading
      dispatch({ type: GeneralActions.LOADING });
      const { data } = await utils.call({
        endpoint: "/login",
        method: "post",
        data: payload,
      });
      sessionStorage.setItem("hawkeye", data.data.token);
      dispatch({
        type: GeneralActions.LOGIN,
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
    } finally {
      dispatch({ type: GeneralActions.LOADED });
    }
  };
};

export const signup = (payload) => {
  return async (dispatch) => {
    try {
      dispatch({ type: GeneralActions.LOADING });
      await utils.call({
        endpoint: "/signup",
        method: "post",
        data: payload,
      });
      notify({
        type: "success",
        message: "You have successfully signed up!",
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
    } finally {
      dispatch({ type: GeneralActions.LOADED });
    }
  };
};

export const logout = () => {
  return (dispatch) => {
    utils.resetToken();
    dispatch({ type: GeneralActions.LOGOUT });
  };
};
