import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { MapPin, Users, Heart, DollarSign } from 'lucide-react';
import { useEffect, useState } from 'react';
import { seedProjects } from '../data/seed';

const Home = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({});
  const [featuredProjects, setFeaturedProjects] = useState([]);

  useEffect(() => {
    // Calculate stats from seed projects
    const projects = seedProjects;

    const completedProjects = projects.filter(p => p.status === 'verified').length;
    const totalWasteRecovered = projects
      .filter(p => p.category === 'waste' || p.category === 'plastic')
      .reduce((sum, p) => sum + (p.targetResult || 0), 0);
    const totalVolunteers = projects.reduce((sum, p) => sum + (p.volunteersNeeded || 0), 0);
    const totalFunded = projects.reduce((sum, p) => sum + (p.goalAmount || 0), 0);

    setStats({
      projects: completedProjects,
      waste: totalWasteRecovered,
      volunteers: totalVolunteers,
      funded: totalFunded
    });

    // Get 3 featured projects (mix of statuses)
    const featured = [...projects]
      .sort(() => 0.5 - Math.random()) // shuffle
      .slice(0, 3);
    setFeaturedProjects(featured);
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-[#F2F5F4] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-[#10242A] mb-4">
              Small actions. Real impact.
            </h1>
            <p className="text-lg text-[#4B6166] mb-8">
              Fund local environmental projects, volunteer with your community, and see verified results from the work you helped make possible.
            </p>
            <div className="flex flex-col sm:flex-row sm:justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                to="/projects"
                className="flex items-center justify-center px-6 py-3 bg-[#166F7C] text-white rounded-md hover:bg-[#0d5a63] transition-colors font-medium"
              >
                Explore projects
              </Link>
              <Link
                to="/dashboard/create-project"
                className="flex items-center justify-center px-6 py-3 border border-[#DBE4E2] rounded-md hover:bg-[#F2F5F4] transition-colors font-medium text-[#166F7C]"
              >
                Start a project
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#10242A] mb-10 text-center">
            Impact so far
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="flex items-center justify-center mb-3">
                <MapPin className="h-6 w-6 text-[#166F7C]" />
              </div>
              <h3 className="text-3xl font-bold text-[#166F7C]">{stats.projects}</h3>
              <p className="text-sm text-[#4B6166]">Projects completed</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-3">
                <Users className="h-6 w-6 text-[#33754A]" />
              </div>
              <h3 className="text-3xl font-bold text-[#33754A]">{stats.volunteers}</h3>
              <p className="text-sm text-[#4B6166]">Volunteers</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-3">
                <DollarSign className="h-6 w-6 text-[#B57B08]" />
              </div>
              <h3 className="text-3xl font-bold text-[#B57B08]">Rs. {stats.funded ? stats.funded.toLocaleString() : 0}</h3>
              <p className="text-sm text-[#4B6166]">Community funded</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-3">
                <Heart className="h-6 w-6 text-[#AC4320]" />
              </div>
              <h3 className="text-3xl font-bold text-[#AC4320]">{stats.waste} kg</h3>
              <p className="text-sm text-[#4B6166]">Waste recovered</p>
            </div>
          </div>
        </div>
      </section>

      {/* How Terra Works */}
      <section className="bg-[#F2F5F4] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#10242A] mb-12 text-center">
            How Terra works
          </h2>
          <div className="grid grid-cols-1 gap-8">
            <div className="flex flex-col items-center space-y-6 text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-[#166F7C] rounded-full text-white flex-shrink-0">
                01
              </div>
              <h3 className="text-xl font-bold text-[#10242A]">Choose a project</h3>
              <p className="text-[#4B6166]">Browse verified environmental projects needing support</p>
            </div>
            <div className="flex flex-col items-center space-y-6 text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-[#166F7C] rounded-full text-white flex-shrink-0">
                02
              </div>
              <h3 className="text-xl font-bold text-[#10242A]">Fund or volunteer</h3>
              <p className="text-[#4B6166]">Support projects that match your values and capacity</p>
            </div>
            <div className="flex flex-col items-center space-y-6 text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-[#166F7C] rounded-full text-white flex-shrink-0">
                03
              </div>
              <h3 className="text-xl font-bold text-[#10242A]">The work happens</h3>
              <p className="text-[#4B6166]">Local teams execute the environmental work</p>
            </div>
            <div className="flex flex-col items-center space-y-6 text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-[#166F7C] rounded-full text-white flex-shrink-0">
                04
              </div>
              <h3 className="text-xl font-bold text-[#10242A]">See verified impact</h3>
              <p className="text-[#4B6166]">Track results with before/after evidence and verification</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#10242A] mb-10 text-center">
            Featured projects
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project) => (
              <div key={project.id} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow">
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
                  <p className="text-[#4B6166] line-clamp-2 mb-4">{project.place}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-[#4B6166]">
                      <span>Funding</span>
                      <span>Rs. 0 of Rs. {project.goalAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm text-[#4B6166]">
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
            ))}
          </div>
        </div>
      </section>

      {/* Map Preview */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#10242A] mb-8 text-center">
            Projects near you
          </h2>
          <div id="map-preview" className="h-96 rounded-lg shadow overflow-hidden">
            {/* Map will be implemented here */}
            <div className="flex h-full items-center justify-center bg-[#F2F5F4]">
              <p className="text-[#4B6166]">Map preview showing project locations</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;