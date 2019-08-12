import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {getUserAction} from "./store/users/actions";

const User = props => {

  useEffect(() => {
    props.getUserComponent(props.match.params.id)
  }, []);

  if (props.userLoading) {
    return <div>Cargando...</div>
  }
  if (props.userError) {
    return <div>Es un error...</div>
  }

  return (
    <div>
      {props.user.username}
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.users.user,
  userLoading: state.users.userLoading,
  userError: state.users.userError
});

const mapDispatchToProps = dispatch => ({
  getUserComponent: payload => dispatch(getUserAction(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(User);