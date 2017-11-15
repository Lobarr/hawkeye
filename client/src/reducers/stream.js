const initState = {
  modalVisible: false,
  streams: [],
  stream: {}
};

const stream = (state = initState, action) => {
  switch (action.type) {
    case "CANCELMODAL":
      return Object.assign({}, state, {
        modalVisible: false
      });
    case "VIEWMODAL":
      return Object.assign({}, state, {
        modalVisible: true
      });
    case "STREAMS":
      return Object.assign({}, state, {
        streams: action.payload.streams
      });
    case "STREAM":
      return Object.assign({}, state, {
        streams: action.payload.stream
      });
    default:
      return state;
  }
};

export default stream;
