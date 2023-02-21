import client from './client'
import { AxiosResponse } from 'axios'

export type TossPaymentRequest = {
  orderId: string
  paymentKey: string
  amount: number
}

type TossPaymentResponse = {
  orderId: string
  orderName: string
  requestedAt: string
  approvedAt: string
  currency: string
  totalAmount: number
  method: string
}
export const payment = (
  paymentRequest: TossPaymentRequest,
): Promise<AxiosResponse<TossPaymentResponse>> => {
  return client.post('/api/payment/pay', paymentRequest)
}
