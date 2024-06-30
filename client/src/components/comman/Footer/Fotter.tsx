
const Footer = () => {
    return (
      <div className="text-zinc-500 flex p-4 pb-1 fixed bottom-0 w-[85%] overflow-x-auto z-10 justify-between ">
        
          <p className="text-xs hover:text-black dark:hover:text-white cursor-pointer">Copyright &copy; 2024. All rights reserved.</p>
          <p className="text-xs hover:text-black dark:hover:text-white cursor-pointer">&reg; HarishKumar & Co.</p>

          <div className="flex text-xs gap-3">
            <p className="cursor-pointer hover:text-black dark:hover:text-white">Terms & Conditions*</p>
            <p className="cursor-default">|</p>
            <p className="cursor-pointer hover:text-black dark:hover:text-white">  Privacy Policy** </p>
          </div>
      </div>
    
  
    )
  }
  
  export default Footer