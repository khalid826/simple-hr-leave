import { useEffect, useState } from 'react'
import axios from 'axios'

const useUsers = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        // Fetch page 1 to get total pages count
        const firstResponse = await axios.get('https://reqres.in/api/users?page=1', {
          headers: {
            'Accept': 'application/json',
            'x-api-key': 'reqres-free-v1',
          }
        })

        const totalPages = firstResponse.data.total_pages
        let allUsers = [...firstResponse.data.data]

        // Fetch remaining pages concurrently
        const requests = []
        for (let page = 2; page <= totalPages; page++) {
          requests.push(axios.get(`https://reqres.in/api/users?page=${page}`, {
            headers: {
              'Accept': 'application/json',
              'x-api-key': 'reqres-free-v1',
            }
          }))
        }

        const responses = await Promise.all(requests)
        responses.forEach(response => {
          allUsers.push(...response.data.data)
        })

        setUsers(allUsers)
      } catch (error) {
        console.error('Failed to fetch users:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchAllUsers()
  }, [])

  return { users, loading }
}

export default useUsers
