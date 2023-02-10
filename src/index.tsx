import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/css/theme.css'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store'
import { getMemberInfo, setTempMemberInfo } from './store/auth/auth.slice'
import { MemberInfo } from './store/auth/auth.types'

const loadMemberInfo = () => {
  try {
    // memberInfo 가 있는 경우
    const memberInfo = localStorage.getItem('memberInfo')
    const token = localStorage.getItem('token')
    if (memberInfo) {
      store.dispatch(setTempMemberInfo(JSON.parse(memberInfo) as MemberInfo))
      // @ts-ignore
      store.dispatch(getMemberInfo())
    } else if (token) {
      // @ts-ignore
      store.dispatch(getMemberInfo())
    } else return
  } catch {
    console.log('에러가 발생하였습니다.')
  }
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
loadMemberInfo()
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
