import { Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './components/Home/HomePage.jsx';
import RegisterPage from './components/Register/RegisterPage.jsx';
import LoginPage from './components/Login/LoginPage.jsx';

function App() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />}></Route>
      <Route path='/register' element={<RegisterPage />}></Route>
      <Route path='/login' element={<LoginPage />}></Route>
    </Routes>
  )
}

export default App;