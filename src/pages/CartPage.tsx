import { Button, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store'
import { useNavigate } from 'react-router-dom'
import { FC, useEffect, useState } from 'react'
import { CartProduct } from '../store/cart/cart.types'
import { deleteCartAction, fetchAllCartList } from '../store/cart/cart.slice'

const CartLine: FC<{ cartProduct: CartProduct }> = ({ cartProduct }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const onDeleteClick = () => {
    // @ts-ignore
    dispatch(deleteCartAction({ productId: cartProduct.productId }))
    setTimeout(() => {
      // @ts-ignore
      dispatch(fetchAllCartList())
    }, 200)
  }
  return (
    <div className="d-flex align-items-center pb-2 border-bottom">
      <a
        href={`/products/${cartProduct.productId}`}
        className="d-block flex-shrink-0"
      >
        <img
          src={cartProduct.thumbnailImageUrl}
          width="60"
          alt={cartProduct.productName}
        />
      </a>
      <div className="ps-2 text-truncate">
        <h6 className="widget-product-title">
          <a href={`/products/${cartProduct.productId}`}>
            {cartProduct.productName}
          </a>
        </h6>
        <div className="widget-product-meta">
          <span className="text-accent me-2">${cartProduct.price}</span>
          <span className="text-muted">x {cartProduct.quantity}</span>
        </div>
        <Button
          className="d-flex"
          variant="danger"
          size="sm"
          onClick={onDeleteClick}
        >
          <i className="ci-trash justify-content-end"></i>
        </Button>
      </div>
    </div>
  )
}

const CartPage = () => {
  const { memberInfo } = useSelector((state: RootState) => state.auth)
  const { cartProductList } = useSelector((state: RootState) => state.cart.list)
  const [totalPrice, setTotalPrice] = useState(0)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if (memberInfo == null) {
      navigate('/', { replace: true })
      return
    }
    // @ts-ignore
    dispatch(fetchAllCartList())
  }, [dispatch, memberInfo, navigate])
  useEffect(() => {
    const totalPrice = cartProductList.reduce((accumulator, current) => {
      const value = current.price * current.quantity
      return value + accumulator
    }, 0)
    setTotalPrice(totalPrice)
  }, [cartProductList])

  return (
    <Container>
      {cartProductList.length > 0 ? (
        <div className="col-xl-5 offset-xl-1 mb-2">
          <div className="bg-light rounded-3 py-5 px-4 px-xxl-5">
            <h2 className="h5 pb-3">My Cart</h2>
            {cartProductList.map((cartProduct) => (
              <CartLine key={cartProduct.productId} cartProduct={cartProduct} />
            ))}
            <ul className="list-unstyled fs-sm pt-4 pb-2 border-bottom">
              <li className="d-flex justify-content-between align-items-center">
                <span className="me-2">합계:</span>
                <span className="text-end fw-medium">${totalPrice}</span>
              </li>
              <li className="d-flex justify-content-between align-items-center">
                <span className="me-2">배송비:</span>
                <span className="text-end fw-medium">$3.00</span>
              </li>
            </ul>
            <h3 className="fw-normal text-center my-4 py-2">
              총 가격 : ${totalPrice + 3}
            </h3>
          </div>
          <div className="d-grid gap-2">
            <Button
              variant="primary"
              size="lg"
              onClick={() => {
                alert('아직 준비중입니다~')
              }}
            >
              주문하기
            </Button>
          </div>
        </div>
      ) : (
        <>
          <div className="col-xl-5 offset-xl-1 mb-2">
            <div className="bg-light rounded-3 py-5 px-4 px-xxl-5">
              <h3>아직 상품을 담지 않았어요...!</h3>
            </div>
          </div>
        </>
      )}
    </Container>
  )
}

export default CartPage
