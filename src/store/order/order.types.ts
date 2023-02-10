export type OrderRequest = {
  cartLineUuidList: Array<string>
}

export type OrderResponse = {
  orderId: string
  amount: number
  orderName: string
}
