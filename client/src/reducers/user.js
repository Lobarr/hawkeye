const initState = {
  user: {},
  popoverVisible: false,
  viewProfile: false,
  updateProfile: false
};

const user = (state = initState, action) => {
  switch (action.type) {
    case "VIEWPROFILE":
      return Object.assign({}, state, {
        viewProfile: true
      });
    case "CLOSEVIEWPROFILE":
      return Object.assign({}, state, {
        viewProfile: false
      });
    case "UPDATEPROFILE":
      return Object.assign({}, state, {
        updateProfile: true
      });
    case "CLOSEUPDATEPROFILE":
      return Object.assign({}, state, {
        updateProfile: false
      });
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
