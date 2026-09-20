import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ToastContainer from './components/Toast';
import { useAuth } from './context/AuthContext';

// Page components (to be created)
import Home from './pages/Home';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import CreateProject from './pages/CreateProject';
import ManageProject from './pages/ManageProject';
import VolunteerTicket from './pages/VolunteerTicket';
import SponsorPayment from './pages/SponsorPayment';
import VerifierDashboard from './pages/VerifierDashboard';
import ReportSite from './pages/ReportSite';

function App() {
  const { user, loading } = useAuth();

  // Redirect to login if not authenticated and trying to access protected routes
  const requireAuth = () => !user && !loading ? <Navigate to="/login" replace /> : null;

  if (loading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Navbar />
      <div className="min-h-screen bg-[#F2F5F4] flex flex-col">
        <main className="flex-grow">
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/about" element={<About />} />

            {/* Protected routes */}
            <Route path="/dashboard" element={requireAuth() || <Dashboard />} />
            <Route path="/dashboard/projects/:id" element={requireAuth() || <ManageProject />} />
            <Route path="/dashboard/create-project" element={requireAuth() || <CreateProject />} />
            <Route path="/dashboard/sponsor-payment/:amount" element={requireAuth() || <SponsorPayment />} />
            <Route path="/dashboard/volunteer-ticket/:ticketCode" element={requireAuth() || <VolunteerTicket />} />
            <Route path="/dashboard/verifier" element={requireAuth() || <VerifierDashboard />} />
            <Route path="/report" element={requireAuth() || <ReportSite />} />

            {/* Redirect root to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
        <ToastContainer />
      </div>
    </BrowserRouter>
  );
}

export default App;