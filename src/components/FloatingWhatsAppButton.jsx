import { FaWhatsapp } from 'react-icons/fa'
import { useState } from 'react'

const FloatingWhatsAppButton = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleClick = () => {
    window.open('https://wa.me/6281234567890', '_blank');
  };

  return (
    <div
      className="fixed z-50 flex flex-col items-end bottom-4 right-4 group"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {/* Tooltip */}
      {showTooltip && (
        <div className="px-3 py-1 mb-2 text-sm text-white bg-gray-800 rounded shadow">
          Contact Support
        </div>
      )}

      {/* Button */}
      <button
        onClick={handleClick}
        className="flex items-center justify-center text-white transition bg-green-500 rounded-full shadow-lg w-14 h-14 hover:bg-green-600"
        aria-label="Contact us on WhatsApp"
      >
        <FaWhatsapp className="text-2xl" />
      </button>
    </div>
  );
};

export default FloatingWhatsAppButton