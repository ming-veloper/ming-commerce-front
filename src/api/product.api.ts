import client from './client'
import { AxiosResponse } from 'axios'
import {
  Product,
  ProductCategory,
  ProductDetail,
} from '../store/product/product.types'

type ProductListResponse = {
  result: Array<Product>
}

type ProductDetailResponse = {
  result: ProductDetail
}
export const getProductList = (
  category: ProductCategory,
  page: number,
): Promise<AxiosResponse<ProductListResponse>> => {
  return client.get(`/api/products?page=${page}&category=${category}`)
}

export const getProductDetail = (
  productId: string,
): Promise<AxiosResponse<ProductDetailResponse>> => {
  return client.get(`/api/products/${productId}`)
}
