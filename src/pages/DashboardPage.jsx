import { useNavigate } from 'react-router-dom'

const DashboardPage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="p-8">
      <h1 className="mb-6 text-3xl font-bold">Dashboard</h1>
      <button
        onClick={handleLogout}
        className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
};

export default DashboardPage
