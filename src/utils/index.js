const TOKEN_KEY = "Token";

export function IsLoggedIn() {
  return localStorage.getItem(TOKEN_KEY) !== null;
};

export function LogIn() {
  console.log('Logged in')
  localStorage.setItem(TOKEN_KEY, "Login");
};

export function LogOut() {
  console.log('Logged out')
  localStorage.removeItem(TOKEN_KEY);
};


