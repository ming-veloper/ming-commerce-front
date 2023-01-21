import { Route, Routes } from 'react-router-dom'
import MainPage from './pages/MainPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import LostPassword from './pages/LostPassword'
import MyPage from './pages/MyPage'
import MingNavBar from './components/MingNavBar'
import { useSelector } from 'react-redux'
import { RootState } from './store'

const App = () => {
  const { auth } = useSelector((state: RootState) => state)
  return (
    <Routes>
      <Route element={<MingNavBar memberInfo={auth.memberInfo} />}>
        <Route index element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/lost-password" element={<LostPassword />} />
        <Route path="/my-page" element={<MyPage />} />
      </Route>
    </Routes>
  )
}

export default App
