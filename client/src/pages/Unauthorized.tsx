import lock from '../assets/illuctration/lock.gif'

const Unauthorized = () => {
  return (
  <>
  <div className='flex flex-col items-center justify-center'>
    <h1 className='mt-10 text-2xl font-bold'>Unauthorized - You do not have access to this page!</h1>
    <img src={lock}/>
  </div>
  </>
  );  
};

export default Unauthorized;
