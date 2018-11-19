/* eslint camelcase: 0 */

import axios from 'axios';

const ip = 'https://sis-marlboro.herokuapp.com';
//'http://172.17.2.159:8080'
const tokenConfig = (token) => ({
    headers: {
        'Authorization': token, // eslint-disable-line quote-props
    }
});

export function validate_token(token) {
  return axios.post(`${ip}/api/is_token_valid`, {
    token,
  });
}

export function get_github_access() {
  window.open(
    '/github-login',
    '_blank', // <- This is what makes it open in a new window.
  );
}

export function create_user(name, email, password) {
  return axios.post(`${ip}/api/create_user`, {
    name,
    email,
    password,
  });
}

export function check_token(token) {
  return axios.post(`${ip}/api/is_token_valid`, {
    token
  });
}

export function get_token(email, password) {
  return axios.post(`${ip}/api/get_token`, {
    email,
    password,
  });
}

export function get_entries(token) {
  return axios.get(`${ip}/api/entries`, tokenConfig(token));
}

export function get_user(id, token) {
  return axios.get(`${ip}/api/users/${id}`, tokenConfig(token));
}

export function get_users(token) {
  return axios.get(`${ip}/api/users/active`, tokenConfig(token));
}

export function create_offer(data, token) {
  return axios.post(`${ip}/api/create_offer`, {
	data: data
  }, tokenConfig(token));
}

export function create_request(data, token) {
  return axios.post(`${ip}/api/create_request`, {
	data: data
  }, tokenConfig(token));
}

export function patch_join(data, token) {
  return axios.patch(`${ip}/api/patch_join`, {
	data: data
  }, tokenConfig(token));
}

export function delete_offer(entry_id, token) {
  return axios.delete(`${ip}/api/entries/offers/${entry_id}`, tokenConfig(token));
}

export function delete_request(entry_id, token) {
  return axios.delete(`${ip}/api/entries/requests/${entry_id}`, tokenConfig(token));
}

export function has_github_token(token) {
  return axios.get('/api/has_github_token', tokenConfig(token));
}

export function data_about_user(token) {
  return axios.get(`${ip}/api/user`, tokenConfig(token));
}
