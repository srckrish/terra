import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { seedProjects } from '../data/seed';
import { CATEGORIES, DISTRICTS } from '../data/seed';

const Projects = () => {
  const { user } = useAuth();
  const [projects] = useState(seedProjects);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    district: '',
    status: ''
  });

  // Filter projects based on selected filters
  const filteredProjects = projects.filter(project => {
    // Search filter
    if (filters.search &&
        !project.title.toLowerCase().includes(filters.search.toLowerCase()) &&
        !project.description.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }

    // Category filter
    if (filters.category && project.category !== filters.category) {
      return false;
    }

    // District filter
    if (filters.district && project.district !== filters.district) {
      return false;
    }

    // Status filter
    if (filters.status && project.status !== filters.status) {
      return false;
    }

    return true;
  });

  return (
    <>
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-[#10242A] mb-4">
            Environmental projects near you
          </h1>
          <p className="text-[#4B6166] mb-6">
            Find a project to fund or join.
          </p>

          {/* Filters */}
          <div className="grid gap-4 sm:grid-cols-4 mb-8">
            <div>
              <input
                type="text"
                placeholder="Search projects..."
                value={filters.search}
                onChange={(e) => setFilters({...filters, search: e.target.value})}
                className="w-full px-4 py-2 border border-[#DBE4E2] rounded-md focus:outline-none focus:ring-2 focus:ring-[#166F7C]"
              />
            </div>
            <div>
              <select
                value={filters.category}
                onChange={(e) => setFilters({...filters, category: e.target.value})}
                className="w-full px-4 py-2 border border-[#DBE4E2] rounded-md focus:outline-none focus:ring-2 focus:ring-[#166F7C]"
              >
                <option value="">All Categories</option>
                {Object.entries(CATEGORIES).map(([key, category]) => (
                  <option key={key} value={key}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <select
                value={filters.district}
                onChange={(e) => setFilters({...filters, district: e.target.value})}
                className="w-full px-4 py-2 border border-[#DBE4E2] rounded-md focus:outline-none focus:ring-2 focus:ring-[#166F7C]"
              >
                <option value="">All Districts</option>
                {DISTRICTS.map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <select
                value={filters.status}
                onChange={(e) => setFilters({...filters, status: e.target.value})}
                className="w-full px-4 py-2 border border-[#DBE4E2] rounded-md focus:outline-none focus:ring-2 focus:ring-[#166F7C]"
              >
                <option value="">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="funding">Funding</option>
                <option value="ready">Ready</option>
                <option value="evidence">Evidence</option>
                <option value="review">Review</option>
                <option value="verified">Verified</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.length === 0 ? (
              <div className="col-span-3 text-center py-12">
                <p className="text-[#4B6166]">No projects match your filters.</p>
                <button
                  onClick={() => setFilters({search: '', category: '', district: '', status: ''})}
                  className="mt-4 px-4 py-2 bg-[#166F7C] text-white rounded-md hover:bg-[#0d5a63]"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} currentUser={user} />
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

// Project Card Component
const ProjectCard = ({ project, currentUser }) => {
  // Determine status label
  const statusLabels = {
    pending: 'Awaiting approval',
    funding: 'Funding open',
    ready: 'Fully funded',
    evidence: 'Awaiting evidence',
    review: 'Under verification',
    verified: 'Impact verified',
    rejected: 'Not approved'
  };

  const statusColors = {
    pending: 'border-[#DBE4E2] bg-[#F8F9FA]',
    funding: 'border-[#166F7C] bg-[#E0F0F1]',
    ready: 'border-[#33754A] bg-[#E8F5E9]',
    evidence: 'border-[#B57B08] bg:#[FFF8F0]',
    review: 'border-[#AC4320] bg:#[FEF3F0]',
    verified: 'border-[#33754A] bg-[#E8F5E9]',
    rejected: 'border-[#AC4320] bg:#[FEF3F0]'
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow">
      <img
        src={project.coverImageUrl}
        alt={project.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex items-center space-x-2 mb-2">
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-[#E0F0F1] text-[#166F7C]">
            {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
          </span>
          <span className="ml-auto text-xs text-[#4B6166]">
            {new Date(project.eventDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </span>
        </div>
        <h3 className="font-semibold text-[#10242A] mb-2">{project.title}</h3>
        <p className="text-[#4B6166] line-clamp-2 mb-4">{project.place}, {project.district}</p>

        {/* Status Badge */}
        <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mb-3 ${statusColors[project.status] || ''}`}>
          {statusLabels[project.status] || project.status}
        </div>

        {/* Progress Info */}
        <div className="space-y-2 text-sm text-[#4B6166]">
          <div className="flex justify-between">
            <span>Funding</span>
            <span>Rs. 0 of Rs. {project.goalAmount.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Volunteers</span>
            <span>0 / {project.volunteersNeeded}</span>
          </div>
        </div>

        <Link
          to={`/projects/${project.id}`}
          className="mt-4 w-full flex items-center justify-center px-4 py-2 bg-[#166F7C] text-white rounded-md hover:bg-[#0d5a63] transition-colors font-medium text-sm"
        >
          View project
        </Link>
      </div>
    </div>
  );
};

export default Projects;