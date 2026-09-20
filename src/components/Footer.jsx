import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#10242A] text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="font-semibold mb-4">Terra</h3>
            <p className="text-[#DBE4E2]">
              Connecting sponsors, volunteers, organizers, and verifiers for local environmental projects in the Kathmandu Valley.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-[#DBE4E2]">
              <li>
                <Link to="/" className="hover:text-white">Home</Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-white">Projects</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white">About</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Get involved</h3>
            <ul className="space-y-2 text-[#DBE4E2]">
              <li>
                <Link to="/dashboard/create-project" className="hover:text-white">Start a project</Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-white">Support a project</Link>
              </li>
              <li>
                <Link to="/report" className="hover:text-white">Report a site</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <p className="text-[#DBE4E2]">
              hello@terra.demo<br />
              Kathmandu Valley, Nepal
            </p>
          </div>
        </div>
        <div className="mt-8 pt-4 border-t-[rgba(255,255,255,0.1)] text-center text-[#DBE4E2] text-sm">
          &copy; {new Date().getFullYear()} Terra. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;