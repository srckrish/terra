import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const Modal = ({ children, isOpen, onClose, title = '' }) => {
  const [mounted, setMounted] = useState(false);

  // Handle escape key to close modal
  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      const handleEscape = (e) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      document.addEventListener('keydown', handleEscape);
      return () => {
        document.removeEventListener('keydown', handleEscape);
      };
    } else {
      setMounted(false);
    }
  }, [isOpen, onClose]);

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen || !mounted) {
    return null;
  }

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="relative w-full max-w-md mx-4">
          <div className="bg-white rounded-lg shadow-lg w-full">
            <div className="flex justify-between items-start p-4">
              <h2 className="text-xl font-bold text-[#10242A]">{title}</h2>
              <button
                onClick={onClose}
                className="text-[4B6166] hover:text-[#AC4320]"
              >
                ×
              </button>
            </div>
            <div className="p-4">
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;