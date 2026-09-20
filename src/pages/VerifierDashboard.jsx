import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import { seedProjects } from '../data/seed';

const VerifierDashboard = () => {
  const { user } = useAuth();

  if (!user || user.role !== 'verifier') {
    return <div className="p-6">Access denied</div>;
  }

  // Get projects for verification based on status
  const pendingApprovalProjects = seedProjects.filter(
    p => p.status === 'pending'
  );

  const evidenceReviewProjects = seedProjects.filter(
    p => p.status === 'evidence' || p.status === 'review'
  );

  const handleApprove = (projectId) => {
    // In a real implementation, we would update the project status
    alert(`Project approved! Status changed to "funding"`);
  };

  const handleReject = (projectId, note) => {
    // In a real implementation, we would update the project status and add a note
    alert(`Project rejected. Status changed to "rejected"`);
  };

  const handleVerifyImpact = (projectId) => {
    // In a real implementation, we would update the project status
    alert(`Impact verified! Status changed to "verified"`);
  };

  const handleSendBack = (projectId, note) => {
    // In a real implementation, we would send the evidence back for revision
    alert(`Evidence sent back for revision`);
  };

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-[#10242A]">Verifier Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span className="text-[4B6166]">Welcome back, {user.name}</span>
          </div>
        </div>

        <div className="grid gap-6">
          {/* Pending Approvals */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6">
              <h2 className="text-xl font-bold text-[#10242A] mb-4">
                Project approvals
              </h2>
              {pendingApprovalProjects.length === 0 ? (
                <p className="text-[4B6166] text-center py-6">
                  No projects pending approval.
                </p>
              ) : (
                <div className="space-y-4">
                  {pendingApprovalProjects.map((project) => (
                    <ProjectApprovalCard
                      key={project.id}
                      project={project}
                      onApprove={() => handleApprove(project.id)}
                      onReject={(note) => handleReject(project.id, note)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Evidence Verification */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6">
              <h2 className="text-xl font-bold text-[#10242A] mb-4">
                Evidence verification
              </h2>
              {evidenceReviewProjects.length === 0 ? (
                <p className="text-[4B6166] text-center py-6">
                  No evidence awaiting verification.
                </p>
              ) : (
                <div className="space-y-4">
                  {evidenceReviewProjects.map((project) => (
                    <EvidenceVerificationCard
                      key={project.id}
                      project={project}
                      onVerify={() => handleVerifyImpact(project.id)}
                      onSendBack={(note) => handleSendBack(project.id, note)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Project Approval Card
const ProjectApprovalCard = ({ project, onApprove, onReject }) => {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4">
        <div className="flex items-center space-x-2 mb-2">
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-[#E0F0F1] text-[#166F7C]">
            {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
          </span>
          <span className="ml-auto text-xs text-[4B6166]">
            {new Date(project.eventDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </span>
        </div>
        <h3 className="font-semibold text-[10242A] mb-2">{project.title}</h3>
        <p className="text-[4B6166]">{project.place}, {project.district}</p>
        <p className="text-[4B6166] line-clamp-2 mb-4">{project.description}</p>

        <div className="mt-4">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-[4B6166]">Funding goal:</span>
            <span className="font-medium">Rs. {project.goalAmount.toLocaleString()}</span>
          </div>
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-[4B6166]">Volunteers needed:</span>
            <span className="font-medium">{project.volunteersNeeded}</span>
          </div>
        </div>

        <div className="flex justify-end space-x-3 mt-4">
          <button
            onClick={() => onReject('Not aligned with Terra goals')}
            className="px-3 py-1 text-xs font-medium border border-[#AC4320] text-[#AC4320] rounded hover:bg-[#FEF3F0]"
          >
            Reject
          </button>
          <button
            onClick={onApprove}
            className="px-3 py-1 text-xs font-medium bg-[#166F7C] text-white rounded hover:bg-[#0d5a63]"
          >
            Approve
          </button>
        </div>
      </div>
    </div>
  );
};

// Evidence Verification Card
const EvidenceVerificationCard = ({ project, onVerify, onSendBack }) => {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4">
        <div className="flex items-center space-x-2 mb-2">
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-[#E0F0F1] text-[#166F7C]">
            {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
          </span>
          <span className="ml-auto text-xs text-[4B6166]">
            {new Date(project.eventDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </span>
        </div>
        <h3 className="font-semibold text-[10242A] mb-2">{project.title}</h3>
        <p className="text-[4B6166]">{project.place}, {project.district}</p>

        <div className="mt-4">
          <h3 className="font-semibold text-[10242A] mb-2">Evidence details</h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="text-[4B6166]">Target result:</span>
              <span className="font-medium">{project.targetResult} kg</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-[4B6166]">Achieved result:</span>
              <span className="font-medium">450 kg</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-[4B6166]">Participants:</span>
              <span className="font-medium">25 volunteers</span>
            </div>
          </div>

          {/* In a real implementation, we would show before/after images here */}
          <div className="mt-4">
            <p className="text-[4B6166] text-center">
              Before/after images would be displayed here
            </p>
          </div>
        </div>

        <div className="flex justify-end space-x-3 mt-4">
          <button
            onClick={() => onSendBack('Need clearer after image')}
            className="px-3 py-1 text-xs font-medium border border-[#AC4320] text-[#AC4320] rounded hover:bg-[#FEF3F0]"
          >
            Send back
          </button>
          <button
            onClick={onVerify}
            className="px-3 py-1 text-xs font-medium bg-[#33754A] text-white rounded hover:bg-[#285E3E]"
          >
            Verify impact
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifierDashboard;