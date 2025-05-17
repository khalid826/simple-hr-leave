import { useNavigate } from 'react-router-dom'
import useLeaveStatus from '../hooks/useLeaveStatus'

const UserCard = ({ user }) => {
  const navigate = useNavigate()
  const { 
    currentStatus, 
    currentType, 
    statusOptions, 
    setCurrentStatus 
  } = useLeaveStatus()

  // Handle card click (excluding interactions with form elements)
  const handleCardClick = (e) => {
    // Only navigate if the click wasn't on the select or button
    if (!e.target.closest('select, button')) {
      navigate(`/users/${user.id}`)
    }
  }

  return (
    <div 
      className="h-full p-5 mb-6 transition-shadow bg-white border border-gray-100 rounded-lg shadow-sm cursor-pointer last:mb-0 hover:shadow-md"
      onClick={handleCardClick}
    >
      <div className="flex items-center gap-4 mb-4">
        <img
          src={user.avatar}
          alt={user.first_name}
          className="object-cover border-2 border-orange-200 rounded-full w-14 h-14"
        />
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800">
            {user.first_name} {user.last_name}
          </h3>
          <div className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 text-sm font-medium mt-1">
            {currentType}
          </div>
        </div>
      </div>

      <div className="flex flex-row items-center gap-3">
        <select
          value={currentStatus}
          onChange={(e) => {
            e.stopPropagation()
            setCurrentStatus(e.target.value)
          }}
          className="flex-1 p-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-300 focus:border-orange-400"
          onClick={(e) => e.stopPropagation()}
        >
          {statusOptions.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        <button 
          className="px-4 py-2 font-medium text-white transition-colors bg-orange-500 rounded-md hover:bg-orange-600"
          onClick={(e) => {
            e.stopPropagation()
            // Handle submit action here
          }}
        >
          Submit
        </button>
      </div>
    </div>
  )
}

export default UserCard