const Loader = () => (
  <div className="inline-flex items-center p-3 mt-2 bg-white rounded shadow-md">
    <div className="relative w-5 h-5 mr-2">
      <div className="absolute w-full h-full border-2 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
    </div>
    <span className="text-sm text-blue-500"> Loading...</span>
  </div>
)

export default Loader