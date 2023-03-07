import {
  MyOrderWrapper,
  OrderRequest,
  OrderResponse,
  OrderResult,
} from '../store/order/order.types'
import client from './client'
import { AxiosResponse } from 'axios'

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

export const getMyOrder = (
  page: number,
  size: number,
): Promise<AxiosResponse<MyOrderWrapper>> => {
  return client.get(`/api/orders/my-order?page=${page - 1}&size=${size}`)
}
