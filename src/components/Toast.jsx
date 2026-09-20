import { useState, useEffect } from 'react';

const TOAST_TYPES = {
  success: { bg: '#E8F5E9', border: '#33754A', text: '#33754A' },
  error: { bg: '#FEF3F0', border: '#AC4320', text: '#AC4320' },
  warning: { bg: '#FFF8F0', border: '#B57B08', text: '#B57B08' },
  info: { bg: '#E0F0F1', border: '#166F7C', text: '#166F7C' }
};

const ToastContainer = () => {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'info') => {
    const id = Date.now() + Math.random();
    const toast = {
      id,
      message,
      type
    };
    setToasts(prev => [...prev, toast]);

    // Auto remove after 5 seconds
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 5000);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  return (
    <>
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`fixed bottom-4 right-4 w-64 p-4 mb-4 rounded-lg shadow-lg z-50 flex items-center space-x-3
          bg-${TOAST_TYPES[toast.type].bg} border-l-4 border-${TOAST_TYPES[toast.type].border}
          ${toast.type === 'success' && 'border-l-4'}
          animate-in animate-out fade-in fade-out`}
        >
          <div className="flex-shrink-0">
            {/* Simple icon based on type */}
            <div className={`w-5 h-5 flex items-center justify-center rounded-full bg-${TOAST_TYPES[toast.type].border}/20
            text-${TOAST_TYPES[toast.type].text}`}>
              {toast.type === 'success' && '✓'}
              {toast.type === 'error' && '✗'}
              {toast.type === 'warning' && '⚠'}
              {toast.type === 'info' && 'ℹ'}
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-[${TOAST_TYPES[toast.type].text}]">
              {toast.message}
            </p>
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="ml-auto text-[${TOAST_TYPES[toast.type].text}] hover:underline"
          >
            ×
          </button>
        </div>
      ))}

      {/* Return the addToast function for use in other components */}
      <div id="toast-api" data-add-toast={JSON.stringify({ addToast })} />
    </>
  );
};

export default ToastContainer;

// Custom hook to use toast in components
export const useToast = () => {
  // In a real implementation, we would use context or a more sophisticated approach
  // For now, we'll return a simple function that shows an alert
  return (message, type = 'info') => {
    alert(`${type.toUpperCase()}: ${message}`);
  };
};