import { useAuth } from '../context/AuthContext';
import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import * as QRCodeReactModule from 'qrcode.react';
// Try to get the QRCodeReact component from the module
const QRCodeReact = QRCodeReactModule.default || QRCodeReactModule.QRCodeReact || QRCodeReactModule;

const VolunteerTicket = () => {
  const { user } = useAuth();
  const { ticketCode } = useParams();
  const navigate = useNavigate();
  const [showQR, setShowQR] = useState(false);

  // In a real implementation, we would look up the volunteer registration by ticket code
  const volunteerRegistration = {
    id: 'vol-123',
    projectId: 'project-bagmati-cleanup',
    projectTitle: 'Bagmati Riverside Cleanup',
    projectDate: 'October 12, 2026',
    volunteerName: user ? user.name : 'Kathmandu Eco Club',
    peopleCount: 20,
    ticketCode: 'TV-X7K92P',
    checkedInCount: 0
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleToggleQR = () => {
    setShowQR(!showQR);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-[#F2F5F4] pt-16">
      <div className="w-full max-w-md space-y-6">
        <div className="border-2 border-[#166F7C] rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-[#10242A]">
              VOLUNTEER PASS
            </h2>
            <button
              onClick={handleToggleQR}
              className="text-xs text-[#166F7C] hover:underline"
            >
              {showQR ? 'Hide QR' : 'Show QR'}
            </button>
          </div>

          <div className="text-center mb-6">
            <h3 className="text-lg font-medium text-[#10242A]">
              {volunteerRegistration.projectTitle}
            </h3>
          </div>

          <div className="space-y-2 text-[#4B6166] mb-6">
            <p>
              <span className="font-medium">{volunteerRegistration.volunteerName}</span>
              <br />
              <span className="text-xs">{volunteerRegistration.peopleCount} volunteers</span>
            </p>
            <p>
              <span className="font-medium">Event</span>
              <br />
              <span>{volunteerRegistration.projectDate}</span>
            </p>
            <p>
              <span className="font-medium">Ticket</span>
              <br />
              <span className="font-mono">{volunteerRegistration.ticketCode}</span>
            </p>
          </div>

          {showQR && (
            <div className="flex items-center justify-center my-6">
              <QRCodeReact
                value={`TERRA-VOLUNTEER:${volunteerRegistration.ticketCode}`}
                size={120}
                level="Q"
                includeMargin={false}
                svgAttributes={{ fill: '#166F7C' }}
              />
            </div>
          )}

          <div className="text-center text-[4B6166] text-sm my-6">
            Show this QR code during check-in.
          </div>
        </div>

        <div className="flex justify-center my-6">
          <button
            onClick={handleBack}
            className="px-4 py-2 bg-[#166F7C] text-white rounded-md hover:bg-[#0d5a63] transition-colors"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default VolunteerTicket;