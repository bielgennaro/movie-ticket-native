import React, { useState } from "react";
import UserContext from "../../context";

const Provider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [userName, setUserName] = useState(null);
  const [userEmail, setUserEmail] = useState(null);

  return (
    <UserContext.Provider
      value={{
        isAdmin,
        setIsAdmin,
        isLoggedIn,
        setIsLoggedIn,
        userName,
        setUserName,
        userEmail,
        setUserEmail,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default Provider;
