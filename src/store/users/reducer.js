import {initialState} from "./initialState";
import {
  GET_USER_ERROR,
  GET_USER_INIT,
  GET_USER_SUCCESS,
  GET_USERS_ERROR,
  GET_USERS_INIT,
  GET_USERS_SUCCESS,
  GET_LOGIN_ERROR,
  GET_LOGIN_INIT,
  GET_LOGIN_SUCCESS,
  ADD_USER_INIT,
  ADD_USER_SUCCESS,
  ADD_USER_ERROR,
  ADD_USER_RESET, GET_LOGIN_RESET
} from "./const";

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_USERS_INIT: {
      return {
        ...state,
        usersLoading: true
      }
    }
    case GET_USERS_SUCCESS: {
      return {
        ...state,
        users: action.payload,
        usersLoading: false,
        usersError: false,
      }
    }
    case GET_USERS_ERROR: {
      return {
        ...state,
        users: state.users,
        usersLoading: false,
        usersError: true,
      }
    }
    case GET_USER_INIT: {
      return {
        ...state,
        userLoading: true
      }
    }
    case GET_USER_SUCCESS: {
      localStorage.setItem('user', JSON.stringify(action.payload))
      return {
        ...state,
        userLoading: false,
        userError: false,
      }
    }
    case GET_USER_ERROR: {
      return {
        ...state,
        userLoading: false,
        userError: true,
      }
    }
    case GET_LOGIN_INIT: {
      return {
        ...state,
        loginSuccess: false,
        loginError: false,
        loginLoading: true
      }
    }
    case GET_LOGIN_SUCCESS: {
      localStorage.setItem('user',JSON.stringify(action.payload.user))
      localStorage.setItem('token',action.payload.token)
      return {
        ...state,
        loginSuccess: true,
        loginLoading: false,
        loginError: false,
      }
    }
    case GET_LOGIN_RESET: {
      return {
        ...state,
        loginSuccess: false,
        loginLoading: false,
        loginError: false,
      }
    }
    case GET_LOGIN_ERROR: {
      return {
        ...state,
        loginSuccess: false,
        loginLoading: false,
        loginError: true,
        loginErrMsg: action.payload
      }
    }
    case ADD_USER_INIT: {
      return ({
        ...state,
        addUserSuccess: false,
        addUserLoading: true,
        addUserError: false,
      })

    }
    case ADD_USER_SUCCESS: {
      return ({
        ...state,
        addUserSuccess: true,
        addUserLoading: false,
        addUserError: false,
      })
    }
    case ADD_USER_ERROR: {
      return ({
        ...state,
        addUserLoading: false,
        addUserError: true,
        addUserErrMsg: action.payload,
      })
    }
    case ADD_USER_RESET: {
      return ({
        ...state,
        addUserSuccess: false,
        addUserLoading: false,
        addUserError: false,
      })
    }
    default: {
      return state
    }
  }
}