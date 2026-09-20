import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Users,
  Heart,
  LogIn,
  LogOut,
  Plus,
  User
} from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center space-x-2 rtl:space-x-reverse">
                <span className="text-xl font-semibold text-[#166F7C]">Terra</span>
              </Link>
            </div>
            <div className="hidden md:block md:ml-10 md:flex md:space-x-8">
              <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium text-[#4B6166] hover:bg-[#F2F5F4] hover:text-[#166F7C]">
                Home
              </Link>
              <Link to="/projects" className="px-3 py-2 rounded-md text-sm font-medium text-[#4B6166] hover:bg-[#F2F5F4] hover:text-[#166F7C]">
                Projects
              </Link>
              <Link to="/about" className="px-3 py-2 rounded-md text-sm font-medium text-[#4B6166] hover:bg-[#F2F5F4] hover:text-[#166F7C]">
                About
              </Link>
            </div>
          </div>
          <div className="flex items-center md:ml-6">
            {user ? (
              <>
                <Link to="/dashboard" className="flex items-center space-x-2 text-sm font-medium text-[#4B6166] hover:text-[#166F7C]">
                  <User className="h-4 w-4" />
                  <span>{user.name}</span>
                </Link>
                <button
                  onClick={logout}
                  className="ml-4 flex h-9 w-9 items-center justify-center rounded-md border border-[#DBE4E2] bg-white text-sm font-medium text-[#4B6166] hover:bg-[#F2F5F4]"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="rounded-md bg-[#166F7C] px-3 py-2 text-sm font-medium text-white hover:bg-[#0d5a63]"
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  className="ml-4 rounded-md border border-[#DBE4E2] bg-white px-3 py-2 text-sm font-medium text-[#4B6166] hover:bg-[#F2F5F4]"
                >
                  Get started
                </Link>
              </>
            )}
          </div>
          <div className="-mr-2 flex items-center md:hidden">
            {/* Mobile menu button would go here */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;