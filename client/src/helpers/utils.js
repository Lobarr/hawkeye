import axios from "axios";
import _ from "underscore";

export const utils = {
  STORAGE_KEY: process.env.REACT_APP_API,

  api() {
    return process.env.REACT_APP_API;
  },

  isAuthenticated() {
    return (
      _.isEmpty(sessionStorage.getItem(this.STORAGE_KEY)) === false &&
      _.isString(sessionStorage.getItem(this.STORAGE_KEY))
    );
  },

  resetToken() {
    sessionStorage.removeItem(this.STORAGE_KEY);
  },
  /**
   *
   * @param {object} payload
   * @param {string} payload.endpoint
   * @param {string="get", "post", "put", "delete"} payload.method
   * @param {object} payload.data data sent to the server
   */
  async call(payload) {
    return axios({
      baseURL: utils.api(),
      url: payload.endpoint,
      method: payload.method ? payload.method : "get",
      headers: {
        "x-hawkeye-token": sessionStorage.hawkeye,
      },
      data: payload.data ? payload.data : {},
    });
  },
};
