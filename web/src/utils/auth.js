import { jwtDecode } from "jwt-decode";

export function getToken() {
  return localStorage.getItem("token");
}

export function getUser() {
  const token = getToken();
  if (!token) return null;

  try {
    return jwtDecode(token); 
  } catch {
    return null;
  }
}

export function getRole() {
  const user = getUser();
  return user?.role || null;
}

export function isLoggedIn() {
  const user = getUser();
  if (!user) return false;

  if (user.exp * 1000 < Date.now()) {
    logout();
    return false;
  }

  return true;
}

export function logout() {
  localStorage.removeItem("token");
}