const initState = {
  displayMode: "FULLSCREEN",
  isLoading: false,
  denied: false,
  access: sessionStorage.getItem("hawkeye") ? true : false,
  user: {}
};

const general = (state = initState, action) => {
  switch (action.type) {
    case "LOGIN":
      return Object.assign({}, state, {
        access: true
      });
    case "LOGOUT":
      return Object.assign({}, state, {
        access: false
      });
    case "LOADING":
      return Object.assign({}, state, {
        isLoading: true
      });
    case "LOADED":
      return Object.assign({}, state, {
        isLoading: false
      });
    case "DISPLAYMODE":
      return Object.assign({}, state, {
        displayMode: action.mode
      });
    default:
      return state;
  }
};

export default general;
