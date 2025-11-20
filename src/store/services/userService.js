import axios from '../../services/axios.service';
import { API_VERSION_1_0, API_USER_SERVICE } from '../../constants/Path';

const moduleRoot = API_USER_SERVICE + API_VERSION_1_0;


class userService {

  registerUser(data) {
    return axios.post(`${moduleRoot}/sign-up`, data);
  }

  verifyAccount(userId, token, data) {
    return axios.post(`${moduleRoot}/verify/${userId}/${token}`, data);
  }

  loginUser(data) {
    return axios.post(`${moduleRoot}/auth/sign-in`, data);
  }

  forgotPassword(data) {
    return axios.post(`${moduleRoot}/auth/forgot-password`, data);
  }

  resetPassword(userId, token, data) {
    return axios.post(`${moduleRoot}/reset-password/${userId}/${token}`, data);
  }

}
export default new userService();