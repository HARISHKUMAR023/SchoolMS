import { FaInstagram, FaGithub, FaLinkedin } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io";


const Footer = () => {
    return (
      <div className="dark:text-zinc-400 text-gray-600 flex p-[2px]  w-full px-2 overflow-x-auto z-10 justify-between 
                        dark:bg-darkbg1 ">
        
          <p className="text-xs hover:text-black dark:hover:text-white cursor-pointer">Copyright &copy; 2024. All rights reserved.</p>
          
          <div className="flex items-center text-xs gap-3">
            <p className="text-xs hover:text-black dark:hover:text-white cursor-pointer">&reg; HarishKumar & Co.</p>
            <p className="cursor-default">|</p>
            <p className="text-xs hover:text-black dark:hover:text-white cursor-pointer">Contact Us:</p>
            
            <div className="flex items-center text-xs gap-3 mt-[3px]">
              <FaInstagram className="rounded cursor-pointer hover:text-white hover:bg-gradient-to-r from-[#f58529] via-[#dd2a7b] to-[#8134af]" />
              <IoLogoYoutube className="hover:text-red-600 cursor-pointer "/>
              <FaGithub className="dark:hover:text-white hover:text-black cursor-pointer"/>
              <FaLinkedin className="hover:text-[#0077B5] cursor-pointer"/>
            </div>
          
          </div>

          <div className="flex text-xs gap-3">
            <p className="cursor-pointer hover:text-black dark:hover:text-white">Terms & Conditions*</p>
            
            <p className="cursor-default">|</p>
            <p className="cursor-pointer hover:text-black dark:hover:text-white">  Privacy Policy** </p>
          </div>
      </div>
    
  
    )
  }
  
  export default Footer