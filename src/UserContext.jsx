import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [username, setUsername] = useState(null);
  const [id, setId] = useState(null);
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track errors

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.warn("No token found, user is not authenticated.");
      setLoading(false);
      return;
    }

    axios
      .get("http://localhost:4040/profile", {
        withCredentials: true, // Allow cookies if using sessions
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setId(response.data.userId);
        setUsername(response.data.username);
      })
      .catch((error) => {
        console.error(
          "Error fetching profile:",
          error.response?.data || error.message
        );
        setError(error.response?.data?.error || "Failed to fetch profile");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <UserContext.Provider
      value={{ username, setUsername, id, setId, loading, error }}
    >
      {children}
    </UserContext.Provider>
  );
}
