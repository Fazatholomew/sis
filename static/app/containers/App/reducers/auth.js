import jwtDecode from 'jwt-decode';

import { createReducer } from './misc';
import {
  LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILURE,
    LOGIN_USER_REQUEST,
  LOGOUT_USER,
    REGISTER_USER_FAILURE,
  REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
} from './constants';

const initialState = {
  token: null,
    userName: null,
    isAuthenticated: false,
    isAuthenticating: false,
    statusText: null,
    isRegistering: false,
    isRegistered: false,
    registerStatusText: null,
    userProfile: {name: '', email: '', id: null},
};

export default createReducer(initialState, {
  [LOGIN_USER_REQUEST]: state =>
        Object.assign({}, state, {
      isAuthenticating: true,
            statusText: null,
    }),
  [LOGIN_USER_SUCCESS]: (state, payload) =>
      Object.assign({}, state, {
          isAuthenticating: false,
          isAuthenticated: true,
          token: payload.token,
          userName: jwtDecode(payload.token).email,
          userId: jwtDecode(payload.token).id,
          statusText: 'You have been successfully logged in.',
      }),
  ['SAVE_USER_INFO']: (state, payload) =>
      Object.assign({}, state, {
      userProfile: payload,
  }),
  [LOGIN_USER_FAILURE]: (state, payload) =>
    Object.assign({}, state, {
            isAuthenticating: false,
            isAuthenticated: false,
            token: null,
            userName: null,
            statusText: `Authentication Error: ${payload.status} ${payload.statusText}`,
      },
    ),
  [LOGOUT_USER]: state =>
        Object.assign({}, state, {
            isAuthenticated: false,
            token: null,
            userName: null,
            statusText: 'You have been successfully logged out.',
    }),
    [REGISTER_USER_SUCCESS]: (state, payload) =>
    Object.assign({}, state, {
            isAuthenticating: false,
      isAuthenticated: true,
            isRegistering: false,
            token: payload.token,
			userName: jwtDecode(payload.token).email,
			userId: jwtDecode(payload.token).id,
            registerStatusText: 'You have been successfully logged in.',
    }),
    [REGISTER_USER_REQUEST]: (state) =>
        Object.assign({}, state, {
            isRegistering: true,
    }),
    [REGISTER_USER_FAILURE]: (state, payload) =>
        Object.assign({}, state, {
      isAuthenticated: false,
            token: null,
            userName: null,
            registerStatusText: `Register Error: ${payload.status} ${payload.statusText}`,
      },
    ),
});
