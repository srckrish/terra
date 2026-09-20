import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Signup = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    role: 'sponsor',
    organizationName: '',
    organizationAbout: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await register(formData);
      if (result.success) {
        navigate('/dashboard');
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('An error occurred during registration');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-[#F2F5F4] pt-16">
      <div className="w-full max-w-md space-y-6">
        <div className="flex items-center justify-center mb-6">
          <span className="text-xl font-semibold text-[#166F7C]">Terra</span>
        </div>

        <h2 className="text-2xl font-bold text-[#10242A] text-center mb-6">
          Create your account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-[#4B6166] mb-2">
              Full name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
              className="w-full px-4 py-2 border border-[#DBE4E2] rounded-md focus:outline-none focus:ring-2 focus:ring-[#166F7C]"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#4B6166] mb-2">
              Email address
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
              className="w-full px-4 py-2 border border-[#DBE4E2] rounded-md focus:outline-none focus:ring-2 focus:ring-[#166F7C]"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-[#4B6166] mb-2">
              Phone number
            </label>
            <input
              type="tel"
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              required
              className="w-full px-4 py-2 border border-[#DBE4E2] rounded-md focus:outline-none focus:ring-2 focus:ring-[#166F7C]"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-[#4B6166] mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
              minLength={6}
              className="w-full px-4 py-2 border border-[#DBE4E2] rounded-md focus:outline-none focus:ring-2 focus:ring-[#166F7C]"
            />
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-medium text-[#4B6166] mb-2">
              I'm signing up as a...
            </label>
            <select
              id="role"
              value={formData.role}
              onChange={(e) => setFormData({...formData, role: e.target.value})}
              className="w-full px-4 py-2 border border-[#DBE4E2] rounded-md focus:outline-none focus:ring-2 focus:ring-[#166F7C]"
            >
              <option value="sponsor">Sponsor (fund projects)</option>
              <option value="organizer">Organizer (create projects)</option>
              <option value="verifier">Verifier (review impact)</option>
            </select>
          </div>

          {/* Organization info (shown for organizer role) */}
          {formData.role === 'organizer' && (
            <>
              <div className="mt-4">
                <label htmlFor="organizationName" className="block text-sm font-medium text-[#4B6166] mb-2">
                  Organization name
                </label>
                <input
                  type="text"
                  id="organizationName"
                  value={formData.organizationName}
                  onChange={(e) => setFormData({...formData, organizationName: e.target.value})}
                  className="w-full px-4 py-2 border border-[#DBE4E2] rounded-md focus:outline-none focus:ring-2 focus:ring-[#166F7C]"
                />
              </div>

              <div className="mt-4">
                <label htmlFor="organizationAbout" className="block text-sm font-medium text-[#4B6166] mb-2">
                  About your organization
                </label>
                <textarea
                  id="organizationAbout"
                  value={formData.organizationAbout}
                  onChange={(e) => setFormData({...formData, organizationAbout: e.target.value})}
                  rows={3}
                  className="w-full px-4 py-2 border border-[#DBE4E2] rounded-md focus:outline-none focus:ring-2 focus:ring-[#166F7C]"
                />
              </div>
            </>
          )}

          {error && (
            <p className="text-sm text-[#AC4320]">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 bg-[#166F7C] text-white rounded-md hover:bg-[#0d5a63] disabled:opacity-50 transition-colors"
          >
            {loading ? 'Creating account...' : 'Sign up'}
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-[4B6166] text-sm">
            Already have an account?
          </p>
          <Link
            to="/login"
            className="font-medium text-[#166F7C] hover:text-[#0d5a63]"
          >
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;