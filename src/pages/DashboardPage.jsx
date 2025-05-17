import { useEffect, useState } from 'react'
import useUsers from '../hooks/useUsers'
import UserCard from '../components/UserCard'
import Navbar from '../components/Navbar'

const DashboardPage = () => {
  const { users, loading } = useUsers()
  const [ recentUsers, setRecentUsers ] = useState([])

  useEffect(() => {
    if (users.length) {
      setRecentUsers(users.slice(0, 3))
    }
  }, [users])

  const stats = [
    { label: 'Total Requests', value: 20, color: 'bg-blue-100 text-blue-800 border-blue-300' },
    { label: 'Approved', value: 5, color: 'bg-green-100 text-green-800 border-green-300' },
    { label: 'Disapproved', value: 2, color: 'bg-red-100 text-red-800 border-red-300' },
    { label: 'Pending', value: 4, color: 'bg-amber-100 text-amber-800 border-amber-300' },
  ]

  return (
    <div className="min-h-screen bg-orange-50">
      <Navbar />
      <div className="max-w-6xl p-6 mx-auto">

        {/* Stats Cards - Now 2x2 on mobile */}
        <section className="mb-10">
          <h2 className="mb-5 text-xl font-semibold text-gray-700">Performance Overview</h2>
          <div className="grid grid-cols-2 gap-4 sm:px-40 sm:grid-cols-4 sm:gap-5">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className={`rounded-lg p-4 border ${stat.color} text-center w-full mx-auto max-w-[180px]`}
              >
                <div className="text-sm font-medium">{stat.label}</div>
                <div className="mt-1 text-2xl font-bold">{stat.value}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Recent Requests with increased gap */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-semibold text-gray-700">Recent Leave Requests</h2>
            {/* <button className="text-sm font-medium text-orange-600 hover:text-orange-700">
              View All →
            </button> */}
          </div>
          
          <div className="grid items-stretch gap-6 md:grid-cols-3"> {/* Increased gap between cards */}
            {recentUsers.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        </section>

        {/* CTA Button */}
        <div className="text-center">
          <button className="px-6 py-2.5 bg-orange-500 text-white font-medium rounded-md hover:bg-orange-600 transition-colors">
            Add Manual Request
          </button>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage