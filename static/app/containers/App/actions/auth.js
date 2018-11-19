import { browserHistory } from 'react-router';

import {
  LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILURE,
    LOGIN_USER_REQUEST,
  LOGOUT_USER,
    REGISTER_USER_FAILURE,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
} from './constants.js';

import { parseJSON } from './utils/misc';

export function checkToken() {
      return {
          type: 'SAGA_CHECK_TOKEN',
      };
  }

export function loginUserSuccess(token) {
  localStorage.setItem('token', token);
    return {
        type: 'LOGIN_USER_SUCCESS',
    payload: {
            token,
        },
    };
}

export function get_user(id) {
    return {
    type: 'SAGA_GET_USER',
		payload: {id},
  };
}

export function loginUserFailure(error) {
    localStorage.removeItem('token');
  return {
        type: LOGIN_USER_FAILURE,
        payload: {
            status: error.response.status,
            statusText: error.response.statusText,
    },
    };
}

export function loginUserRequest(email, password) {
    return {
    type: 'SAGA_LOGIN',
		payload: {email, password},
  };
}

export function logout() {
    localStorage.removeItem('token');
  return {
        type: LOGOUT_USER,
    };
}

export function logoutAndRedirect() {
  return dispatch => {
        dispatch(logout());
    browserHistory.push('/');
    };
}

export function redirectToRoute(route) {
  return () => {
        browserHistory.push(route);
    };
}

export function registerUserRequest() {
  return {
        type: REGISTER_USER_REQUEST,
    };
}

export function registerUserSuccess(token) {
    localStorage.setItem('token', token);
  return {
        type: REGISTER_USER_SUCCESS,
        payload: {
      token,
    },
    };
}

export function registerUserFailure(error) {
  localStorage.removeItem('token');
  return {
        type: REGISTER_USER_FAILURE,
        payload: {
            status: error.response.status,
            statusText: error.response.statusText,
    },
    };
}

export function registerUser(name, email, password) {
    return {type: 'SAGA_REGISTER', payload: {name, email, password}}
}

export function createUserWrapper(name, email, password) {
		create_user(name, email, password)
    .then(parseJSON)
    .then(response => {
                try {
                    return response;
      } catch (e) {
                    return registerUserFailure({
          response: {
                            status: 403,
            statusText: 'Invalid token',
          },
                    });
                }
    })
            .catch(error => registerUserFailure({
                    response: {
                        status: 403,
                        statusText: 'User with that email already exists',
                    },
                }
                ));
}
