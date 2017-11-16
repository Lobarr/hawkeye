import { utils } from "../helpers/utils";
import { notify } from "../helpers/notification";

export const create = payload => {
  return async dispatch => {
    try {
      await utils.call({
        endpoint: "api/v1/stream",
        method: "post",
        data: payload
      });
      dispatch({ type: "CANCELMODAL" });
      dispatch(getStreams());
      notify({
        type: "success",
        message: "Stream added!"
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
    }
  };
};

export const remove = id => {
  return async dispatch => {
    try {
      await utils.call({
        endpoint: `api/v1/stream/${id}`,
        method: "delete"
      });
      notify({
        type: "success",
        message: "Stream removed!"
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
    }
  };
};

export const getStreams = () => {
  return async dispatch => {
    try {
      const res = await utils.call({
        endpoint: "api/v1/streams"
      });
      dispatch({ type: "STREAMS", payload: { streams: res.data } });
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

export const select = stream => {
  return dispatch => {
    dispatch({ type: "SELECTSTREAM", payload: { stream } });
  };
};

export const getStream = id => {
  return async dispatch => {
    try {
      const res = await utils.call({
        endpoint: `api/v1/stream/${id}`
      });
      dispatch({ type: "STREAM", payload: { stream: res.data } });
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

export const onView = () => {
  return dispatch => {
    dispatch({ type: "VIEWMODAL" });
  };
};

export const onCancel = () => {
  return dispatch => {
    dispatch({ type: "CANCELMODAL" });
  };
};
