import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {getUsersAction} from "./store/users/actions";

const Users = props => {
  useEffect(()=> {
    props.getUsersComponent('https://jsonplaceholder.typicode.com/users/')
  },[]);

  if (props.usersLoading) {
    return <div>Cargando...</div>
  }
  if (props.usersError) {
    return <div>Es un error...</div>
  }
  return (
    <ul>{props.users.map((user, index) =>
      <Link to={`/user/${user.id}`}> <li key={index}>{user.name}</li></Link>)}</ul>
  );
};

const mapStateToProps = state => ({
  users: state.users.users, //selectors reselect
  usersLoading: state.users.usersLoading,
  usersError: state.users.usersError
});

const mapDispatchToPros = dispatch => ({
  getUsersComponent: payload => dispatch(getUsersAction(payload))
});

export default connect(mapStateToProps, mapDispatchToPros)(Users);