import { FC } from 'react'
import { CartProduct } from '../store/cart/cart.types'
import { Button } from 'react-bootstrap'

const CartLine: FC<{
  cartProduct: CartProduct
  onDeleteClick: (productId: string, cartId: string) => void
  onClickCartLine: (cartLineId: string) => void
}> = ({ cartProduct, onDeleteClick, onClickCartLine }) => {
  return (
    <div className="form-check d-flex align-items-center pb-2 border-bottom">
      <a
        href={`/products/${cartProduct.productId}`}
        className="d-block flex-shrink-0"
      >
        <input
          className="form-check-input"
          type="checkbox"
          onClick={() => onClickCartLine(cartProduct.uuid)}
        />
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
          onClick={() => onDeleteClick(cartProduct.productId, cartProduct.uuid)}
        >
          <i className="ci-trash justify-content-end"></i>
        </Button>
      </div>
    </div>
  )
}

export default CartLine
