import client from './client'
import { AxiosResponse } from 'axios'
import { CartProduct } from '../store/cart/cart.types'

type GetAppCartResponse = {
  result: Array<CartProduct>
}

export const getAllCartList = (): Promise<AxiosResponse<GetAppCartResponse>> =>
  client.get('/api/carts')
