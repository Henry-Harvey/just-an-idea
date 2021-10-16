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

export function LogIn(user) {
  console.log("Logged in");
  localStorage.setItem(USER_KEY, JSON.stringify(user));
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

export const authAxios = axios.create({
  baseURL: publicAxios.defaults.baseURL,
  timeout: publicAxios.defaults.timeout,
  headers: {
    Authorization: `Bearer ${GetCurrentUser().tokens.access_token}`,
  },
});
