import axios from 'axios'
import { Token } from '../store/register/register.types'

const HEADER = 'X-WWW-MING-AUTHORIZATION'
const client = axios.create({
  baseURL: 'http://localhost:8080',
})

client.interceptors.request.use((config) => {
  if (!config.headers) return config

  const tokenString = localStorage.getItem('token')
  if (tokenString) {
    const token = JSON.parse(tokenString) as Token
    // @ts-ignore
    config.headers[HEADER] = token.accessToken
  }
  return config
})

export default client
