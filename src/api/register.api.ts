import { AxiosResponse } from 'axios'
import {
  EmailCheckResponse,
  RegisterRequest,
  Token,
} from '../store/register/register.types'
import client from './client'

export const duplicateEmailCheck = (
  email: string,
): Promise<AxiosResponse<EmailCheckResponse>> =>
  client.get('/api/members/email-duplication-check', {
    params: {
      email,
    },
  })

export const register = (
  request: RegisterRequest,
): Promise<AxiosResponse<Token>> => {
  const { email, password, memberName } = request
  return client.post('/api/members/register', { email, password, memberName })
}
