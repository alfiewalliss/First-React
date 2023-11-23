import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3005/user/do-nothing/", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });

        const data = await response.json();
        console.log("LOGGEDIN" + data.loggedIn);
        if (data.loggedIn) {
          console.log("Response data:", data);
          setAuthenticated(true);
        } else {
          setAuthenticated(false);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
        setAuthenticated(false);
      } finally {
        setLoading(false); // Set loading state to false when done
      }
    };

    fetchData();
  }, []);

  // If still loading, display a loading indicator or placeholder
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // If authorized, return an outlet that will render child elements
  // If not, return element that will navigate to login page
  return authenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
