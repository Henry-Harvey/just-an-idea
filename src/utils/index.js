import axios from "axios";

/**
 * Contains methods for handling login state and side panel state
 */

const USER_KEY = "Login_Token";

export function IsLoggedIn() {
  return localStorage.getItem(USER_KEY) !== null;
}

export function GetCurrentUser() {
  return JSON.parse(localStorage.getItem(USER_KEY));
}

export function ResetAuthAxios() {
  authAxios = axios.create({
    baseURL: publicAxios.defaults.baseURL,
    timeout: publicAxios.defaults.timeout,
    headers: {
      Authorization: `Bearer ${GetCurrentUser()?.tokens.access_token}`,
    },
  });
}

export function LogIn(user) {
  console.log("Logged in");
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  ResetAuthAxios();

  authAxios.interceptors.response.use(
    (response) =>
      new Promise((resolve, reject) => {
        resolve(response);
      }),
    (error) => {
      // Checks if error is from front-end
      if (!error.response) {
        return new Promise((resolve, reject) => {
          reject(error);
        });
      }
      if (error.response.status === 403) {
        console.log("Forbidden Api Route ");
        let user = JSON.parse(localStorage.getItem(USER_KEY));
        localStorage.removeItem(USER_KEY);

        console.log(
          "Retrieve new Access Token with Refresh Token",
          user?.tokens.refresh_token
        );
        publicAxios
          .get(`/account/refreshToken`, {
            headers: {
              Authorization: `Bearer ${user?.tokens.refresh_token}`,
            },
          })
          .then((tokenResponse) => {
            console.log("Retrieve Access Token response", tokenResponse);
            if (tokenResponse.data === "") {
              console.log("Access Token not retrieved... may be expired");
              return;
            }
            user.tokens.access_token = tokenResponse.data.access_token;
            console.log("!!!!2", user);
            localStorage.setItem(USER_KEY, JSON.stringify(user));
            ResetAuthAxios();
            return authAxios.request(error.config);
          })
          .catch((error) => {
            console.log("Retrieve Token error", error);
          });
      } else {
        return new Promise((resolve, reject) => {
          reject(error);
        });
      }
    }
  );
}

export function LogOut() {
  console.log("Logged out");
  localStorage.removeItem(USER_KEY);
}

const SIDE_PANEL_KEY = "Side_Panel_Token";

export function GetSidePanel() {
  return JSON.parse(localStorage.getItem(SIDE_PANEL_KEY));
}

export function SaveSidePanel(displaySidePanel) {
  localStorage.setItem(SIDE_PANEL_KEY, JSON.stringify(displaySidePanel));
}

export const publicAxios = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 2500,
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
    // Checks if error is from front-end
    if (!error.response) {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
    if (error.response.status === 403) {
      console.log("Forbidden Api Route ");
      let user = JSON.parse(localStorage.getItem(USER_KEY));
      localStorage.removeItem(USER_KEY);

      console.log(
        "Retrieve new Access Token with Refresh Token",
        user?.tokens.refresh_token
      );
      publicAxios
        .get(`/account/refreshToken`, {
          headers: {
            Authorization: `Bearer ${user?.tokens.refresh_token}`,
          },
        })
        .then((tokenResponse) => {
          console.log("Retrieve Access Token response", tokenResponse);
          if (tokenResponse.data === "") {
            console.log("Access Token not retrieved... may be expired");
            return;
          }
          user.tokens.access_token = tokenResponse.data.access_token;
          console.log("!!!!1", user);
          localStorage.setItem(USER_KEY, JSON.stringify(user));
          authAxios = axios.create({
            baseURL: publicAxios.defaults.baseURL,
            timeout: publicAxios.defaults.timeout,
            headers: {
              Authorization: `Bearer ${GetCurrentUser()?.tokens.access_token}`,
            },
          });
        })
        .catch((error) => {
          console.log("Retrieve Token error", error);
        });
    } else {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
  }
);
