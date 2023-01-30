import { FC } from 'react'
import ProductCard from '../components/ProductCard'
import { Card, Placeholder } from 'react-bootstrap'
import { Product } from '../store/product/product.types'

type ProductListProp = { productList: Array<Product>; loading: boolean }

const ProductCardPlaceholder: FC = () => {
  return (
    <Card
      className="product-card card-static shadow col-lg-4 col-5 px-0 px-sm-2 mb-sm-4"
      style={{ margin: '10px' }}
    >
      <Card.Img
        variant="top"
        className="placeholder placeholder-wave"
        style={{ height: '150px' }}
      />
      <Card.Body>
        <Placeholder as={Card.Text} animation="glow">
          <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
          <Placeholder xs={6} /> <Placeholder xs={8} />
        </Placeholder>
      </Card.Body>
    </Card>
  )
}

const ProductList: FC<ProductListProp> = ({ productList, loading }) => {
  if (productList.length < 0) return null
  if (loading) {
    return (
      <div className="row mx-n2" style={{ justifyContent: 'center' }}>
        <ProductCardPlaceholder />
        <ProductCardPlaceholder />
        <ProductCardPlaceholder />
        <ProductCardPlaceholder />
        <ProductCardPlaceholder />
        <ProductCardPlaceholder />
      </div>
    )
  }
  return (
    <div className="row mx-n2" style={{ justifyContent: 'center' }}>
      {productList.map((product) => (
        <ProductCard product={product} key={product.productId} />
      ))}
    </div>
  )
}

export default ProductList
