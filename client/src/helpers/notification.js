import { notification } from "antd";

/**
 * 
 * @param {object} payload 
 * @param {string="success", "error"} payload.type 
 * @param {string} payload.message
 */
export function notify(payload) {
  notification[payload.type]({
    message: payload.message,
    duration: 3
  });
}
