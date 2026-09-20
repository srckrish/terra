import { useAuth } from '../context/AuthContext';
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { seedProjects } from '../data/seed';
import { CATEGORIES } from '../data/seed';
import { useMapEvents } from 'react-leaflet';

const ProjectDetail = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [mapCenter, setMapCenter] = useState([27.7, 85.3]); // Default to Kathmandu

  useEffect(() => {
    // Find project by id
    const proj = seedProjects.find(p => p.id === id);
    if (proj) {
      setProject(proj);
      setMapCenter([proj.lat, proj.lng]);
    }
  }, [id]);

  if (!project) {
    return <div className="p-6">Project not found</div>;
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

  // Determine if user has sponsored this project
  const userHasSponsored = false; // Would check sponsorships in real implementation

  // Determine if user has volunteered for this project
  const userHasVolunteered = false; // Would check volunteers in real implementation

  return (
    <>
      {/* Project Header */}
      <section className="relative bg-white">
        <img
          src={project.coverImageUrl}
          alt={project.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 transparent">
          <div className="flex items-center space-x-2 mb-2">
            <span className="px-2 py-1 text-xs font-medium rounded-full bg-[#E0F0F1] text-[#166F7C]">
              {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
            </span>
            <span className="text-xs text-white">
              {new Date(project.eventDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">
            {project.title}
          </h1>
          <div className="flex items-center space-x-4 text-white">
            <span>{project.place}, {project.district}</span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content Column */}
            <div className="lg:col-span-2">
              {/* About this project */}
              <div className="mb-8">
                <h2 className="text-xl font-bold text-[#10242A] mb-4">
                  About this project
                </h2>
                <p className="text-[#4B6166]">{project.description}</p>
              </div>

              {/* Impact Goal */}
              <div className="mb-8">
                <h2 className="text-xl font-bold text-[#10242A] mb-4">
                  Impact goal
                </h2>
                <div className="bg-[#F2F5F4] rounded-lg p-6">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      {/* Category icon would go here */}
                      <div className="w-12 h-12 bg-[#E0F0F1] rounded-full flex items-center justify-center">
                        <span className="text-[#166F7C] font-bold">{project.category.charAt(0).toUpperCase()}</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-[#10242A]">
                        {project.targetResult} {CATEGORIES[project.category].unit}
                      </h3>
                      <p className="text-[#4B6166]">
                        {CATEGORIES[project.category].phrase(project.targetResult)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Funding */}
              <div className="mb-8">
                <h2 className="text-xl font-bold text-[#10242A] mb-4">
                  Funding
                </h2>
                <div className="space-y-4">
                  <div className="flex justify-between text-[#4B6166] mb-2">
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
                  <div className="flex justify-between text-sm text-[#4B6166] mt-2">
                    <span>0%</span>
                    <span>Rs. 0 of Rs. {project.goalAmount.toLocaleString()}</span>
                  </div>
                  <button
                    onClick={() => {
                      // Would open sponsor modal in real implementation
                      alert('Sponsor flow would open here');
                    }}
                    className="w-full mt-4 px-4 py-2 bg-[#166F7C] text-white rounded-md hover:bg-[#0d5a63] disabled:opacity-50"
                    disabled={!(!userHasSponsored && (project.status === 'funding' || project.status === 'pending'))}
                  >
                    {userHasSponsored ? 'Sponsored' : project.status === 'funding' || project.status === 'pending' ? 'Sponsor this project' : 'Funding complete'}
                  </button>
                </div>
              </div>

              {/* Volunteers */}
              <div className="mb-8">
                <h2 className="text-xl font-bold text-[#10242A] mb-4">
                  Volunteers
                </h2>
                <div className="space-y-4">
                  <div className="flex justify-between text-[#4B6166] mb-2">
                    <span>Volunteer spots</span>
                    <span>0 / {project.volunteersNeeded}</span>
                  </div>
                  <button
                    onClick={() => {
                      // Would open volunteer modal in real implementation
                      alert('Volunteer flow would open here');
                    }}
                    className="w-full px-4 py-2 bg-[#33754A] text-white rounded-md hover:bg-[#285E3E] disabled:opacity-50"
                    disabled={!(!userHasVolunteered && (project.status === 'funding' || project.status === 'ready'))}
                  >
                    {userHasVolunteered ? 'Volunteering' : project.status === 'funding' || project.status === 'ready' ? 'Volunteer for this project' : 'Volunteering closed'}
                  </button>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Location Map */}
              <div className="mb-6">
                <h3 className="font-semibold text-[#10242A] mb-2">
                  Location
                </h3>
                <div className="h-48 rounded-lg shadow overflow-hidden">
                  <MapContainer
                    center={mapCenter}
                    zoom={13}
                    scrollWheelZoom={false}
                    className="w-full h-full"
                  >
                    <TileLayer
                      attribution='&copy <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={mapCenter}>
                      <Popup>
                        <span className="font-medium">{project.title}</span>
                        <br />
                        <span className="text-xs">{project.place}</span>
                      </Popup>
                    </Marker>
                  </MapContainer>
                </div>
              </div>

              {/* Organizer */}
              <div className="mb-6">
                <h3 className="font-semibold text-[#10242A] mb-2">
                  Organizer
                </h3>
                <div className="space-y-2">
                  <p className="text-[#4B6166] font-medium">
                    Demo Organizer
                  </p>
                  <p className="text-sm text-[#4B6166]">
                    Terra Demo Org
                  </p>
                </div>
              </div>

              {/* Sponsors */}
              <div className="mb-6">
                <h3 className="font-semibold text-[#10242A] mb-2">
                  Sponsors
                </h3>
                <div className="space-y-2">
                  <p className="text-xs text-[#4B6166]">
                    No sponsors yet
                  </p>
                </div>
              </div>

              {/* Volunteers List */}
              <div className="mb-6">
                <h3 className="font-semibold text-[#10242A] mb-2">
                  Volunteers
                </h3>
                <div className="space-y-2">
                  <p className="text-xs text-[#4B6166]">
                    No volunteers yet
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProjectDetail;