import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();

  if (!user) {
    return <div className="p-6">Please log in to access the dashboard</div>;
  }

  // Role-based dashboard routing
  if (user.role === 'sponsor') {
    return <SponsorDashboard user={user} />;
  } else if (user.role === 'organizer') {
    return <OrganizerDashboard user={user} />;
  } else if (user.role === 'verifier') {
    return <VerifierDashboard user={user} />;
  } else {
    return <div className="p-6">Invalid user role</div>;
  }
};

// Sponsor Dashboard
const SponsorDashboard = ({ user }) => {
  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-[#10242A]">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span className="text-[4B6166]">Welcome back, {user.name}</span>
          </div>
        </div>

        <div className="grid gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-[#10242A] mb-4">Overview</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-[#166F7C]">0</h3>
                <p className="text-[4B6166]">Projects supported</p>
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold text-[#33754A]">0</h3>
                <p className="text-[4B6166]">Volunteer participations</p>
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold text-[#B57B08]">Rs. 0</h3>
                <p className="text-[4B6166]">Total contributed</p>
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold text-[#AC4320]">0 kg</h3>
                <p className="text-[4B6166]">Waste recovered</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-[#10242A] mb-4">My Sponsorships</h2>
            <div className="space-y-4">
              {/* Sponsorship items would go here */}
              <p className="text-[4B6166] text-center py-8">
                You haven't sponsored any projects yet.
              </p>
              <Link
                to="/projects"
                className="block w-full flex items-center justify-center px-4 py-2 bg-[#166F7C] text-white rounded-md hover:bg-[#0d5a63]"
              >
                Explore projects to sponsor
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Organizer Dashboard
const OrganizerDashboard = ({ user }) => {
  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-[#10242A]">Organizer Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span className="text-[4B6166]">Welcome back, {user.name}</span>
          </div>
        </div>

        <div className="grid gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-[#10242A] mb-4">My Projects</h2>
            <div className="space-y-4">
              {/* Project items would go here */}
              <p className="text-[4B6166] text-center py-8">
                You haven't created any projects yet.
              </p>
              <Link
                to="/dashboard/create-project"
                className="block w-full flex items-center justify-center px-4 py-2 bg-[#166F7C] text-white rounded-md hover:bg-[#0d5a63]"
              >
                Create your first project
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Verifier Dashboard
const VerifierDashboard = ({ user }) => {
  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-[#10242A]">Verifier Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span className="text-[4B6166]">Welcome back, {user.name}</span>
          </div>
        </div>

        <div className="grid gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-[#10242A] mb-4">Pending Approvals</h2>
            <div className="space-y-4">
              {/* Pending projects would go here */}
              <p className="text-[4B6166] text-center py-8">
                No projects pending approval.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-[#10242A] mb-4">Evidence Verification</h2>
            <div className="space-y-4">
              {/* Evidence items would go here */}
              <p className="text-[4B6166] text-center py-8">
                No evidence awaiting verification.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;