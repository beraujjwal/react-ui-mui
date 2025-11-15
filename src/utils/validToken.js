import jwtDecode from "jwt-decode";

export function isTokenValid(token) {
  if (!token) return false;

  try {
    const decoded = jwtDecode(token);
    if (!decoded?.exp) return false;

    const currentTime = Date.now() / 1000; // seconds
    return decoded.exp > currentTime;
  } catch (err) {
    console.error("Invalid token:", err);
    return false;
  }
}