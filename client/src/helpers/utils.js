import axios from "axios";

export const utils = {
  api() {
    return process.env.REACT_APP_API;
  },

  resetToken() {
    sessionStorage.removeItem("hawkeye");
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
        "x-hawkeye-token": sessionStorage.hawkeye
      },
      data: payload.data ? payload.data : {}
    });
  }
};
