import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginUser, registerUser } from '../services/authService'

const useAuth = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const login = async (email, password) => {
    setLoading(true)
    try {
      const data = await loginUser(email, password)
      localStorage.setItem('token', data.token)
      setMessage('Login successful! Redirecting...')
      setTimeout(() => navigate('/dashboard'), 1000)
    } catch (error) {
      setMessage(error.response?.data?.error || 'Login failed. Check credentials.')
    } finally {
      setLoading(false)
    }
  }

  const register = async (email, password) => {
    setLoading(true)
    try {
      await registerUser(email, password)
      setMessage('Registration successful! Redirecting to login...')
      setTimeout(() => navigate('/login'), 1500)
    } catch (error) {
      setMessage(error.response?.data?.error || 'Registration failed. Check inputs.')
    } finally {
      setLoading(false)
    }
  }

  return { login, register, loading, message, setMessage }
}

export default useAuth