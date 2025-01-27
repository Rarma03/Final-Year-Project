import { Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './components/Home/HomePage.jsx'
import StudentRegisterPage from './components/Register/Student/StudentRegisterPage.jsx'
import TeacherRegisterPage from './components/Register/Teacher/TeacherRegisterPage.jsx'
import LoginPage from './components/Login/LoginPage.jsx'

function App() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />}></Route>
      <Route path='/studentRegister' element={<StudentRegisterPage />}></Route>
      <Route path='/teacherRegister' element={<TeacherRegisterPage />}></Route>
      <Route path='/login' element={<LoginPage />}></Route>
      
    </Routes>
  )
}

export default App;