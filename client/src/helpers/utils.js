import axios from "axios";

export const utils = {
  api() {
    return process.env.REACT_APP_API;
  },
  api_dev() {
    return "http://localhost:3001";
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
      baseURL:
        process.env.NODE_ENV === "production" ? utils.api() : utils.api_dev(),
      url: payload.endpoint,
      method: payload.method ? payload.method : "get",
      headers: {
        "x-hawkeye-token": sessionStorage.hawkeye
      },
      data: payload.data ? payload.data : {}
    });
  }
};
