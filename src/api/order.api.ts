import { OrderRequest, OrderResponse } from '../store/order/order.types'
import client from './client'
import { AxiosResponse } from 'axios'

export type OrderResult = {
  orderId: string
  amount: number
  orderName: string
  orderStatus: string
}
export const order = (
  request: OrderRequest,
): Promise<AxiosResponse<OrderResponse>> => {
  return client.post('/api/orders/order', request)
}

export const getOrder = (
  orderId: string,
): Promise<AxiosResponse<OrderResult>> => {
  return client.get(`/api/orders/order`, {
    params: {
      orderId,
    },
  })
}
