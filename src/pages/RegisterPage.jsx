// src/pages/RegisterPage.jsx
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthForm from '../components/AuthForm'

const RegisterPage = () => {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const isFormValid = email.trim() !== '' && password.trim() !== ''

  const handleRegister = async (e) => {
    e.preventDefault()
    setMessage('')

    try {
      const res = await fetch('https://reqres.in/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': 'reqres-free-v1',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (res.ok) {
        setMessage('Registration successful! Redirecting to login...')
        setTimeout(() => navigate('/login'), 1500)
      } else {
        setMessage(data.error || 'Registration failed. Check inputs.')
      }
    } catch {
      setMessage('Network error, please try again later.')
    }
  }

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(''), 5000)
      return () => clearTimeout(timer)
    }
  }, [message])

  return (
    <div className="relative flex min-h-screen md:flex-row">
      {/* Mobile form with BG image */}
      <div className="md:hidden relative flex flex-col items-center justify-center w-full p-6 bg-[url('/src/assets/BG.jpg')] bg-cover bg-center bg-yellow-50">
        <AuthForm
          title="Register"
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          isFormValid={isFormValid}
          message={message}
          onSubmit={handleRegister}
          submitLabel="Register"
          navigate={navigate}
          bottomText="Already have an account?"
          bottomActionText="Login"
          onBottomActionClick={() => navigate('/login')}
        />
      </div>

      {/* Desktop BG image side */}
      <div className="hidden md:block md:w-1/2">
        <img
          src="/src/assets/BG.jpg"
          alt="Register Preview"
          className="object-cover w-full h-full"
        />
      </div>
      
      {/* Desktop form with yellow bg */}
      <div className="flex-col items-center justify-center hidden w-full p-12 md:flex md:w-1/2 bg-yellow-50">
        <AuthForm
          title="Register"
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          isFormValid={isFormValid}
          message={message}
          onSubmit={handleRegister}
          submitLabel="Register"
          navigate={navigate}
          bottomText="Already have an account?"
          bottomActionText="Login"
          onBottomActionClick={() => navigate('/login')}
        />
      </div>

    </div>
  )
}

export default RegisterPage