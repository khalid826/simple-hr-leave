import { useNavigate } from 'react-router-dom'
import DarkModeToggle from './DarkModeToggle'

const Navbar = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
      <div className="text-xl font-bold text-orange-700 cursor-pointer" onClick={() => navigate('/dashboard')}>
        SimpleHR
      </div>

      <div className="flex space-x-6 font-semibold text-yellow-900">
        <button onClick={() => navigate('/dashboard')} className="hover:text-orange-600">Home</button>
        <button onClick={() => navigate('/users')} className="hover:text-orange-600">User List</button>
      </div>

      <div className="flex items-center space-x-4">
        <DarkModeToggle />
        <button
          onClick={handleLogout}
          className="px-3 py-1 font-semibold text-white bg-red-500 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </nav>
  )
}

export default Navbar
