import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleDemoClick = () => {
    navigate('/login');
  };

  const handleContactClick = () => {
    window.open('https://wa.me/1234567890', '_blank');
  };

  return (
    <div className="min-h-screen bg-yellow-50 flex flex-col">
      {/* Background for content */}
      <div className="flex-grow flex items-center justify-center px-4">
        <div className="flex flex-col-reverse md:flex-row items-center justify-center bg-white w-full px-6 py-20 max-w-6xl mx-auto rounded-xl shadow-lg">
          
          {/* Content section */}
          <div className="w-full md:w-1/2 p-6 md:p-12">
            <h1 className="text-4xl font-bold text-orange-700 mb-6">
              Customizable Leave Approval Tool for Your Company
            </h1>
            <p className="text-lg text-yellow-900 mb-8">
              A powerful tool for companies to manage leave requests, streamline HR workflows,
              and keep employees engaged with an easy-to-use system.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-8">
              <button
                onClick={handleDemoClick}
                className="bg-orange-500 text-white px-6 py-3 w-52 rounded-lg shadow-md hover:bg-orange-600 transition duration-200"
              >
                Try a Demo
              </button>
              <button
                onClick={handleContactClick}
                className="bg-yellow-500 text-white px-6 py-3 w-52 rounded-lg shadow-md hover:bg-yellow-600 transition duration-200"
              >
                Contact Us
              </button>
            </div>
          </div>

          {/* Image section */}
          <div className="w-full md:w-1/2 h-64 md:h-full mb-6 md:mb-0">
            <img
              src="/src/assets/LandingPageBG.jpg"
              alt="Tool Preview"
              className="object-cover w-full h-full rounded-md md:rounded-none"
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-4 w-full">
        <p>&copy; 2025 Leave Approval Tool. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
