import { useState } from 'react'
import useUsers from '../hooks/useUsers'
import UserCard from '../components/UserCard'
import Navbar from '../components/Navbar'

const UsersPage = () => {
  const { users, loading } = useUsers()
  const [currentPage, setCurrentPage] = useState(1)
  const usersPerPage = 6 // 3 columns × 2 rows

  // Calculate total pages
  const totalPages = Math.ceil(users.length / usersPerPage)

  // Get current users for the page
  const indexOfLastUser = currentPage * usersPerPage
  const indexOfFirstUser = indexOfLastUser - usersPerPage
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser)

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  return (
    <div className="min-h-screen bg-orange-50">
      <Navbar />
      <div className="max-w-6xl p-6 mx-auto">
        <section className="mb-10">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-semibold text-gray-700">All Users</h2>
            {/* <div className="text-sm font-medium text-gray-500">
              Page {currentPage} of {totalPages}
            </div> */}
          </div>
          
          {/* Users Grid - 3 columns, 2 rows (6 cards per page) */}
          <div className="grid items-stretch gap-6 md:grid-cols-3">
            {currentUsers.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-8 space-x-2">
            <button
              onClick={() => paginate(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 border rounded-md disabled:opacity-50"
            >
              Previous
            </button>
            
            {[...Array(totalPages).keys()].map((number) => (
              <button
                key={number + 1}
                onClick={() => paginate(number + 1)}
                className={`px-4 py-2 border rounded-md ${
                  currentPage === number + 1 ? 'bg-orange-500 text-white' : 'bg-orange-50'
                }`}
              >
                {number + 1}
              </button>
            ))}
            
            <button
              onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border rounded-md disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </section>
      </div>
    </div>
  )
}

export default UsersPage