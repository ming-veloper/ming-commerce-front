import { OrderRequest, OrderResponse } from '../store/order/order.types'
import client from './client'
import { AxiosResponse } from 'axios'

export const order = (
  request: OrderRequest,
): Promise<AxiosResponse<OrderResponse>> => {
  return client.post('/api/orders/order', request)
}
