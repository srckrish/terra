import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvent } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { DISTRICTS } from '../data/seed';

const CreateProject = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user || user.role !== 'organizer') {
    navigate('/');
    return null;
  }

  const [formData, setFormData] = useState({
    title: '',
    category: 'waste',
    district: '',
    place: '',
    description: '',
    eventDate: '',
    goalAmount: '',
    volunteersNeeded: '',
    targetResult: '',
    budgetNote: '',
    coverImageUrl: '',
    lat: '',
    lng: ''
  });

  const [mapCenter, setMapCenter] = useState([27.7, 85.3]); // Default Kathmandu
  const [markerPosition, setMarkerPosition] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validate required fields
    if (!formData.title || !formData.category || !formData.district || !formData.place ||
        !formData.description || !formData.eventDate || !formData.goalAmount ||
        !formData.volunteersNeeded || !formData.targetResult || !formData.budgetNote ||
        !formData.lat || !formData.lng) {
      setError('Please fill in all required fields');
      setLoading(false);
      return;
    }

    // Validate location is set
    if (!markerPosition) {
      setError('Please set the project location on the map');
      setLoading(false);
      return;
    }

    try {
      // In a real implementation, we would:
      // 1. Generate a unique ID
      // 2. Add the project to localStorage
      // 3. Set initial status to "pending"
      // 4. Navigate to organizer dashboard

      // For now, simulate success
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    } catch (err) {
      setError('Failed to create project');
      setLoading(false);
    }
  };

  const handleMapClick = (event) => {
    const { lat, lng } = event.latlng;
    setMarkerPosition([lat, lng]);
    setFormData({...formData, lat: lat.toString(), lng: lng.toString()});
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-[#F2F5F4] pt-16">
      <div className="w-full max-w-xl space-y-6">
        <div className="flex items-center justify-center mb-6">
          <span className="text-xl font-semibold text-[#166F7C]">Terra</span>
        </div>

        <h2 className="text-2xl font-bold text-[#10242A] text-center mb-6">
          Create a new project
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-[#4B6166] mb-2">
              Project title
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              required
              className="w-full px-4 py-2 border border-[#DBE4E2] rounded-md focus:outline-none focus:ring-2 focus:ring-[#166F7C]"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-[#4B6166] mb-2">
                Category
              </label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                required
                className="w-full px-4 py-2 border border-[#DBE4E2] rounded-md focus:outline-none focus:ring-2 focus:ring-[#166F7C]"
              >
                <option value="waste">River & Waste Cleanup</option>
                <option value="plastic">Plastic Recovery</option>
                <option value="trees">Tree Planting</option>
                <option value="compost">Community Composting</option>
              </select>
            </div>
            <div>
              <label htmlFor="district" className="block text-sm font-medium text-[#4B6166] mb-2">
                District
              </label>
              <select
                id="district"
                value={formData.district}
                onChange={(e) => setFormData({...formData, district: e.target.value})}
                required
                className="w-full px-4 py-2 border border-[#DBE4E2] rounded-md focus:outline-none focus:ring-2 focus:ring-[#166F7C]"
              >
                <option value="">Select district</option>
                {DISTRICTS.map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="place" className="block text-sm font-medium text-[#4B6166] mb-2">
              Place / Location name
            </label>
            <input
              type="text"
              id="place"
              value={formData.place}
              onChange={(e) => setFormData({...formData, place: e.target.value})}
              required
              className="w-full px-4 py-2 border border-[#DBE4E2] rounded-md focus:outline-none focus:ring-2 focus:ring-[#166F7C]"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-[#4B6166] mb-2">
              Description
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              required
              rows={4}
              className="w-full px-4 py-2 border border-[#DBE4E2] rounded-md focus:outline-none focus:ring-2 focus:ring-[#166F7C]"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="eventDate" className="block text-sm font-medium text-[#4B6166] mb-2">
                Event date
              </label>
              <input
                type="date"
                id="eventDate"
                value={formData.eventDate}
                onChange={(e) => setFormData({...formData, eventDate: e.target.value})}
                required
                className="w-full px-4 py-2 border border-[#DBE4E2] rounded-md focus:outline-none focus:ring-2 focus:ring-[#166F7C]"
              />
            </div>
            <div>
              <label htmlFor="goalAmount" className="block text-sm font-medium text-[#4B6166] mb-2">
                Funding goal (Rs.)
              </label>
              <input
                type="number"
                id="goalAmount"
                value={formData.goalAmount}
                onChange={(e) => setFormData({...formData, goalAmount: e.target.value})}
                required
                min={0}
                className="w-full px-4 py-2 border border-[#DBE4E2] rounded-md focus:outline-none focus:ring-2 focus:ring-[#166F7C]"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="volunteersNeeded" className="block text-sm font-medium text-[#4B6166] mb-2">
                Volunteers needed
              </label>
              <input
                type="number"
                id="volunteersNeeded"
                value={formData.volunteersNeeded}
                onChange={(e) => setFormData({...formData, volunteersNeeded: e.target.value})}
                required
                min={1}
                className="w-full px-4 py-2 border border-[#DBE4E2] rounded-md focus:outline-none focus:ring-2 focus:ring-[#166F7C]"
              />
            </div>
            <div>
              <label htmlFor="targetResult" className="block text-sm font-medium text-[#4B6166] mb-2">
                Target result
              </label>
              <input
                type="number"
                id="targetResult"
                value={formData.targetResult}
                onChange={(e) => setFormData({...formData, targetResult: e.target.value})}
                required
                min={0}
                className="w-full px-4 py-2 border border-[#DBE4E2] rounded-md focus:outline-none focus:ring-2 focus:ring-[#166F7C]"
              />
            </div>
          </div>

          <div>
            <label htmlFor="budgetNote" className="block text-sm font-medium text-[#4B6166] mb-2">
              Budget note
            </label>
            <textarea
              id="budgetNote"
              value={formData.budgetNote}
              onChange={(e) => setFormData({...formData, budgetNote: e.target.value})}
              required
              rows={3}
              className="w-full px-4 py-2 border border-[#DBE4E2] rounded-md focus:outline-none focus:ring-2 focus:ring-[#166F7C]"
            />
          </div>

          <div>
            <label htmlFor="coverImageUrl" className="block text-sm font-medium text-[#4B6166] mb-2">
              Cover image URL
            </label>
            <input
              type="url"
              id="coverImageUrl"
              value={formData.coverImageUrl}
              onChange={(e) => setFormData({...formData, coverImageUrl: e.target.value})}
              className="w-full px-4 py-2 border border-[#DBE4E2] rounded-md focus:outline-none focus:ring-2 focus:ring-[#166F7C]"
            />
          </div>

          {/* Map Section */}
          <div className="mb-4">
            <h3 className="font-semibold text-[#10242A] mb-2">
              Project location
            </h3>
            <div className="h-64 rounded-lg shadow overflow-hidden">
              <MapContainer
                center={mapCenter}
                zoom={13}
                scrollWheelZoom={true}
                className="w-full h-full"
                onClick={handleMapClick}
              >
                <TileLayer
                  attribution='&copy <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {markerPosition && (
                  <Marker position={markerPosition}>
                    <Popup>
                      <span className="font-medium">Project location</span>
                    </Popup>
                  </Marker>
                )}
              </MapContainer>
              {!markerPosition && (
                <div className="flex h-full items-center justify-center bg-[#F2F5F4]">
                  <p className="text-[#4B6166] text-center p-4">
                    Click on the map to set the project location
                  </p>
                </div>
              )}
            </div>
          </div>

          {error && (
            <p className="text-sm text-[#AC4320]">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 bg-[#166F7C] text-white rounded-md hover:bg-[#0d5a63] disabled:opacity-50 transition-colors"
          >
            {loading ? 'Creating project...' : 'Create project'}
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-[4B6166] text-sm">
            Already have an organizer account?
          </p>
          <button
            onClick={() => navigate('/login')}
            className="font-medium text-[#166F7C] hover:text-[#0d5a63]"
          >
            Log in
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateProject;