export type OrderRequest = {
  cartLineUuidList: Array<string>
}

export type OrderResponse = {
  orderId: string
  amount: number
  orderName: string
}

export type MyOrder = {
  orderId: string
  orderName: string
  thumbnailImageUrl: string
  totalAmount: number
  updatedDate: string
}
export type PagingObject<T> = {
  content: Array<T>
  first: boolean
  last: boolean
  totalElements: number
  totalPages: number
}

export type OrderResult = {
  orderId: string
  amount: number
  orderName: string
  orderStatus: string
}
