import { GeneralActions } from "./general";

const initState = {
  modalVisible: false,
  streams: [],
  stream: {},
  selectedStream: {},
};

export const StreamActions = {
  SELECTSTREAM: "SELECTSTREAM",
  CANCELMODAL: "CANCELMODAL",
  VIEWMODAL: "VIEWMODAL",
  STREAMS: "STREAMS",
  STREAM: "STREAM",
};

export const StreamViewModes = {
  FULLSCREEN: "FULLSCREEN",
  TWOBYTWO: "TWOBYTWO",
};

const stream = (state = initState, action) => {
  switch (action.type) {
    case StreamActions.SELECTSTREAM:
      return Object.assign({}, state, {
        selectedStream: action.payload.stream,
      });
    case StreamActions.CANCELMODAL:
      return Object.assign({}, state, {
        modalVisible: false,
      });
    case StreamActions.VIEWMODAL:
      return Object.assign({}, state, {
        modalVisible: true,
      });
    case StreamActions.STREAMS:
      return Object.assign({}, state, {
        streams: action.payload.streams,
      });
    case StreamActions.STREAM:
      return Object.assign({}, state, {
        stream: action.payload.stream,
      });
    default:
      return state;
  }
};

export default stream;
