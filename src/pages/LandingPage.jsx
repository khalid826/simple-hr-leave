import { useNavigate } from 'react-router-dom'
import { FaWhatsapp } from 'react-icons/fa'

const LandingPage = () => {
  const navigate = useNavigate();

  const handleDemoClick = () => {
    navigate('/login');
  };

  const handleContactClick = () => {
    window.open('https://wa.me/1234567890', '_blank');
  };

  return (
    <div className="flex flex-col min-h-screen bg-center bg-cover bg-yellow-50 bg-[url(/src/assets/BG.jpg)]">
      {/* Background for content */}
      <div className="flex items-center justify-center flex-grow px-4">
        <div className="flex flex-col-reverse items-center justify-center w-full max-w-6xl px-6 py-20 mx-auto bg-white shadow-lg md:flex-row rounded-xl">
          
          {/* Content section */}
          <div className="w-full p-6 md:w-1/2 md:p-12">
            <h1 className="mb-6 text-4xl font-bold text-orange-700">
              Customizable Leave Approval Tool for Your Company
            </h1>
            <p className="mb-8 text-lg text-yellow-900">
              A powerful tool for companies to manage leave requests, streamline HR workflows,
              and keep employees engaged with an easy-to-use system.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 mb-8 sm:flex-row sm:gap-4">
              <button
                onClick={handleDemoClick}
                className="px-6 py-3 text-white transition duration-200 bg-orange-500 rounded-lg shadow-md w-52 hover:bg-orange-600"
              >
                Try a Demo
              </button>
              <button
                onClick={handleContactClick}
                className="flex items-center justify-center gap-2 px-6 py-4 text-white transition duration-200 bg-green-500 rounded-lg shadow-md w-52 hover:bg-green-600"
              >
                <FaWhatsapp className="text-l" />
                <span className="text-base leading-none">Learn More</span>
              </button>
            </div>
          </div>

          {/* Image section */}
          <div className="w-2/3 mb-6 aspect-square md:aspect-auto md:w-1/2 md:h-full md:mb-0">
            <img
              src="/src/assets/LandingPage.png"
              alt="Tool Preview"
              className="object-contain w-full h-full rounded-md md:object-cover md:rounded-none"
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full py-4 text-center text-white bg-yellow-500">
        <p>&copy; 2025 Leave Approval Tool. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage