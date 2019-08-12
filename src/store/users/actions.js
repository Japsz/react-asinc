import {
  GET_USER_ERROR,
  GET_USER_INIT,
  GET_USER_SUCCESS,
  GET_USERS_ERROR,
  GET_USERS_INIT,
  GET_USERS_SUCCESS,
  GET_LOGIN_ERROR,
  GET_LOGIN_INIT,
  GET_LOGIN_RESET,
  GET_LOGIN_SUCCESS, ADD_USER_INIT, ADD_USER_ERROR, ADD_USER_SUCCESS, ADD_USER_RESET,

} from "./const";
import {getUser, getUsers, getLogin, postUser} from "./server";

export const getUsersAction = url => {
  return dispatch => {
    dispatch({type: GET_USERS_INIT});
    getUsers(url).then(response => {
      dispatch({type: GET_USERS_SUCCESS, payload: response.data})
    }).catch(() => {
      dispatch({type: GET_USERS_ERROR})
    })
  }
};

export const getUserAction = id => {
  return dispatch => {
    dispatch({type: GET_USER_INIT});
    getUser(id).then(response => {
      dispatch({type: GET_USER_SUCCESS, payload: response.data})
    }).catch(() => {
      dispatch({type: GET_USER_ERROR})
    })
  }
};

export const getLoginAction = credentials => {
  return dispatch => {
    dispatch({type: GET_LOGIN_INIT});
    getUsers().then(response => {
      let array = response.data.filter((item) => {
        return item.email === credentials.email && item.password === credentials.password
      })
      if(array.length){
        getLogin().then(response => {
          dispatch({type: GET_LOGIN_SUCCESS, payload: {...response.data, user:array[0]}})
        }).catch(() => {
          dispatch({type: GET_LOGIN_ERROR, payload: 'No se pudo conseguir el Token'})
        })
      } else {
        dispatch({type: GET_LOGIN_ERROR, payload: 'Las credenciales son incorrectas'})
      }
    }).catch(() =>{
      dispatch({type: GET_LOGIN_ERROR, payload: ''})
    })
  }
};

export const addUserAction = user => {
  return dispatch => {
    dispatch({type: ADD_USER_INIT})
    getUsers().then(response => {
      let array = response.data.filter((item) => {
        return item.email === user.email
      })
      if (array.length) {
        dispatch({type: ADD_USER_ERROR, payload: 'El correo ingresado ya existe'})
      } else {
        postUser(user).then(response => {
          dispatch({type: ADD_USER_SUCCESS, payload: response.data})
        }).catch(() => {
          dispatch({type: ADD_USER_ERROR, payload: 'No se pudo crear el usuario'})
        })
      }
    }).catch(() => {
      dispatch({type: ADD_USER_ERROR, payload: 'Error al Conectarse a l BD'})
    })
  }
}

export const resetAdd = () => {
  return dispatch => {
    dispatch({type: ADD_USER_RESET})
  }
}

export const resetLogin = () => {
  return dispatch => {
    dispatch({type: GET_LOGIN_RESET})
  }
}
