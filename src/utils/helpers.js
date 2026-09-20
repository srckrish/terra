// Helper functions for Terra application

// Format currency in Indian numbering system (lakhs, crores)
export const formatCurrency = (amount) => {
  if (amount >= 10000000) {
    return `Rs. ${(amount / 10000000).toFixed(2)}Cr`;
  } else if (amount >= 100000) {
    return `Rs. ${(amount / 100000).toFixed(2)}L`;
  } else {
    return `Rs. ${amount.toLocaleString()}`;
  }
};

// Format date to relative time or absolute date
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return 'Today';
  } else if (diffDays === 1) {
    return 'Yesterday';
  } else if (diffDays < 7) {
    return `${diffDays} days ago`;
  } else {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }
};

// Format number with commas
export const formatNumber = (num) => {
  return num.toLocaleString();
};

// Get status label with color
export const getStatusLabel = (status) => {
  const statusMap = {
    pending: { label: 'Awaiting approval', color: 'border-[#DBE4E2] bg-[#F8F9FA]' },
    funding: { label: 'Funding open', color: 'border-[#166F7C] bg-[#E0F0F1]' },
    ready: { label: 'Fully funded', color: 'border-[#33754A] bg-[#E8F5E9]' },
    evidence: { label: 'Awaiting evidence', color: 'border-[#B57B08] bg:#[FFF8F0]' },
    review: { label: 'Under verification', color: 'border-[#AC4320] bg:#[FEF3F0]' },
    verified: { label: 'Impact verified', color: 'border-[#33754A] bg-[#E8F5E9]' },
    rejected: { label: 'Not approved', color: 'border-[#AC4320] bg:#[FEF3F0]' }
  };

  return statusMap[status] || { label: status, color: '' };
};

// Truncate text to specified number of lines
export const truncateText = (text, lines) => {
  if (!text) return '';
  // Simplified implementation - in reality would use CSS line-clamp
  return text.length > 100 ? text.substring(0, 100) + '...' : text;
};

// Generate random ticket code
export const generateTicketCode = () => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Excluding confusing characters
  let code = 'TV-';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
};

// Calculate funding progress percentage
export const calculateFundingProgress = (raised, goal) => {
  if (goal === 0) return 0;
  return Math.min(100, Math.round((raised / goal) * 100));
};

export default {
  formatCurrency,
  formatDate,
  formatNumber,
  getStatusLabel,
  truncateText,
  generateTicketCode,
  calculateFundingProgress
};