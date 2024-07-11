import { useState } from 'react';
import { Squeeze as Hamburger } from 'hamburger-react';
import { AiFillHome, AiFillSetting } from "react-icons/ai";
import { PiStudentFill } from "react-icons/pi";
import { FaChalkboardTeacher } from "react-icons/fa";
import { MdOutlineMiscellaneousServices } from "react-icons/md";
import { SiGoogleclassroom } from "react-icons/si";
import { BiSolidReport } from "react-icons/bi";
import { TbHexagonLetterSFilled } from "react-icons/tb";

const Side = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [activeSection, setActiveSection] = useState(null); // Track active section

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleSection = (sectionId) => {
    setActiveSection(activeSection === sectionId ? null : sectionId);
    setIsExpanded(true);
  };

  return (
    <div className="overflow-y-auto">
      <div className={`h-full ${isExpanded ? 'w-72' : 'w-28'} bg-green-500 p-2 rounded-md transition-all duration-300 overflow-y-auto`}>
        <div className="h-full bg-white rounded-md">
          
          <div id='top' className='flex items-center pt-2'>
            <div className={`w-full  flex items-center justify-center`}>
              <TbHexagonLetterSFilled className='size-8 text-gray-600' />
              <p className={`ml-3 text-2xl font-bold text-gray-600 ${isExpanded ? null : 'hidden'} `}>School Sync</p>
            </div>
            <div className='-mr-[11px] ml-auto'>
              <Hamburger 
                  toggled={isExpanded} 
                  toggle={toggleSidebar} 
                  size={14}/>
            </div>
          </div>
          
          <div id='content' className='flex flex-col justify-center '>
            
            <div id='home-parent' className={`m-2 p-2 ${activeSection === 'home' ? 'bg-blue-100' : ''} active:bg-blue-100 rounded-md `}>
              <div id='home' className={`${isExpanded ? 'flex-row' : 'flex-col'} flex items-center`} 
              onClick={() => toggleSection('home')}>
                <AiFillHome className='size-8 text-gray-600' />
                <p className={`${isExpanded ? 'ml-2 text-lg font-semibold' : 'mt-2 text-lg font-semibold'} ${activeSection === 'home' ? 'text-blue-500' : ''}`}>Home</p>
              </div>

              <div id='slide-down-home' className={`overflow-hidden transition-all duration-300 ${activeSection === 'home' ? 'max-h-40' : 'max-h-0'}`}>
                <div className="items-center mt-1 ml-8">
                  <p className={`${isExpanded ? 'ml-2' : 'hidden'} font-semibold text-lg`}>Dashboard</p>
                  <p className={`${isExpanded ? 'ml-2' : 'hidden'} font-semibold text-lg`}>Employees</p>
                  <p className={`${isExpanded ? 'ml-2' : 'hidden'} font-semibold text-lg`}>Students</p>
                </div>
              </div>
            </div>
            
            <div id='students-parent' className={`m-2 p-2 ${activeSection === 'students' ? 'bg-blue-100' : ''} active:bg-blue-100 rounded-md `}>
              <div id='students' className={`${isExpanded ? 'flex-row' : 'flex-col'} flex items-center mt-4`} 
                onClick={() => toggleSection('students')}>
                  <PiStudentFill className='size-8 text-gray-600' />
                  <p className={`${isExpanded ? 'ml-2 text-lg font-semibold' : 'mt-2 text-lg font-semibold'} ${activeSection === 'students' ? 'text-blue-500' : ''}`}>Students</p>
              </div>

              <div id='slide-down-students' className={`overflow-hidden transition-all duration-300 ${activeSection === 'students' ? 'max-h-40' : 'max-h-0'}`}>
                <div className="items-center mt-2 gap-2 ml-8">
                  <p className={`${isExpanded ? 'ml-2' : 'hidden'} font-semibold text-lg`}>Attendance</p>
                  <p className={`${isExpanded ? 'ml-2' : 'hidden'} font-semibold text-lg`}>Message</p>
                </div>
              </div>
            </div>

            <div id='teachers-parent' className={`m-2 p-2 ${activeSection === 'teachers' ? 'bg-blue-100' : ''} active:bg-blue-100 rounded-md `}>
              <div id='teachers' className={`${isExpanded ? 'flex-row' : 'flex-col'} flex items-center mt-4`} 
                onClick={() => toggleSection('teachers')}>
                  <FaChalkboardTeacher className='size-8 text-gray-600' />
                  <p className={`${isExpanded ? 'ml-2 text-lg font-semibold' : 'mt-2 text-lg font-semibold'} ${activeSection === 'teachers' ? 'text-blue-500' : ''}`}>Teachers</p>
              </div>

              <div id='slide-down-teachers' className={`overflow-hidden transition-all duration-300 ${activeSection === 'teachers' ? 'max-h-40' : 'max-h-0'}`}>
                <div className="items-center mt-2 gap-2 ml-8">
                  <p className={`${isExpanded ? 'ml-2' : 'hidden'} font-semibold text-lg`}>Overview</p>
                </div>
              </div>
            </div>

            <div id='services-parent' className={`m-2 p-2 ${activeSection === 'services' ? 'bg-blue-100' : ''} active:bg-blue-100 rounded-md `}>
              <div id='services' className={`${isExpanded ? 'flex-row' : 'flex-col'} flex items-center mt-4`} 
                onClick={() => toggleSection('services')}>
                  <MdOutlineMiscellaneousServices className='size-8 text-gray-600' />
                  <p className={`${isExpanded ? 'ml-2 text-lg font-semibold' : 'mt-2 text-lg font-semibold'} ${activeSection === 'services' ? 'text-blue-500' : ''}`}>Services</p>
              </div>

              <div id='slide-down-services' className={`overflow-hidden transition-all duration-300 ${activeSection === 'services' ? 'max-h-40' : 'max-h-0'}`}>
                <div className="items-center mt-2 gap-2 ml-8">
                  <p className={`${isExpanded ? 'ml-2' : 'hidden'} font-semibold text-lg`}>Message</p>
                </div>
              </div>
            </div>

            <div id='classes-parent' className={`m-2 p-2 ${activeSection === 'classes' ? 'bg-blue-100' : ''} active:bg-blue-100 rounded-md `}>
              <div id='classes' className={`${isExpanded ? 'flex-row' : 'flex-col'} flex items-center mt-4`} 
                onClick={() => toggleSection('classes')}>
                  <SiGoogleclassroom className='size-8 text-gray-600' />
                  <p className={`${isExpanded ? 'ml-2 text-lg font-semibold' : 'mt-2 text-lg font-semibold'} ${activeSection === 'classes' ? 'text-blue-500' : ''}`}>Classes</p>
              </div>

              <div id='slide-down-classes' className={`overflow-hidden transition-all duration-300 ${activeSection === 'classes' ? 'max-h-40' : 'max-h-0'}`}>
                <div className="items-center mt-2 gap-2 ml-8">
                  <p className={`${isExpanded ? 'ml-2' : 'hidden'} font-semibold text-lg`}>My Students</p>
                </div>
              </div>
            </div>

            <div id='reports-parent' className={`m-2 p-2 ${activeSection === 'reports' ? 'bg-blue-100' : ''} active:bg-blue-100 rounded-md `}>
              <div id='reports' className={`${isExpanded ? 'flex-row' : 'flex-col'} flex items-center mt-4`} 
                onClick={() => toggleSection('reports')}>
                  <BiSolidReport className='size-8 text-gray-600' />
                  <p className={`${isExpanded ? 'ml-2 text-lg font-semibold' : 'mt-2 text-lg font-semibold'} ${activeSection === 'reports' ? 'text-blue-500' : ''}`}>Reports</p>
              </div>

              <div id='slide-down-reports' className={`overflow-hidden transition-all duration-300 ${activeSection === 'reports' ? 'max-h-40' : 'max-h-0'}`}>
                <div className="items-center mt-2 gap-2 ml-8">
                  <p className={`${isExpanded ? 'ml-2' : 'hidden'} font-semibold text-lg`}>Overview</p>
                </div>
              </div>
            </div>

            <div id='settings-parent' className={`m-2 p-2 ${activeSection === 'settings' ? 'bg-blue-100' : ''} active:bg-blue-100 rounded-md `}>
              <div id='settings' className={`${isExpanded ? 'flex-row' : 'flex-col'} flex items-center mt-4`} 
                onClick={() => toggleSection('settings')}>
                  <AiFillSetting className='size-8 text-gray-600' />
                  <p className={`${isExpanded ? 'ml-2 text-lg font-semibold' : 'mt-2 text-lg font-semibold'} ${activeSection === 'settings' ? 'text-blue-500' : ''}`}>Settings</p>
              </div>

              <div id='slide-down-settings' className={`overflow-hidden transition-all duration-300 ${activeSection === 'settings' ? 'max-h-60' : 'max-h-0'}`}>
                <div className="items-center mt-2 gap-2 ml-8">
                  <p className={`${isExpanded ? 'ml-2' : 'hidden'} font-semibold text-lg`}>Overview</p>
                  <p className={`${isExpanded ? 'ml-2' : 'hidden'} font-semibold text-lg`}>Schedule</p>
                  <p className={`${isExpanded ? 'ml-2' : 'hidden'} font-semibold text-lg`}>Resources</p>
                  <p className={`${isExpanded ? 'ml-2' : 'hidden'} font-semibold text-lg`}>User Management</p>
                  <p className={`${isExpanded ? 'ml-2' : 'hidden'} font-semibold text-lg`}>Add User</p>
                  <p className={`${isExpanded ? 'ml-2' : 'hidden'} font-semibold text-lg`}>SchoolSM</p>
                </div>
              </div>
            </div>

          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Side;
