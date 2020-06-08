import { utils } from "../../helpers/utils";
import { notify } from "../../helpers/notification";
import { StreamActions } from "../reducers/stream";

export const create = (payload) => {
  return async (dispatch) => {
    try {
      await utils.call({
        endpoint: "/stream",
        method: "post",
        data: payload,
      });
      dispatch({ type: StreamActions.CANCELMODAL });
      dispatch(getStreams());
      notify({
        type: "success",
        message: "Stream added!",
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

export const remove = (id) => {
  return async (dispatch) => {
    try {
      await utils.call({
        endpoint: `/stream/${id}`,
        method: "delete",
      });
      notify({
        type: "success",
        message: "Stream removed!",
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

export const getStreams = () => {
  return async (dispatch) => {
    try {
      const { data } = await utils.call({
        endpoint: "/stream",
      });
      dispatch({
        type: StreamActions.STREAMS,
        payload: { streams: data.data },
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

export const select = (stream) => {
  return (dispatch) => {
    dispatch({ type: StreamActions.SELECTSTREAM, payload: { stream } });
  };
};

export const getStream = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await utils.call({
        endpoint: `/stream/${id}`,
      });
      dispatch({ type: StreamActions.STREAM, payload: { stream: data.data } });
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

export const onView = () => {
  return (dispatch) => {
    dispatch({ type: StreamActions.VIEWMODAL });
  };
};

export const onCancel = () => {
  return (dispatch) => {
    dispatch({ type: StreamActions.CANCELMODAL });
  };
};
