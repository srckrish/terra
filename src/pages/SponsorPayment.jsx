import { useAuth } from '../context/AuthContext';
import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const SponsorPayment = () => {
  const { user } = useAuth();
  const { amount } = useParams();
  const navigate = useNavigate();
  const [paymentStep, setPaymentStep] = useState('amount'); // amount, payment-method, processing, success
  const [selectedMethod, setSelectedMethod] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleBack = () => {
    if (paymentStep === 'payment-method') {
      setPaymentStep('amount');
    } else if (paymentStep === 'processing') {
      setPaymentStep('payment-method');
    } else if (paymentStep === 'success') {
      navigate(-2); // Go back to project detail
    } else {
      navigate(-1);
    }
  };

  const handleAmountSelect = (selectedAmount) => {
    // In a real implementation, we would store this and proceed
    setPaymentStep('payment-method');
  };

  const handleMethodSelect = (method) => {
    setSelectedMethod(method);
    setPaymentStep('processing');
    setIsProcessing(true);

    // Simulate processing delay
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentStep('success');
    }, 1500);
  };

  const handlePaymentSuccess = () => {
    // In a real implementation, we would:
    // 1. Save sponsorship to localStorage
    // 2. Update project funding progress
    // 3. Check if goal is reached and update project status
    // 4. Show success notification

    // For now, just go back after a delay
    setTimeout(() => {
      navigate(-2); // Go back to project detail
    }, 1500);
  };

  if (paymentStep === 'amount') {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-[#F2F5F4] pt-16">
        <div className="w-full max-w-md space-y-6">
          <h2 className="text-2xl font-bold text-[#10242A] text-center">
            Sponsor this project
          </h2>
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="text-xl font-bold text-[#10242A]">Amount</h3>
              <p className="text-[#4B6166]">How much would you like to contribute?</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <button
                onClick={() => handleAmountSelect(500)}
                className="px-4 py-3 border border-[#DBE4E2] rounded-md hover:bg-[#F2F5F4] transition-colors"
              >
                Rs. 500
              </button>
              <button
                onClick={() => handleAmountSelect(1000)}
                className="px-4 py-3 border border-[#DBE4E2] rounded-md hover:bg-[#F2F5F4] transition-colors"
              >
                Rs. 1,000
              </button>
              <button
                onClick={() => handleAmountSelect(2500)}
                className="px-4 py-3 border border-[#DBE4E2] rounded-md hover:bg-[#F2F5F4] transition-colors"
              >
                Rs. 2,500
              </button>
              <button
                onClick={() => handleAmountSelect(5000)}
                className="px-4 py-3 border border-[#DBE4E2] rounded-md hover:bg-[#F2F5F4] transition-colors"
              >
                Rs. 5,000
              </button>
              <button
                onClick={() => handleAmountSelect('custom')}
                className="px-4 py-3 border border-[#DBE4E2] rounded-md hover:bg-[#F2F5F4] transition-colors"
              >
                Custom amount
              </button>
            </div>
          </div>
          <div className="flex justify-between">
            <button
              onClick={() => navigate(-1)}
              className="px-4 py-2 text-sm font-medium text-[#4B6166] hover:text-[#166F7C]"
            >
              Back
            </button>
            <button
              onClick={() => setPaymentStep('payment-method')}
              className="px-4 py-2 bg-[#166F7C] text-white rounded-md hover:bg-[#0d5a63] transition-colors"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (paymentStep === 'payment-method') {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-[#F2F5F4] pt-16">
        <div className="w-full max-w-md space-y-6">
          <h2 className="text-2xl font-bold text-[#10242A] text-center">
            Sponsor this project
          </h2>
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="text-xl font-bold text-[#10242A]">Payment method</h3>
              <p className="text-[#4B6166]">Choose how you'd like to pay</p>
            </div>
            <div className="space-y-4">
              <button
                onClick={() => handleMethodSelect('esewa')}
                className="w-full px-6 py-4 border border-[#DBE4E2] rounded-md flex items-center space-x-3 hover:bg-[#F2F5F4] transition-colors"
              >
                <div className="flex-shrink-0">
                  {/* eSewa logo would go here */}
                  <div className="w-8 h-8 bg-[#F2F5F4] rounded-full flex items-center justify-center">
                    <span className="text-[#166F7C] font-bold">eS</span>
                  </div>
                </div>
                <div>
                  <span className="text-left w-full">
                    <span className="font-medium text-[#10242A]">eSewa</span>
                    <br />
                    <span className="text-xs text-[#4B6166]">Digital wallet</span>
                  </span>
                </div>
                <div className="ml-auto text-[4B6166]">
                  →
                </div>
              </button>
              <button
                onClick={() => handleMethodSelect('khalti')}
                className="w-full px-6 py-4 border border-[#DBE4E2] rounded-md flex items-center space-x-3 hover:bg-[#F2F5F4] transition-colors"
              >
                <div className="flex-shrink-0">
                  {/* Khalti logo would go here */}
                  <div className="w-8 h-8 bg-[#F2F5F4] rounded-full flex items-center justify-center">
                    <span className="text-[#166F7C] font-bold">K</span>
                  </div>
                </div>
                <div>
                  <span className="text-left w-full">
                    <span className="font-medium text-[#10242A]">Khalti</span>
                    <br />
                    <span className="text-xs text-[#4B6166]">Digital wallet</span>
                  </span>
                </div>
                <div className="ml-auto text-[4B6166]">
                  →
                </div>
              </button>
            </div>
          </div>
          <div className="flex justify-between">
            <button
              onClick={handleBack}
              className="px-4 py-2 text-sm font-medium text-[#4B6166] hover:text-[#166F7C]"
            >
              Back
            </button>
            <button
              onClick={() => setPaymentStep('amount')}
              className="px-4 py-2 bg-[#166F7C] text-white rounded-md hover:bg-[#0d5a63] transition-colors"
            >
              Change amount
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (paymentStep === 'processing') {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-[#F2F5F4] pt-16">
        <div className="w-full max-w-md text-center space-y-6">
          <h2 className="text-2xl font-bold text-[#10242A]">
            Processing payment
          </h2>
          <p className="text-[#4B6166]">
            Please wait while we process your payment securely.
          </p>
          <div className="flex items-center justify-center">
            <div className="w-12 h-12 border-2 border-[#166F7C] border-t-transparent border-l-transparent border-r-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-[4B6166] mt-4">
            This may take a few seconds.
          </p>
        </div>
      </div>
    );
  }

  if (paymentStep === 'success') {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-[#F2F5F4] pt-16">
        <div className="w-full max-w-md text-center space-y-6">
          <div className="flex items-center justify-center w-16 h-16 bg-[#33754A] text-white rounded-full mx-auto mb-4">
            <span className="text-2xl font-bold">✓</span>
          </div>
          <h2 className="text-2xl font-bold text-[#10242A]">
            Payment successful
          </h2>
          <p className="text-[#4B6166]">
            Your Rs. {amount} sponsorship has been recorded.
          </p>
          <p className="text-[4B6166] text-sm">
            Demo payment — no real money was charged.
          </p>
          <button
            onClick={handlePaymentSuccess}
            className="px-4 py-2 bg-[#166F7C] text-white rounded-md hover:bg-[#0d5a63] transition-colors"
          >
            Back to project
          </button>
        </div>
      </div>
    );
  }

  return null;
};

export default SponsorPayment;