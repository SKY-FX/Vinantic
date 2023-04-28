import React, { useState } from "react";
import PropTypes from "prop-types";
import LoginForm from "./LoginForm";
import { propOr } from "ramda";

const ProtectedRoute = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);

  const onHandle = ({ label, permission }) => {
    console.info("HANDLE GET ADMIN PERMISSION", { label, permission });
    setIsLogged(propOr(false, "ok", permission));
  };

  return <>{isLogged ? children : <LoginForm onHandle={onHandle} />}</>;
};

export default ProtectedRoute;

ProtectedRoute.propTypes = {
  children: PropTypes.element,
};

ProtectedRoute.defaultProps = {
  children: <></>,
};
