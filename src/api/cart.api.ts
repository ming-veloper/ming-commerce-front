import client from './client'
import { AxiosResponse } from 'axios'
import { CartProduct } from '../store/cart/cart.types'

type GetAppCartResponse = {
  result: Array<CartProduct>
}

type CartActionResponse = {
  cartLineCount: number
}

export const getAllCartList = (): Promise<AxiosResponse<GetAppCartResponse>> =>
  client.get('/api/carts')

export const addCart = (request: {
  productId: string
  quantity: number
}): Promise<AxiosResponse<CartActionResponse>> =>
  client.post('/api/carts', request)

export const deleteCart = (request: {
  productId: string
}): Promise<AxiosResponse<CartActionResponse>> =>
  client.delete('/api/carts', {
    data: request,
  })
