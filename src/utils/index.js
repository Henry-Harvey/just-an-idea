import axios from "axios";
import history from "./history";

/**
 * Contains methods for handling login state and side panel state
 */

const USER_KEY = "Login_Token";

export const IsLoggedIn = () => {
  return localStorage.getItem(USER_KEY) !== null;
};

export const GetCurrentUser = () => {
  return JSON.parse(localStorage.getItem(USER_KEY));
};

export const LogIn = (user) => {
  console.log("Logged in");
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  authAxios.defaults.headers.Authorization = `Bearer ${user.tokens.access_token}`;
};

export const LogOut = () => {
  console.log("Logged out");
  localStorage.removeItem(USER_KEY);
  authAxios.defaults.headers.Authorization = null;
};

const SIDE_PANEL_KEY = "Side_Panel_Token";

export const GetSidePanel = () => {
  return JSON.parse(localStorage.getItem(SIDE_PANEL_KEY));
};

export const SaveSidePanel = (displaySidePanel) => {
  localStorage.setItem(SIDE_PANEL_KEY, JSON.stringify(displaySidePanel));
};

export const publicAxios = axios.create({
  baseURL:
    "http://justanidea-env-1.eba-pb4a43tm.us-east-2.elasticbeanstalk.com",
  timeout: 30000,
});

export var authAxios = axios.create({
  baseURL: publicAxios.defaults.baseURL,
  timeout: publicAxios.defaults.timeout,
  headers: {
    Authorization: `Bearer ${GetCurrentUser()?.tokens.access_token}`,
  },
});

authAxios.interceptors.response.use(
  (response) =>
    new Promise((resolve, reject) => {
      resolve(response);
    }),
  (error) => {
    const originalRequest = error.config;

    // Checks if error is from front-end
    if (!error.response) {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
    if (error.response.status !== 403) {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    } else {
      console.log("Forbidden Api Route ");
      if (!originalRequest._retry) {
        originalRequest._retry = true;
        let user = JSON.parse(localStorage.getItem(USER_KEY));
        console.log(
          "Retrieve new Access Token with Refresh Token",
          user.tokens.refresh_token
        );
        publicAxios
          .get(`/account/refreshToken`, {
            headers: {
              Authorization: `Bearer ${user.tokens.refresh_token}`,
            },
          })
          .then((tokenResponse) => {
            console.log("Retrieve Access Token response", tokenResponse);
            if (tokenResponse.data === "") {
              console.log("Access Token not retrieved");
              LogOut();
              history.push(`/login`);
              return;
            }
            user.tokens.access_token = tokenResponse.data.access_token;
            localStorage.setItem(USER_KEY, JSON.stringify(user));
            authAxios.defaults.headers.Authorization = `Bearer ${tokenResponse.data.access_token}`;

            originalRequest.headers.Authorization = `Bearer ${tokenResponse.data.access_token}`;
            return axios(originalRequest);
          })
          .catch((error) => {
            console.log("Retrieve Token error", error);
            LogOut();
            history.push(`/login`);
          });
      }
    }
  }
);
