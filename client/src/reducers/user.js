const initState = {
  user: {},
  popoverVisible: false
};

const user = (state = initState, action) => {
  switch (action.type) {
    case "OPENPOPOVER":
      return Object.assign({}, state, {
        popoverVisible: true
      });
    case "CLOSEPOPOVER":
      return Object.assign({}, state, {
        popoverVisible: false
      });
    case "USER":
      return Object.assign({}, state, {
        user: action.payload.user
      });
    default:
      return state;
  }
};

export default user;
