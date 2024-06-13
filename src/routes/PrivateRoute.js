import React from 'react';
import { Navigate, Route } from 'react-router-dom'


const PrivateRoute = ({ isSignedIn, component: Component, ...rest }) => {

    // Add your own authentication on the below line.
      
    return (
      <Route
        {...rest}
        render={props =>
          isSignedIn ? (
            <Component {...props} />
          ) : (
            <Navigate to={{ pathname: '/', state: { from: props.location } }} />
          )
        }
      />
    )
  }

export default PrivateRoute
