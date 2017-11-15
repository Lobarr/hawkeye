const initState = {
  user: {}
};

const user = (state = initState, action) => {
  switch (action.type) {
    case "USER":
      return Object.assign({}, state, {
        user: action.payload.user
      });
    default:
      return state;
  }
};

export default user;
