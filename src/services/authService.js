import api from './api'

export const registerUser = async (email, password) => {
  const response = await api.post('/register', { email, password })
  return response.data
}

export const loginUser = async (email, password) => {
  const response = await api.post('/login', { email, password })
  return response.data
}
