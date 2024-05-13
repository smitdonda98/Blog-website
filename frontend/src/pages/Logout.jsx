import { UserContext } from "../context/userContext";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const { setCurrentUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentUser(null);
    navigate('/login');
  }, []);

  return (
    <>
      
    </>
  );
};

export default Logout;
