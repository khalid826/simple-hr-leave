import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../services/api'
import useLeaveStatus from '../hooks/useLeaveStatus'
import Navbar from '../components/Navbar'

const UserDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [leaveHistory, setLeaveHistory] = useState([])
  
  // Destructure generateRandomLeave from the hook
  const { generateRandomLeave } = useLeaveStatus()
  
  // Generate current leave using the function from the hook
  const currentLeave = generateRandomLeave()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get(`/users/${id}`)
        setUser(response.data.data)
        
        // Generate random leave history (5 items)
        const history = Array.from({ length: 5 }, (_, i) => ({
          id: i + 1,
          date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
          ...generateRandomLeave() // Use the function from the hook
        }))
        setLeaveHistory(history)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [id, generateRandomLeave]) // Add generateRandomLeave to dependencies

  if (loading) return <div className="min-h-screen bg-orange-50"><Navbar />Loading...</div>
  if (!user) return <div className="min-h-screen bg-orange-50"><Navbar />User not found</div>

  return (
    <div className="min-h-screen bg-orange-50">
      <Navbar />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
        <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header with close button */}
          <div className="sticky top-0 flex items-center justify-between p-4 bg-white border-b">
            <h2 className="text-2xl font-bold text-gray-800">Employee Details</h2>
            <button 
              onClick={() => navigate(-1)}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="p-6">
            {/* Basic Info Section */}
            <section className="mb-8">
              <div className="flex flex-col gap-6 md:flex-row">
                <div className="w-32 h-32 overflow-hidden border-4 border-orange-200 rounded-full">
                  <img src={user.avatar} alt={`${user.first_name} ${user.last_name}`} className="object-cover w-full h-full" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-800">
                    {user.first_name} {user.last_name}
                  </h1>
                  <p className="mb-4 text-gray-600">{user.email}</p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-semibold text-gray-700">Employee ID</h3>
                      <p>EMP-{id.padStart(4, '0')}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-700">Department</h3>
                      <p>{['Engineering', 'Marketing', 'HR', 'Finance'][id % 4]}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-700">Join Date</h3>
                      <p>{new Date(2020 + (id % 3), id % 12, (id % 28) + 1).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-700">Position</h3>
                      <p>{['Junior', 'Mid', 'Senior'][id % 3]} {['Developer', 'Designer', 'Manager', 'Analyst'][id % 4]}</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Current Leave Status */}
            <section className="p-4 mb-8 rounded-lg bg-orange-50">
              <h2 className="mb-4 text-xl font-semibold text-gray-700">Current Leave Status</h2>
              <div className="flex flex-wrap gap-4">
                <div className="flex-1 min-w-[200px] bg-white p-4 rounded-lg shadow">
                  <h3 className="font-medium text-gray-700">Type</h3>
                  <p className="text-lg">{currentLeave.type}</p>
                </div>
                <div className="flex-1 min-w-[200px] bg-white p-4 rounded-lg shadow">
                  <h3 className="font-medium text-gray-700">Status</h3>
                  <p className={`text-lg ${
                    currentLeave.status === 'Approved' ? 'text-green-600' : 
                    currentLeave.status === 'Pending' ? 'text-amber-600' : 'text-red-600'
                  }`}>
                    {currentLeave.status}
                  </p>
                </div>
                <div className="flex-1 min-w-[200px] bg-white p-4 rounded-lg shadow">
                  <h3 className="font-medium text-gray-700">Days</h3>
                  <p className="text-lg">{currentLeave.days}</p>
                </div>
              </div>
              <div className="flex gap-3 mt-4">
                <button className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600">
                  Approve
                </button>
                <button className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600">
                  Reject
                </button>
                <button className="px-4 py-2 text-white bg-gray-500 rounded hover:bg-gray-600">
                  Pending
                </button>
              </div>
            </section>

            {/* Leave History */}
            <section>
              <h2 className="mb-4 text-xl font-semibold text-gray-700">Leave History</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full overflow-hidden bg-white rounded-lg">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-3 text-left">Date</th>
                      <th className="px-4 py-3 text-left">Type</th>
                      <th className="px-4 py-3 text-left">Status</th>
                      <th className="px-4 py-3 text-left">Days</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {leaveHistory.map((leave) => (
                      <tr key={leave.id}>
                        <td className="px-4 py-3">{leave.date}</td>
                        <td className="px-4 py-3">{leave.type}</td>
                        <td className={`py-3 px-4 ${
                          leave.status === 'Approved' ? 'text-green-600' : 
                          leave.status === 'Pending' ? 'text-amber-600' : 'text-red-600'
                        }`}>
                          {leave.status}
                        </td>
                        <td className="px-4 py-3">{leave.days}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Additional Lorem Info */}
            <section className="mt-8">
              <h2 className="mb-4 text-xl font-semibold text-gray-700">Additional Information</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula.
                </p>
                <p>
                  Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor.
                </p>
                <p>
                  Suspendisse potenti. Sed egestas, ante et vulputate volutpat, eros pede semper est, vitae luctus metus libero eu augue.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserDetailPage