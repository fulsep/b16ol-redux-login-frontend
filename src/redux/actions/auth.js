import qs from 'querystring'
import http from '../../helper/http'

export const login = (email, password)=>{
  return {
    type: 'LOGIN',
    payload: http().post('http://localhost:8080/login', qs.stringify({email, password}))
  }
}