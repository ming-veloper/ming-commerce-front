import { FC } from 'react'
import { MyOrder } from '../store/order/order.types'
import { MyOrderCard } from './MyOrderCard'
import { useNavigate } from 'react-router-dom'

const MyOrderList: FC<{ myOrders: Array<MyOrder> }> = ({ myOrders }) => {
  const navigate = useNavigate()
  return (
    <>
      {myOrders.map((order) => (
        <MyOrderCard
          onClick={() => navigate(`/my-page/order/detail/${order.orderId}`)}
          order={order}
          key={order.orderId}
        />
      ))}
    </>
  )
}

export default MyOrderList
