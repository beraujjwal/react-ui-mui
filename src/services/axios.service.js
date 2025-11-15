import axios from "axios";
import authHeader from "../utils/authHeader";
import { API_BASE_URL } from "../constants/ApiPath";
import { isTokenValid } from "../utils/validToken";

const instance = axios.create({
  baseURL: `${API_BASE_URL}`,
  timeout: 30000,
  headers: authHeader(),
});


api.interceptors.request.use(
  async(config) => {
    const token = localStorage.getItem("access_token");

    if (token) {
      if (isTokenValid(token)) {
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        const newToken = await refreshAccessToken();

        if (newToken) {
          localStorage.setItem("access_token", newToken);
          config.headers.Authorization = `Bearer ${newToken}`;
        } else {
          console.warn("Token expired. Redirecting to login...");
          localStorage.removeItem("access_token");
          window.location.href = "/login";
          return Promise.reject("Token expired");
        }
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Refresh token if error 401 / token expired & Logout if token is blacklisted or error 500
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // If the response is 500 and the token cannot be refreshed again, it will log out and enter the login page
    if (
      error.response.status === 500 &&
      error.response.data.error.message ===
        "Token has expired and can no longer be refreshed"
    ) {
      console.log("token is removed and logout to the login page");
      console.log(error.response);
      localStorage.removeItem("user");

      return new Promise((resolve, reject) => {
        // history nya belom bisa ngepush ke halaman cuma linknya doang terupdate
        // history.push('/login');

        console.log("redirect to login page");
        return (window.location.href = "/auth/login");
        // reject(error);
      });
    }

    console.log(error.response);

    // If the response is 401 token expired
    if (
      error.response.status === 401 &&
      error.response.data.error.message === "Token has expired"
    ) {
      console.log("the token must be refreshed");
      return instance
        .post("auth/refresh", null)
        .then((res) => {
          const config = error.config;
          localStorage.removeItem("token");
          localStorage.setItem("token", JSON.stringify(res.data.token));
          config.headers["Authorization"] = `Bearer ${res.data.token}`;

          return new Promise((resolve, reject) => {
            axios
              .request(config)
              .then((response) => {
                resolve(response);
              })
              .catch((error) => {
                reject(error);
              });
          });
        })
        .catch((error) => {
          Promise.reject(error);
        });
    }

    return Promise.reject(error);
  }
);

export default instance;