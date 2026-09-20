import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await login(formData.email, formData.password);
      if (result.success) {
        navigate('/dashboard');
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  const handleGuestLogin = (role) => {
    // In a real implementation, this would create a guest session
    // For now, we'll just redirect to dashboard
    navigate('/dashboard');
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-[#F2F5F4] pt-16">
      <div className="w-full max-w-md space-y-6">
        <div className="flex items-center justify-center mb-6">
          <span className="text-xl font-semibold text-[#166F7C]">Terra</span>
        </div>

        <h2 className="text-2xl font-bold text-[#10242A] text-center mb-6">
          Welcome back
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
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
            <label htmlFor="password" className="block text-sm font-medium text-[#4B6166] mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
              className="w-full px-4 py-2 border border-[#DBE4E2] rounded-md focus:outline-none focus:ring-2 focus:ring-[#166F7C]"
            />
          </div>

          {error && (
            <p className="text-sm text-[#AC4320]">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 bg-[#166F7C] text-white rounded-md hover:bg-[#0d5a63] disabled:opacity-50 transition-colors"
          >
            {loading ? 'Logging in...' : 'Log in'}
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-[4B6166] text-sm">
            Don't have an account?
          </p>
          <Link
            to="/signup"
            className="font-medium text-[#166F7C] hover:text-[#0d5a63]"
          >
            Sign up
          </Link>
        </div>

        {/* Demo Accounts Section */}
        <div className="mt-8 pt-6 border-t border-[#DBE4E2]">
          <h3 className="text-lg font-bold text-[#10242A] mb-4 text-center">
            Demo accounts
          </h3>
          <div className="space-y-3">
            <div>
              <p className="text-[4B6166] text-sm mb-2">
                Sponsor
              </p>
              <button
                onClick={() => handleGuestLogin('sponsor')}
                className="w-full px-4 py-2 border border-[#DBE4E2] rounded-md hover:bg-[#F2F5F4]"
              >
                Use Sponsor Demo
              </button>
            </div>
            <div>
              <p className="text-[4B6166] text-sm mb-2">
                Organizer
              </p>
              <button
                onClick={() => handleGuestLogin('organizer')}
                className="w-full px-4 py-2 border border-[#DBE4E2] rounded-md hover:bg-[#F2F5F4]"
              >
                Use Organizer Demo
              </button>
            </div>
            <div>
              <p className="text-[4B6166] text-sm mb-2">
                Verifier
              </p>
              <button
                onClick={() => handleGuestLogin('verifier')}
                className="w-full px-4 py-2 border border-[#DBE4E2] rounded-md hover:bg-[#F2F5F4]"
              >
                Use Verifier Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;