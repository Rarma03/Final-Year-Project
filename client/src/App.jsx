import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import './App.css';
import HomePage from './components/Home/HomePage.jsx';
import RegisterPage from './components/Register/RegisterPage.jsx';
import StudentRegisterPage from './components/Register/Student/StudentRegisterPage.jsx';
import TeacherRegisterPage from './components/Register/Teacher/TeacherRegisterPage.jsx';
import LoginPage from './components/Login/LoginPage.jsx';
import FeaturePage from './components/Feature/FeaturePage.jsx';
import CommunityPage from './components/Community/CommunityPage.jsx';
import InterviewExpPage from './components/Interview/InterviewExpPage.jsx';
import VirtualLibraryPage from './components/VirtualLibrary/VirtualLibraryPage.jsx';
import JobPostPage from './components/Jobportal/JobPostPage.jsx';

function App() {
  const location = useLocation(); // Get current route location

  return (
    <AnimatePresence mode="wait"> {/* Ensures smooth exit animations */}
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={<PageWrapper><HomePage /></PageWrapper>}
        />
        <Route
          path="/register"
          element={<PageWrapper><RegisterPage /></PageWrapper>}
        />
        <Route
          path="/login"
          element={<PageWrapper><LoginPage /></PageWrapper>}
        />
        <Route
          path="/feature"
          element={<PageWrapper><FeaturePage /></PageWrapper>}
        />
        <Route
          path="/community"
          element={<PageWrapper><CommunityPage /></PageWrapper>}
        />
        <Route
          path="/interviews"
          element={<PageWrapper><InterviewExpPage /></PageWrapper>}
        />
        <Route
          path="/library"
          element={<PageWrapper><VirtualLibraryPage /></PageWrapper>}
        />
        <Route
          path="/jobs"
          element={<PageWrapper><JobPostPage /></PageWrapper>}
        />
        <Route
          path="/studentRegister"
          element={<PageWrapper><StudentRegisterPage /></PageWrapper>}
        />
        <Route
          path="/teacherRegister"
          element={<PageWrapper><TeacherRegisterPage /></PageWrapper>}
        />
      </Routes>
    </AnimatePresence>
  );
}

// A wrapper to apply animation to all pages
const PageWrapper = ({ children }) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
        scale: 0.98,
        filter: 'blur(4px)'
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
        filter: 'blur(0px)',
        transition: {
          duration: 0.6,
          ease: [0.6, -0.05, 0.01, 0.99],
          scale: { duration: 0.4 }
        }
      }}
      exit={{
        opacity: 0,
        y: -40,
        scale: 0.95,
        filter: 'blur(4px)',
        transition: {
          duration: 0.4,
          ease: [0.48, 0.15, 0.25, 0.96]
        }
      }}
      style={{ position: 'relative' }}
    >
      {children}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(255,255,255,0.5)',
          pointerEvents: 'none',
          zIndex: 100,
          opacity: 0
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0 }}
        exit={{
          opacity: 1,
          transition: { duration: 0.3 }
        }}
      />
    </motion.div>
  );
};

export default App;