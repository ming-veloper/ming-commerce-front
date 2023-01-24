import client from './client'
import { AxiosResponse } from 'axios'
import { Product, ProductCategory } from '../store/product/product.types'

type ProductResponse = {
  result: Array<Product>
}
export const getProductList = (
  category: ProductCategory,
  page: number,
): Promise<AxiosResponse<ProductResponse>> => {
  return client.get(`/api/products?page=${page}&category=${category}`)
}
