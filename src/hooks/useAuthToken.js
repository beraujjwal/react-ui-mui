import { useEffect, useState } from "react";
import { isTokenValid } from "../utils/validToken";

export function useAuthToken() {
  const [isAuthenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    setAuthenticated(isTokenValid(token));
  }, []);

  return { isAuthenticated };
}
