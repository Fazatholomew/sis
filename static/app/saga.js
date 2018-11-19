import { takeLatest, call, put } from 'redux-saga/effects';
import jwtDecode from 'jwt-decode';
import { registerUserFailure } from 'containers/App/actions/auth';
import {
  create_user,
  get_token,
  get_entries,
  create_offer,
  delete_offer,
  patch_join,
  get_users,
  create_request,
  delete_request,
  get_user,
  check_token
} from 'containers/App/actions/utils/http_functions';

import { navigateto } from 'containers/App/actions/router';

// Individual exports for testing
function* register(action) {
  const { name, email, password } = action.payload;
  try {
    const response = yield call(create_user, name, email, password);
    yield localStorage.setItem('token', response.data.token);
    yield put({
      type: 'REGISTER_USER_SUCCESS',
      payload: { token: response.data.token },
    });
    yield put(yield call(navigateto, '/home'));
  } catch (e) {
    yield put(yield call(registerUserFailure(e)));
  }
}

function* login(action) {
  const { email, password } = action.payload;
  try {
    const response = yield call(get_token, email, password);
    yield localStorage.setItem('token', response.data.token);
    yield put({
      type: 'LOGIN_USER_SUCCESS',
      payload: { token: response.data.token },
    });
    const token = yield localStorage.getItem('token');
    id = yield jwtDecode(token).id
    yield put({type: 'SAGA_GET_USER', payload: id})
    yield put(yield call(navigateto, '/home'));
    } catch (e) {
      yield console.log('Response error from login')
      yield console.log(e);
    }
}

function* getEntries(action) {
  const token = yield localStorage.getItem('token');
  const entries = yield call(get_entries, token);
  const users = yield call(get_users, token);
  yield put({type: 'SAVE_ENTRIES', payload: {offers: entries.data.offers, requests: entries.data.requests, users: users.data}})
}

function* postOffer(action) {
  const token = yield localStorage.getItem('token');
  const response = yield call(create_offer, action.payload, token);
  yield put({type: 'SAGA_GET_ENTRIES'});
}

function* deleteOffer(action){
  const token = yield localStorage.getItem('token');
  const response = yield call(delete_offer, action.payload, token);
  yield put({type: 'SAGA_GET_ENTRIES'});
}

function* postRequest(action) {
  const token = yield localStorage.getItem('token');
  const response = yield call(create_request, action.payload, token);
  yield put({type: 'SAGA_GET_ENTRIES'});
}

function* deleteRequest(action){
  const token = yield localStorage.getItem('token');
  const response = yield call(delete_request, action.payload, token);
  yield put({type: 'SAGA_GET_ENTRIES'});
}

function* patchJoin(action){
  const token = yield localStorage.getItem('token');
  const response = yield call(patch_join, action.payload, token);
  yield put({type: 'SAGA_GET_ENTRIES'});
}

function* getUser(action) {
  const token = yield localStorage.getItem('token');
  const user = yield call(get_user, action.payload, token);
  yield put({type: 'SAVE_USER_INFO', payload: user.data})
}

function* checkToken(){
  const token = yield localStorage.getItem('token');
  try{
    const response = yield call(check_token, token);
    if(response.data.token_is_valid){
      const id = jwtDecode(token).id;
      yield put({type: 'LOGIN_USER_SUCCESS', payload: {token: token}})
      yield put({type: 'SAGA_GET_USER', payload: id})
    }
  } catch (e){}
}

export default function* mainPageSaga() {
  yield takeLatest('SAGA_REGISTER', register);
  yield takeLatest('SAGA_LOGIN', login);
  yield takeLatest('SAGA_GET_ENTRIES', getEntries);
  yield takeLatest('SAGA_GET_USER', getUser);
  yield takeLatest('SAGA_POST_OFFER', postOffer);
  yield takeLatest('SAGA_DELETE_OFFER', deleteOffer);
  yield takeLatest('SAGA_POST_REQUEST', postRequest);
  yield takeLatest('SAGA_DELETE_REQUEST', deleteRequest);
  yield takeLatest('SAGA_PATCH_JOIN', patchJoin);
  yield takeLatest('SAGA_CHECK_TOKEN', checkToken);
}
