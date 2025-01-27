import { Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './components/Home/HomePage.jsx';
import RegisterPage from './components/Register/RegisterPage.jsx';
import LoginPage from './components/Login/LoginPage.jsx';
import FeaturePage from './components/Feature/FeaturePage.jsx';
import CommunityPage from './components/Community/CommunityPage.jsx';
import InterviewExpPage from './components/Interview/InterviewExpPage.jsx';
import VirtualLibraryPage from './components/VirtualLibrary/VirtualLibraryPage.jsx';
import JobPostPage from './components/Jobportal/JobPostPage.jsx';

function App() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />}></Route>
      <Route path='/register' element={<RegisterPage />}></Route>
      <Route path='/login' element={<LoginPage />}></Route>
      <Route path='/feature' element={<FeaturePage />}></Route>
      <Route path='/community' element={<CommunityPage />}></Route>
      <Route path='/interviews' element={<InterviewExpPage />}></Route>
      <Route path='/library' element={<VirtualLibraryPage />}></Route>
      <Route path='/jobs' element={<JobPostPage />}></Route>
    </Routes>
  )
}

export default App;