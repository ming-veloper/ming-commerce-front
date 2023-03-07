import { FC } from 'react'
import { MyOrder } from '../store/order/order.types'
import { MyOrderCard } from './MyOrderCard'

const MyOrderList: FC<{ myOrders: Array<MyOrder> }> = ({ myOrders }) => {
  return (
    <>
      {myOrders.map((order) => (
        <MyOrderCard order={order} key={order.orderId} />
      ))}
    </>
  )
}

export default MyOrderList
