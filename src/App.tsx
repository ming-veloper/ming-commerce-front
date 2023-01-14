import { Route, Routes } from 'react-router-dom'
import MainPage from './pages/MainPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import LostPassword from './pages/LostPassword'
import MyPage from './pages/MyPage'

const App = () => {
  return (
    <Routes>
      <Route index element={<MainPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/lost-password" element={<LostPassword />} />
      <Route path="/my-page" element={<MyPage />} />
    </Routes>
  )
}

export default App
