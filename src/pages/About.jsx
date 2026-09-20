import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-[#10242A] mb-6">
          About Terra
        </h1>
        <p className="text-[#4B6166] mb-6">
          Terra is a platform that connects sponsors, volunteers, organizers, and verifiers to support local environmental projects in the Kathmandu Valley. Our mission is to make environmental action accessible, transparent, and impactful.
        </p>

        <div className="grid gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-[#10242A] mb-4">
              Our vision
            </h2>
            <p className="text-[#4B6166]">
              A Kathmandu Valley where every citizen can easily participate in and see the results of local environmental conservation efforts.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-[#10242A] mb-4">
              How we work
            </h2>
            <p className="text-[#4B6166]">
              Terra facilitates the complete cycle of environmental projects: from project creation and funding, to volunteer mobilization, execution, and verified impact reporting.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-[#10242A] mb-4">
            Get in touch
          </h2>
          <p className="text-[#4B6166]">
            Have questions or want to learn more? Reach out to our team.
          </p>
          <div className="mt-4 space-y-2">
            <p className="text-[4B6166]">
              <span className="font-medium">Email:</span> hello@terra.demo
            </p>
            <p className="text-[4B6166]">
              <span className="font-medium">Location:</span> Kathmandu Valley, Nepal
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;