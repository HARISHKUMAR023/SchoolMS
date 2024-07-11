import { useState } from 'react';
import { Squeeze as Hamburger } from 'hamburger-react';
import { AiFillHome, AiFillSetting } from "react-icons/ai";
import { PiStudentFill } from "react-icons/pi";
import { FaChalkboardTeacher } from "react-icons/fa";
import { MdOutlineMiscellaneousServices } from "react-icons/md";
import { SiGoogleclassroom } from "react-icons/si";
import { BiSolidReport } from "react-icons/bi";




const Side = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [showHomeItems, setShowHomeItems] = useState(false);
  const [showSettingsItems, setShowSettingsItems] = useState(false);
  const [showStudentItems, setShowStudentItems] = useState(false);
  const [showTeacherItems, setShowTeacherItems] = useState(false);
  const [showServiceItems, setShowServiceItems] = useState(false);
  const [showClassItems, setShowClassItems] = useState(false);
  const [showReportItems, setShowReportItems] = useState(false);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleHomeItems = () => {
    setShowHomeItems(!showHomeItems);
    setShowSettingsItems(false);
    setShowStudentItems(false);
    setShowTeacherItems(false);
    setShowServiceItems(false);
    setShowClassItems(false);
    setShowReportItems(false);
    setIsExpanded(true);
  };

  const toggleSettingsItems = () => {
    setShowSettingsItems(!showSettingsItems);
    setShowHomeItems(false);
    setShowStudentItems(false);
    setShowTeacherItems(false);
    setShowServiceItems(false);
    setShowClassItems(false);
    setShowReportItems(false);
    setIsExpanded(true);
  };

  const toggleStudentItems = () => {
    setShowStudentItems(!showStudentItems);
    setShowHomeItems(false);
    setShowSettingsItems(false);
    setShowTeacherItems(false);
    setShowServiceItems(false);
    setShowClassItems(false);
    setShowReportItems(false);
    setIsExpanded(true);
  };

  const toggleTeacherItems = () => {
    setShowTeacherItems(!showTeacherItems);
    setShowHomeItems(false);
    setShowSettingsItems(false);
    setShowStudentItems(false);
    setShowServiceItems(false);
    setShowClassItems(false);
    setShowReportItems(false);
    setIsExpanded(true);
  };

  const toggleServiceItems = () => {
    setShowServiceItems(!showServiceItems);
    setShowHomeItems(false);
    setShowSettingsItems(false);
    setShowStudentItems(false);
    setShowTeacherItems(false);
    setShowClassItems(false);
    setShowReportItems(false);
    setIsExpanded(true);
  };

  const toggleClassItems = () => {
    setShowClassItems(!showClassItems);
    setShowHomeItems(false);
    setShowSettingsItems(false);
    setShowStudentItems(false);
    setShowTeacherItems(false);
    setShowServiceItems(false);
    setShowReportItems(false);
    setIsExpanded(true);
  };

  const toggleReportItems = () => {
    setShowReportItems(!showReportItems);
    setShowHomeItems(false);
    setShowSettingsItems(false);
    setShowStudentItems(false);
    setShowTeacherItems(false);
    setShowServiceItems(false);
    setShowClassItems(false);
    setIsExpanded(true);
  };

  return (
    <div className="overflow-y-auto">
      <div className={`h-full ${isExpanded ? 'w-72' : 'w-28'} bg-green-500 p-2 rounded-md transition-all duration-300 overflow-y-auto`}>
        <div className="h-full bg-white rounded-md">
          
          <div id='top' className='flex'>
            <div className='bg-yellow-100 w-full'></div>
            <div className='-mr-[11px] ml-auto'>
              <Hamburger 
                  toggled={isExpanded} 
                  toggle={toggleSidebar} 
                  size={20}/>
            </div>
          </div>
          
          <div id='content' className='flex flex-col justify-center gap-3'>
            
            <div id='home' className={`${isExpanded ? 'flex-row' : 'flex-col'} flex items-center`} 
              onClick={toggleHomeItems}>
                <AiFillHome className='size-8 text-gray-600' />
                <p className={`${isExpanded ? 'ml-2' : 'mt-2'} font-semibold text-lg`}>Home</p>
            </div>

            <div id='slide-down-home' className={`overflow-hidden transition-all duration-300 ${showHomeItems ? 'max-h-40' : 'max-h-0'}`}>
              <div className="items-center mt-2 gap-2 ml-8">
                <p className={`${isExpanded ? 'ml-2' : 'hidden'} font-semibold text-lg`}>Dashboard</p>
                <p className={`${isExpanded ? 'ml-2' : 'hidden'} font-semibold text-lg`}>Employees</p>
                <p className={`${isExpanded ? 'ml-2' : 'hidden'} font-semibold text-lg`}>Students</p>
              </div>
            </div>
            
            <div id='students' className={`${isExpanded ? 'flex-row' : 'flex-col'} flex items-center mt-4`} 
              onClick={toggleStudentItems}>
                <PiStudentFill className='size-8 text-gray-600' />
                <p className={`${isExpanded ? 'ml-2' : 'mt-2'} font-semibold text-lg`}>Students</p>
            </div>

            <div id='slide-down-students' className={`overflow-hidden transition-all duration-300 ${showStudentItems ? 'max-h-40' : 'max-h-0'}`}>
              <div className="items-center mt-2 gap-2 ml-8">
                <p className={`${isExpanded ? 'ml-2' : 'hidden'} font-semibold text-lg`}>Attendance</p>
                <p className={`${isExpanded ? 'ml-2' : 'hidden'} font-semibold text-lg`}>Message</p>
              </div>
            </div>

            <div id='teachers' className={`${isExpanded ? 'flex-row' : 'flex-col'} flex items-center mt-4`} 
              onClick={toggleTeacherItems}>
                <FaChalkboardTeacher className='size-8 text-gray-600' />
                <p className={`${isExpanded ? 'ml-2' : 'mt-2'} font-semibold text-lg`}>Teachers</p>
            </div>

            <div id='slide-down-teachers' className={`overflow-hidden transition-all duration-300 ${showTeacherItems ? 'max-h-40' : 'max-h-0'}`}>
              <div className="items-center mt-2 gap-2 ml-8">
                <p className={`${isExpanded ? 'ml-2' : 'hidden'} font-semibold text-lg`}>Overview</p>
              </div>
            </div>

            <div id='services' className={`${isExpanded ? 'flex-row' : 'flex-col'} flex items-center mt-4`} 
              onClick={toggleServiceItems}>
                <MdOutlineMiscellaneousServices className='size-8 text-gray-600' />
                <p className={`${isExpanded ? 'ml-2' : 'mt-2'} font-semibold text-lg`}>Services</p>
            </div>

            <div id='slide-down-services' className={`overflow-hidden transition-all duration-300 ${showServiceItems ? 'max-h-40' : 'max-h-0'}`}>
              <div className="items-center mt-2 gap-2 ml-8">
                <p className={`${isExpanded ? 'ml-2' : 'hidden'} font-semibold text-lg`}>Message</p>
              </div>
            </div>

            <div id='classes' className={`${isExpanded ? 'flex-row' : 'flex-col'} flex items-center mt-4`} 
              onClick={toggleClassItems}>
                <SiGoogleclassroom className='size-8 text-gray-600' />
                <p className={`${isExpanded ? 'ml-2' : 'mt-2'} font-semibold text-lg`}>Classes</p>
            </div>

            <div id='slide-down-classes' className={`overflow-hidden transition-all duration-300 ${showClassItems ? 'max-h-40' : 'max-h-0'}`}>
              <div className="items-center mt-2 gap-2 ml-8">
                <p className={`${isExpanded ? 'ml-2' : 'hidden'} font-semibold text-lg`}>My Students</p>
              </div>
            </div>

            <div id='reports' className={`${isExpanded ? 'flex-row' : 'flex-col'} flex items-center mt-4`} 
              onClick={toggleReportItems}>
                <BiSolidReport className='size-8 text-gray-600' />
                <p className={`${isExpanded ? 'ml-2' : 'mt-2'} font-semibold text-lg`}>Reports</p>
            </div>

            <div id='slide-down-reports' className={`overflow-hidden transition-all duration-300 ${showReportItems ? 'max-h-40' : 'max-h-0'}`}>
              <div className="items-center mt-2 gap-2 ml-8">
                <p className={`${isExpanded ? 'ml-2' : 'hidden'} font-semibold text-lg`}>Overview</p>
              </div>
            </div>

            <div id='settings' className={`${isExpanded ? 'flex-row' : 'flex-col'} flex items-center mt-4`} 
              onClick={toggleSettingsItems}>
                <AiFillSetting className='size-8 text-gray-600' />
                <p className={`${isExpanded ? 'ml-2' : 'mt-2'} font-semibold text-lg`}>Settings</p>
            </div>

            <div id='slide-down-settings' className={`overflow-hidden transition-all duration-300 ${showSettingsItems ? 'max-h-60' : 'max-h-0'}`}>
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
  );
};

export default Side;
