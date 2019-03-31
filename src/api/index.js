import axios from 'axios'
import { SERVER_URL } from '../configuration'
export function get (url, params = {},config={}) {
  return axios
    .get(SERVER_URL + url, {
      params,
      ...config
    })
    .then(function (response) {
      return response.data.data
    })
    .catch(function (error) {
      throw error
    })
}

export function post (url,body={}) {
  return axios
    .post(SERVER_URL + url, {
      ...body
    })
    .then(function (response) {
      return response.data.data
    })
    .catch(function (error) {
      throw error.response.data
    })
}
export function put () {}

