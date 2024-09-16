import React, { ComponentType } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useAuth } from '../contexts/Auth/AuthContext';

interface PrivateRouteProps extends RouteProps {
  component: ComponentType<any>;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
  ...rest
}) => {
  const { signed } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) =>
        signed ? <Component {...props} /> : <Redirect to='/signin' />
      }
    />
  );
};

export default PrivateRoute;
