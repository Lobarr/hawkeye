const { utils } = require("../../helpers/utils");

const initState = {
  isLoading: false,
  denied: false,
  access: utils.isAuthenticated(),
  user: {},
};

export const GeneralActions = {
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
  LOADING: "LOADING",
  LOADED: "LOADED",
  DISPLAYMODE: "DISPLAYMODE",
};

const general = (state = initState, action) => {
  switch (action.type) {
    case GeneralActions.LOGIN:
      return Object.assign({}, state, {
        access: true,
      });
    case GeneralActions.LOGOUT:
      return Object.assign({}, state, {
        access: false,
      });
    case GeneralActions.LOADING:
      return Object.assign({}, state, {
        isLoading: true,
      });
    case GeneralActions.LOADED:
      return Object.assign({}, state, {
        isLoading: false,
      });
    case GeneralActions.DISPLAYMODE:
      return Object.assign({}, state, {
        displayMode: action.mode,
      });
    default:
      return state;
  }
};

export default general;
