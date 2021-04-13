const TOKEN_KEY = "Token";

export function IsLoggedIn() {
  return localStorage.getItem(TOKEN_KEY) !== null;
};

export function getCurrentUser() {
  return JSON.parse(localStorage.getItem(TOKEN_KEY));
};

export function LogIn(user) {
  console.log('Logged in')
  localStorage.setItem(TOKEN_KEY, JSON.stringify(user));
};

export function LogOut() {
  console.log('Logged out')
  localStorage.removeItem(TOKEN_KEY);
};


