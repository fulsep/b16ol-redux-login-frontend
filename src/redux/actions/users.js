import qs from 'querystring'
import http from '../../helper/http'

export const createUser = (body, token)=>{
  return {
    type: 'CREATE_USER',
    payload: http(token).post('http://localhost:8080/user', qs.stringify(body))
  }
}