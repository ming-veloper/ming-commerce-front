import { Route, Routes } from 'react-router-dom'
import MainPage from './pages/MainPage'
import LoginPage from './pages/login/LoginPage'
import RegisterPage from './pages/login/RegisterPage'
import LostPassword from './pages/login/LostPassword'
import MyPage from './pages/user/MyPage'
import MingNavBar from './components/MingNavBar'
import ProductDetailPage from './pages/order/ProductDetailPage'
import CartPage from './pages/user/CartPage'
import OrderRedirectPage from './pages/order/OrderRedirectPage'
import OrderCompletePage from './pages/order/OrderCompletePage'
import UserUpdateLinkPage from './pages/user/UserUpdateLinkPage'
import OrderDetailPage from './pages/user/OrderDetailPage'

const App = () => {
  return (
    <Routes>
      <Route element={<MingNavBar />}>
        <Route index element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/lost-password" element={<LostPassword />} />
        <Route path="/my-page" element={<MyPage />} />
        <Route path="/my-page">
          <Route path="order/result/:orderId" element={<OrderCompletePage />} />
          <Route path="order/detail/:orderId" element={<OrderDetailPage />} />
        </Route>
        <Route path="/products/:productId" element={<ProductDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/update-user" element={<UserUpdateLinkPage />} />
      </Route>
      <Route path="/order_redirect" element={<OrderRedirectPage />} />
    </Routes>
  )
}

export default App
