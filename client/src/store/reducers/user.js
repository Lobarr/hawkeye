const initState = {
  user: {},
  popoverVisible: false,
  viewProfile: false,
  updateProfile: false,
};

export const UserActions = {
  CLOSEPOPOVER: "CLOSEPOPOVER",
  CLOSEUPDATEPROFILE: "CLOSEUPDATEPROFILE",
  CLOSEVIEWPROFILE: "CLOSEVIEWPROFILE",
  OPENPOPOVER: "OPENPOPOVER",
  UPDATEPROFILE: "UPDATEPROFILE",
  USER: "USER",
  VIEWPROFILE: "VIEWPROFILE",
};

const user = (state = initState, action) => {
  switch (action.type) {
    case UserActions.VIEWPROFILE:
      return Object.assign({}, state, {
        viewProfile: true,
      });
    case UserActions.CLOSEVIEWPROFILE:
      return Object.assign({}, state, {
        viewProfile: false,
      });
    case UserActions.UPDATEPROFILE:
      return Object.assign({}, state, {
        updateProfile: true,
      });
    case UserActions.CLOSEUPDATEPROFILE:
      return Object.assign({}, state, {
        updateProfile: false,
      });
    case UserActions.OPENPOPOVER:
      return Object.assign({}, state, {
        popoverVisible: true,
      });
    case UserActions.CLOSEPOPOVER:
      return Object.assign({}, state, {
        popoverVisible: false,
      });
    case UserActions.USER:
      return Object.assign({}, state, {
        user: action.payload.user,
      });
    default:
      return state;
  }
};

export default user;
