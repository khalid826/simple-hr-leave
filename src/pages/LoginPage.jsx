import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import AuthForm from '../components/AuthForm'
import Loader from '../components/Loader'
import FloatingWhatsAppButton from '../components/FloatingWhatsAppButton'

const LoginPage = () => {
  const navigate = useNavigate()
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, loading, message, setMessage } = useAuth()

  const isFormValid = email.trim() !== '' && password.trim() !== ''

  const handleLogin = (e) => {
    e.preventDefault()
    if (!isFormValid) return
    login(email, password)
  }

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(''), 5000)
      return () => clearTimeout(timer)
    }
  }, [message, setMessage])

  return (
    <div className="relative flex min-h-screen md:flex-row">
      {/* Mobile form with BG image */}
      <div className="md:hidden relative flex flex-col items-center justify-center w-full p-6 bg-[url('/src/assets/BG.jpg')] bg-cover bg-center bg-yellow-50">
        <AuthForm
          title="Login"
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          isFormValid={isFormValid}
          // message={message}
          onSubmit={handleLogin}
          submitLabel="Login"
          navigate={navigate}
          bottomText="Not yet registered?"
          bottomActionText="Get username"
          onBottomActionClick={() => navigate('/register')}
        />
        {loading ? (
          <Loader />
        ) : (
          message && (
            <div
              className={`mt-2 p-3 rounded shadow-md text-sm ${
                message.includes('success') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}
            >
              {message}
            </div>
          )
        )}
      </div>

      {/* Desktop form with yellow bg */}
      <div className="flex-col items-center justify-center hidden w-full p-12 md:flex md:w-1/2 bg-yellow-50">
        <AuthForm
          title="Login"
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          isFormValid={isFormValid}
          // message={message}
          onSubmit={handleLogin}
          submitLabel="Login"
          navigate={navigate}
          bottomText="Not yet registered?"
          bottomActionText="Get username"
          onBottomActionClick={() => navigate('/register')}
        />
        {loading ? (
          <Loader />
        ) : (
          message && (
            <div
              className={`mt-2 p-3 rounded shadow-md text-sm ${
                message.includes('success') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}
            >
              {message}
            </div>
          )
        )}
      </div>

      {/* Desktop BG image side */}
      <div className="hidden md:block md:w-1/2">
        <img
          src="/src/assets/BG.jpg"
          alt="Login Preview"
          className="object-cover w-full h-full"
        />
      </div>
      <FloatingWhatsAppButton />
    </div>
  )
}

export default LoginPage
