/**
 * Contains methods for handling login state and side panel state
 */

const LOGIN_KEY = "Login_Token";

export function IsLoggedIn() {
  return localStorage.getItem(LOGIN_KEY) !== null;
}

export function GetCurrentUser() {
  return JSON.parse(localStorage.getItem(LOGIN_KEY));
}

export function LogIn(user) {
  console.log("Logged in");
  localStorage.setItem(LOGIN_KEY, JSON.stringify(user));
}

export function LogOut() {
  console.log("Logged out");
  localStorage.removeItem(LOGIN_KEY);
}

const SIDE_PANEL_KEY = "Side_Panel_Token";

export function GetSidePanel() {
  return JSON.parse(localStorage.getItem(SIDE_PANEL_KEY));
}

export function SaveSidePanel(displaySidePanel) {
  localStorage.setItem(SIDE_PANEL_KEY, JSON.stringify(displaySidePanel));
}
