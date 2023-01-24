import { Container } from 'react-bootstrap'
import { useEffect } from 'react'
import ProductList from '../api/ProductList'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store'
import { fetchProductList } from '../store/product/product.slice'
import { ProductCategory } from '../store/product/product.types'

const MainPage = () => {
  const { productList, loading } = useSelector(
    (state: RootState) => state.product,
  )

  const dispatch = useDispatch()
  useEffect(() => {
    // @ts-ignore
    dispatch(
      // @ts-ignore
      fetchProductList({ category: ProductCategory.DAIRY_EGGS, page: 0 }),
    )
  }, [dispatch])

  return (
    <Container>
      <h2 className="h3 mb-0 pt-3 me-3">Bestsellers</h2>
      <hr />
      <ProductList loading={loading} productList={productList} />
    </Container>
  )
}

export default MainPage
