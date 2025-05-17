import { useEffect, useState } from 'react'
import { FiSun, FiMoon } from 'react-icons/fi'

const DarkModeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('dark-mode');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDark(saved ? saved === 'true' : systemDark);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('dark-mode', isDark.toString());
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="px-1 py-1 transition-all duration-300 hover:scale-120"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <div className="relative w-5 h-5">
        <FiSun
          className={`absolute transition-all duration-300 text-yellow-500 ${
            isDark ? 'opacity-0 rotate-45 scale-50' : 'opacity-100 rotate-0 scale-130'
          }`}
        />
        <FiMoon
          className={`absolute transition-all duration-300 text-blue-400 ${
            isDark ? 'opacity-100 rotate-0 scale-130' : 'opacity-0 -rotate-45 scale-50'
          }`}
        />
      </div>
    </button>
  );
};

export default DarkModeToggle