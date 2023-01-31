import React, { useState } from 'react';
import PropTypes from 'prop-types';
import LoginForm from './LoginForm';

const ProtectedRoute = ({ children }) => {
  const [isLogged] = useState(false);
  return <>
    { isLogged
      ? children
      : <LoginForm />
    }
  </>
}

export default ProtectedRoute

ProtectedRoute.propTypes = {
  children: PropTypes.element
};

ProtectedRoute.defaultProps = {
  children: <></>
};