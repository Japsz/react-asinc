import React from 'react';
import {connect} from "react-redux";
import {Route, Redirect} from "react-router-dom";


const Index = props => {
  const {
    component: Component,
    ...rest
  } = props
  const token = localStorage.getItem('token')

  return (
    <Route
      {...rest}
      render={props => {
        if(token) {
          return(<Component {...props}/>)
        } else {
          return(<Redirect to={'/login'}/>)
        }
      }}

    />
      

  );
};

export default connect(null, null)(Index);