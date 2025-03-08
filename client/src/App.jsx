import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import './App.css';
import HomePage from './components/Home/HomePage.jsx';
import RegisterPage from './components/Register/RegisterPage.jsx';
import LoginPage from './components/Login/LoginPage.jsx';
import FeaturePage from './components/Feature/FeaturePage.jsx';
import CommunityPage from './components/Community/CommunityPage.jsx';
import InterviewExpPage from './components/Interview/InterviewExpPage.jsx';
import VirtualLibraryPage from './components/VirtualLibrary/VirtualLibraryPage.jsx';
import JobPostPage from './components/Jobportal/JobPostPage.jsx';
import EventPage from './components/Event/EventPage.jsx';
import RoomMatePage from './components/Roommate/RoomMatePage.jsx';
import FundRasingPage from './components/Fundrasing/FundRasingPage.jsx';
import ProfilePage from './components/Profile/ProfilePage.jsx';
import UploadBookForm from './components/Profile/Adders/UploadBookForm.jsx';
import CreateFlatRequestForm from './components/Profile/Adders/CreateFlatRequestForm.jsx';
import CommonDataFormPage from './components/Commondata/CommonDataFormPage.jsx';
import BookStatusPage from './components/Bookstatus/BookStatusPage.jsx';
import MyRoomRequestPage from './components/Roommate/Adders/MyRoomRequestPage.jsx';
import BookMarkPage from './components/Profile/Adders/BookMarkPage.jsx';
import CreateJobPostForm from './components/Profile/Adders/CreateJobPostForm.jsx';
import MyJobPostPage from './components/Jobportal/Adders/MyJobPostPage.jsx';
import CreateInterviewExpPage from './components/Profile/Adders/CreateInterviewExpPage.jsx';
import IntExpDetailPage from './components/Interview/IntExpDetailPage.jsx';

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
          path="/interviews/:companyname/:id"
          element={<PageWrapper><IntExpDetailPage /></PageWrapper>}
        />
        <Route
          path="/library"
          element={<PageWrapper><VirtualLibraryPage /></PageWrapper>}
        />

        <Route path="/jobs" element={<JobPostPage />}>
          <Route path="myjobpost" element={<MyJobPostPage />} />
        </Route>

        <Route
          path="/events"
          element={<PageWrapper><EventPage /></PageWrapper>}
        />
        <Route
          path="/roomfinder"
          element={<RoomMatePage />}
        >
          <Route path="myroomrequest" element={<MyRoomRequestPage />} />
        </Route>
        <Route
          path="/fundrasing"
          element={<PageWrapper><FundRasingPage /></PageWrapper>}
        />
        <Route
          path="/commondataform"
          element={<PageWrapper><CommonDataFormPage /></PageWrapper>}
        />
        <Route
          path="/bookstatus"
          element={<PageWrapper><BookStatusPage /></PageWrapper>}
        />

        <Route path="/profile" element={<ProfilePage />}>
          {/* ProfilePage could render UpperSectionPage and LowerSectionPage */}
          <Route path="uploadbook" element={<UploadBookForm />} />
          <Route path="createflatrequest" element={<CreateFlatRequestForm />} />
          <Route path="createjob" element={<CreateJobPostForm />} />
          <Route path="bookmark" element={<BookMarkPage />} />
          <Route path="createinterview" element={<CreateInterviewExpPage />} />
        </Route>

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
        y: 24,
        scale: 0.98,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          duration: 0.5,
          ease: [0.33, 1, 0.68, 1],
          when: "beforeChildren"
        }
      }}
      exit={{
        opacity: 0,
        y: -24,
        scale: 0.98,
        transition: {
          duration: 0.4,
          ease: [0.48, 0.15, 0.25, 0.96],
          when: "afterChildren"
        }
      }}
      style={{ position: 'relative' }}
    >
      {/* Subtle overlay for smoother transition */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0 }}
        exit={{
          opacity: 1,
          transition: { duration: 0.2 }
        }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          zIndex: 100,
          pointerEvents: 'none',
        }}
      />
      {children}
    </motion.div>
  );
};

export default App;