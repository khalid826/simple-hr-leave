const AuthForm = ({
  title,
  email,
  setEmail,
  password,
  setPassword,
  isFormValid,
  // message,
  onSubmit,
  submitLabel,
  bottomText,
  bottomActionText,
  onBottomActionClick,
  containerClassName = '',
}) => (
  <div className={containerClassName}>
    <div className="w-full max-w-md p-6 rounded-lg shadow-lg bg-yellow-50 md:bg-transparent md:shadow-none md:p-0">
      <h1 className="mb-8 text-4xl font-bold text-center text-orange-700">{title}</h1>
      <form onSubmit={onSubmit} className="w-full">
        <input
          type="email"
          placeholder="company@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 mb-4 border border-yellow-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 mb-6 border border-yellow-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
        <button
          type="submit"
          disabled={!isFormValid}
          className="w-full py-3 font-semibold text-white transition bg-orange-500 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-orange-600"
        >
          {submitLabel}
        </button>
      </form>
      {/* {message && (
        <div
          className={`mt-2 p-3 rounded shadow-md text-sm ${
            message.includes('success') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}
        >
          {message}
        </div>
      )} */}
      {bottomText && (
        <p className="mt-4 text-center text-yellow-900">
          {bottomText}{' '}
          <button
            onClick={onBottomActionClick}
            className="text-orange-600 underline hover:text-orange-800"
            type="button"
          >
            {bottomActionText}
          </button>
        </p>
      )}
    </div>
  </div>
)

export default AuthForm