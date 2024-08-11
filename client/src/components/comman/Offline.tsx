import offline from '../../../public/offline.svg';

const Offline = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
    <div className="text-center">
    <img src={offline} alt="offile illustion" className='w-64 h-64' width={300} height={400} />
      <h1 className="text-2xl font-bold text-red-600">You are offline</h1>
      <p className="mt-4 text-lg">Please check your internet connection.</p>
    </div>
  </div>
   
  )
}

export default Offline