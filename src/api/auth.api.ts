import { Token } from '../store/register/register.types'
import { AxiosResponse } from 'axios'
import { MemberInfo } from '../store/auth/auth.types'
import client from './client'
import { LoginRequest } from '../pages/LoginPage'

export const memberInfo = (): Promise<
  AxiosResponse<{ result: MemberInfo }>
> => {
  return client.get('/api/members/info')
}

export const login = (
  loginRequest: LoginRequest,
): Promise<AxiosResponse<Token>> => {
  return client.post('/api/login', loginRequest)
}
