// pages/UserDetailPage.jsx
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../services/api'
import Navbar from '../components/Navbar'

const UserDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Hardcoded leave data
  const currentLeave = {
    type: 'Annual Leave',
    status: 'Pending',
    days: 5,
    reason: 'Family vacation',
    startDate: '2023-11-15',
    endDate: '2023-11-20'
  }

  // Hardcoded leave history
  const leaveHistory = [
    {
      id: 1,
      date: '2023-08-10',
      type: 'Sick Leave',
      status: 'Approved',
      days: 2
    },
    {
      id: 2,
      date: '2023-06-05',
      type: 'Personal Leave',
      status: 'Approved',
      days: 1
    },
    {
      id: 3,
      date: '2023-04-22',
      type: 'Annual Leave',
      status: 'Approved',
      days: 3
    },
    {
      id: 4,
      date: '2023-02-14',
      type: 'Emergency Leave',
      status: 'Approved',
      days: 1
    },
    {
      id: 5,
      date: '2022-12-20',
      type: 'Annual Leave',
      status: 'Rejected',
      days: 5,
      note: 'Conflict with year-end closing'
    }
  ]

  // Hardcoded additional info
  const additionalInfo = {
    department: 'Engineering',
    position: 'Senior Developer',
    hireDate: '2020-05-15',
    manager: 'Sarah Johnson',
    remainingLeave: 12
  }

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get(`/users/${id}`)
        setUser(response.data.data)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [id])

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
                      <p>{additionalInfo.department}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-700">Position</h3>
                      <p>{additionalInfo.position}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-700">Hire Date</h3>
                      <p>{additionalInfo.hireDate}</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Current Leave Status */}
            <section className="p-4 mb-8 rounded-lg bg-orange-50">
              <h2 className="mb-4 text-xl font-semibold text-gray-700">Current Leave Request</h2>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                <div className="p-4 bg-white rounded-lg shadow">
                  <h3 className="font-medium text-gray-700">Type</h3>
                  <p className="text-lg">{currentLeave.type}</p>
                </div>
                <div className="p-4 bg-white rounded-lg shadow">
                  <h3 className="font-medium text-gray-700">Status</h3>
                  <p className={`text-lg ${
                    currentLeave.status === 'Approved' ? 'text-green-600' : 
                    currentLeave.status === 'Pending' ? 'text-amber-600' : 'text-red-600'
                  }`}>
                    {currentLeave.status}
                  </p>
                </div>
                <div className="p-4 bg-white rounded-lg shadow">
                  <h3 className="font-medium text-gray-700">Days</h3>
                  <p className="text-lg">{currentLeave.days}</p>
                </div>
                <div className="p-4 bg-white rounded-lg shadow md:col-span-2">
                  <h3 className="font-medium text-gray-700">Reason</h3>
                  <p className="text-lg">{currentLeave.reason}</p>
                </div>
                <div className="p-4 bg-white rounded-lg shadow">
                  <h3 className="font-medium text-gray-700">Dates</h3>
                  <p className="text-lg">{currentLeave.startDate} to {currentLeave.endDate}</p>
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
                  Request More Info
                </button>
              </div>
            </section>

            {/* Leave History */}
            <section className="mb-8">
              <h2 className="mb-4 text-xl font-semibold text-gray-700">Leave History</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full overflow-hidden bg-white rounded-lg">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-3 text-left">Date</th>
                      <th className="px-4 py-3 text-left">Type</th>
                      <th className="px-4 py-3 text-left">Status</th>
                      <th className="px-4 py-3 text-left">Days</th>
                      <th className="px-4 py-3 text-left">Notes</th>
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
                        <td className="px-4 py-3">{leave.note || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Additional Information */}
            <section>
              <h2 className="mb-4 text-xl font-semibold text-gray-700">Additional Information</h2>
              <div className="p-4 bg-white rounded-lg shadow">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium text-gray-700">Remaining Leave Days</h3>
                    <p className="text-lg">{additionalInfo.remainingLeave} days</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-700">Reporting Manager</h3>
                    <p className="text-lg">{additionalInfo.manager}</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserDetailPage