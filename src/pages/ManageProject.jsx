import { useAuth } from '../context/AuthContext';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { seedProjects } from '../data/seed';
import { CATEGORIES } from '../data/seed';

const ManageProject = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [editing, setEditing] = useState(false);
  const [mapCenter, setMapCenter] = useState([27.7, 85.3]);
  const [markerPosition, setMarkerPosition] = useState(null);

  useEffect(() => {
    // Find project by id and check if user owns it
    const proj = seedProjects.find(p => p.id === id);
    if (proj && proj.ownerId === user?.id) {
      setProject(proj);
      setMapCenter([proj.lat, proj.lng]);
      setMarkerPosition([proj.lat, proj.lng]);
    } else {
      // Redirect if not found or not authorized
      navigate('/dashboard');
    }
  }, [id, user?.id, navigate]);

  if (!project) {
    return <div className="p-6">Project not found or access denied</div>;
  }

  // Status labels
  const statusLabels = {
    pending: 'Awaiting approval',
    funding: 'Funding open',
    ready: 'Fully funded',
    evidence: 'Awaiting evidence',
    review: 'Under verification',
    verified: 'Impact verified',
    rejected: 'Not approved'
  };

  const handleEditToggle = () => {
    setEditing(!editing);
  };

  const handleCheckIn = () => {
    // Would open check-in modal
    alert('Volunteer check-in would open here');
  };

  const handleSubmitEvidence = () => {
    // Would open evidence submission form
    alert('Evidence submission would open here');
  };

  return (
    <div className="py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-[#10242A]">{project.title}</h1>
          <div className="flex items-center space-x-4">
            <span className="px-2 py-1 text-xs font-medium rounded-full bg-[#E0F0F1] text-[#166F7C]">
              {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
            </span>
            <span className="ml-4 text-[4B6166]">
              {statusLabels[project.status] || project.status}
            </span>
          </div>
        </div>

        <div className="grid gap-6">
          {/* Project Info Column */}
          <div className="lg:col-span-2">
            {/* Project Header Image */}
            <img
              src={project.coverImageUrl}
              alt={project.title}
              className="w-full h-48 object-cover rounded-lg mb-6"
            />

            {/* About this project */}
            <div className="mb-6">
              <h2 className="text-xl font-bold text-[#10242A] mb-4">
                About this project
              </h2>
              <p className="text-[#4B6166]">{project.description}</p>
            </div>

            {/* Project Details */}
            <div className="grid gap-4 sm:grid-cols-2 mb-6">
              <div>
                <h3 className="font-semibold text-[#10242A] mb-2">Event date</h3>
                <p className="text-[4B6166]">
                  {new Date(project.eventDate).toLocaleDateString('en-US', {
                    weekday: 'short',
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-[#10242A] mb-2">Location</h3>
                <p className="text-[4B6166]">
                  {project.place}, {project.district}
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-[#10242A] mb-2">Category</h3>
                <p className="text-[4B6166]">
                  {CATEGORIES[project.category].label}
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-[#10242A] mb-2">Impact target</h3>
                <p className="text-[4B6166]">
                  {project.targetResult} {CATEGORIES[project.category].unit}
                </p>
              </div>
            </div>

            {/* Progress Sections */}
            <div className="space-y-6">
              {/* Funding Progress */}
              <div>
                <h3 className="font-semibold text-[#10242A] mb-4">Funding progress</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-[4B6166] mb-2">
                    <span>Amount raised</span>
                    <span>Rs. 0</span>
                  </div>
                  <div>
                    <div className="w-full bg-[#DBE4E2] rounded-full h-4">
                      <div
                        className="bg-[#166F7C] h-4 rounded-full"
                        style={{ width: '0%' }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex justify-between text-sm text-[4B6166] mt-2">
                    <span>0%</span>
                    <span>Rs. 0 of Rs. {project.goalAmount.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Volunteer Progress */}
              <div>
                <h3 className="font-semibold text-[#10242A] mb-4">Volunteer progress</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-[4B6166] mb-2">
                    <span>Volunteers registered</span>
                    <span>0 / {project.volunteersNeeded}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={handleCheckIn}
                      className="px-4 py-2 bg-[#33754A] text-white rounded-md hover:bg-[#285E3E]"
                    >
                      Check in volunteers
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8">
              <div className="flex flex-col sm:flex-row sm:gap-4">
                <button
                  onClick={handleEditToggle}
                  className="flex-1 px-4 py-2 border border-[#DBE4E2] rounded-md hover:bg-[#F2F5F4]"
                >
                  {editing ? 'Cancel editing' : 'Edit project'}
                </button>
                {project.status === 'evidence' && (
                  <button
                    onClick={handleSubmitEvidence}
                    className="flex-1 px-4 py-2 bg-[#166F7C] text-white rounded-md hover:bg-[#0d5a63]"
                  >
                    Submit evidence
                  </button>
                )}
                {(!['pending', 'rejected'].includes(project.status)) && (
                  <button
                    className="flex-1 px-4 py-2 border border-[#DBE4E2] rounded-md hover:bg-[#F2F5F4]"
                  >
                    Share project
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Location Map */}
            <div className="mb-6">
              <h3 className="font-semibold text-[#10242A] mb-2">
                Project location
              </h3>
              <div className="h-64 rounded-lg shadow overflow-hidden">
                <MapContainer
                  center={mapCenter}
                  zoom={15}
                  scrollWheelZoom={false}
                  className="w-full h-full"
                >
                  <TileLayer
                    attribution='&copy <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  {markerPosition && (
                    <Marker position={markerPosition}>
                      <Popup>
                        <span className="font-medium">{project.title}</span>
                        <br />
                        <span className="text-xs">{project.place}</span>
                      </Popup>
                    </Marker>
                  )}
                </MapContainer>
              </div>
            </div>

            {/* Organizer Info */}
            <div className="mb-6">
              <h3 className="font-semibold text-[#10242A] mb-2">
                Organizer
              </h3>
              <div className="space-y-2">
                <p className="text-[4B6166] font-medium">
                  Demo Organizer
                </p>
                <p className="text-sm text-[4B6166]">
                  Terra Demo Org
                </p>
              </div>
            </div>

            {/* Project Status Timeline */}
            <div className="mb-6">
              <h3 className="font-semibold text-[#10242A] mb-2">
                Project status
              </h3>
              <div className="space-y-2">
                {/* Status timeline would go here */}
                <div className="text-[4B6166] text-center py-4">
                  Current status: {statusLabels[project.status] || project.status}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Form (if editing) */}
        {editing && (
          <div className="mt-8 pt-6 border-t border-[#DBE4E2]">
            <h2 className="text-xl font-bold text-[#10242A] mb-4">
              Edit project
            </h2>
            <form className="space-y-4">
              {/* Form fields would go here - simplified for now */}
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleEditToggle}
                  className="px-4 py-2 text-sm font-medium text-[#4B6166]"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleEditToggle}
                  className="ml-4 px-4 py-2 bg-[#166F7C] text-white rounded-md hover:bg-[#0d5a63]"
                >
                  Save changes
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageProject;