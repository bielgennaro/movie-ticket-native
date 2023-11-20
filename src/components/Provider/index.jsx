import React, { useState } from "react";
import UserContext from "../../context";

const Provider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [userId, setUserId] = useState(null);

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
        userId,
        setUserId,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default Provider;
