import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Squeeze as Hamburger } from 'hamburger-react';
import { AiFillHome, AiFillSetting } from "react-icons/ai";
import { PiStudentFill } from "react-icons/pi";
import { FaChalkboardTeacher } from "react-icons/fa";
import { MdOutlineMiscellaneousServices } from "react-icons/md";
import { SiGoogleclassroom } from "react-icons/si";
import { BiSolidReport } from "react-icons/bi";
import { TbHexagonLetterSFilled } from "react-icons/tb";
import { RiCodeBoxFill } from "react-icons/ri";
import { BsFillInfoCircleFill } from "react-icons/bs";
// import Info from '../pages/Info'
import './side.css';


const Side = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [activeSubSection, setActiveSubSection] = useState<string | null>(null);
  const [rippleActive, setRippleActive] = useState(false);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleSection = (sectionId: string) => {
    if (activeSection === sectionId) {
      return;
    } else {
      setActiveSection(sectionId);
      setActiveSubSection(null); // Reset the sub-section when changing the main section
    }
    setIsExpanded(true);
    setRippleActive(true);
    setTimeout(() => setRippleActive(false), 500);
  };

  const toggleSubSection = (subSectionId: string) => {
    if (activeSubSection === subSectionId) {
      return;
    } else {
      setActiveSubSection(subSectionId);
    }
    setRippleActive(true);
    setTimeout(() => setRippleActive(false), 500);
  };

  const menuItems = [
    {
      title: 'Home',
      icon: <AiFillHome className={`w-5 h-5 ${activeSection === 'home' ? 'text-blue-500 dark:text-white' : 'text-gray-600 text-lg dark:text-white/70'}`} />,
      subMenuItems: [
        { name: '• Dashboard', link: '/dashboard' },
        { name: '• Add Student', link: 'add-student' },
        { name: '• Add Employee', link: 'add-employee' },
        { name: '• Student Details', link: 'student-details' },
      ],
      roles: ['admin'],
    },
    {
      title: 'Students',
      icon: <PiStudentFill className={`w-5 h-5 ${activeSection === 'students' ? 'text-blue-500  dark:text-white' : 'text-gray-600 text-lg dark:text-white/70'}`} />,
      subMenuItems: [
        { name: '• Attendance', link: 'student-attendance' },
        { name: '• Message', link: 'submit-homework' }
      ],
      roles: ['admin', 'teacher'],
    },
    {
      title: 'Teachers',
      icon: <FaChalkboardTeacher className={`w-5 h-5 ${activeSection === 'teachers' ? 'text-blue-500  dark:text-white' : 'text-gray-600 text-lg dark:text-white/70'}`} />,
      subMenuItems: [
        { name: '• Overview', link: 'teacher-overview' }
      ],
      roles: ['admin'],
    },
    {
      title: 'Services',
      icon: <MdOutlineMiscellaneousServices className={`w-5 h-5 ${activeSection === 'services' ? 'text-blue-500  dark:text-white' : 'text-gray-600 text-lg dark:text-white/70' }`} />,
      subMenuItems: [
        { name: '• Message', link: 'submit-homework' }
      ],
      roles: ['admin'],
    },
    {
      title: 'Classes',
      icon: <SiGoogleclassroom className={`w-5 h-5 ${activeSection === 'classes' ? 'text-blue-500  dark:text-white' : 'text-gray-600 text-lg dark:text-white/70'}`} />,
      subMenuItems: [
        { name: '• My Students', link: 'my-students' }
      ],
      roles: ['• admin', 'teacher', 'student'],
    },
    {
      title: 'Reports',
      icon: <BiSolidReport className={`w-5 h-5 ${activeSection === 'reports' ? 'text-blue-500  dark:text-white' : 'text-gray-600 text-lg dark:text-white/70'}`} />,
      subMenuItems: [
        { name: '• Overview', link: '/add-user' }
      ],
      roles: ['admin'],
    },
    {
      title: 'Settings',
      icon: <AiFillSetting className={`w-5 h-5 ${activeSection === 'settings' ? 'text-blue-500  dark:text-white' : 'text-gray-600 text-lg dark:text-white/70'}`} />,
      subMenuItems: [
        { name: '• Overview', link: 'user-overview' },
        { name: '• Schedule', link: 'user-schedule' },
        { name: '• Resources', link: 'add-class' },
        { name: '• User Management', link: 'user-management' },
        { name: '• Add User', link: 'add-user' },
        { name: '• SchoolSM', link: 'student-class-section' },
      ],
      roles: ['admin'],
    },
  ];

  const developerSettings = [
    {
    title: 'Developer Settings',
    icon: <RiCodeBoxFill className={`w-5 h-5 ${activeSection === 'developer settings' ? 'text-blue-500  dark:text-white' : 'text-gray-600 text-lg dark:text-white/70'}`} />,
    subMenuItems: [
      { name: '• Overview', link: 'user-overview' },
      
    ],
    roles: ['admin'],
  },
  // {
  //   title: 'Info',
  //   icon: <BsFillInfoCircleFill className={`w-5 h-5 ${activeSection === 'info' ? 'text-blue-500  dark:text-white' : 'text-gray-600 text-lg dark:text-white/70'}`} />,
  //   subMenuItems: [
  //     { name: '• Version -v1.1.0-beta', link: 'version' },
  //     
  //   ],
  //   roles: ['admin'],
  // },
];

  return (
    <div className="overflow-y-auto overflow-x-hidden h-full rounded-md bg-primary/70 dark:bg-darkbg1">
      <div
        className={`h-full ${
          isExpanded ? "w-64" : "w-28"
        } rounded-md transition-all duration-300`}
      >
        <div className="h-full flex flex-col">
          <div
            id="top"
            className="flex items-center pt-2 backdrop-blur sticky top-0"
          >
            <div className={`w-full flex items-center justify-center`}>
              <TbHexagonLetterSFilled className="size-8 text-blue-500 dark:text-white" />
              <p
                className={`ml-3 text-2xl font-bold text-blue-500 dark:text-white ${
                  isExpanded ? null : "hidden"
                }`}
              >
                School Sync
              </p>
            </div>
            <div className="-mr-[11px] ml-auto">
              <Hamburger
                toggled={isExpanded}
                toggle={toggleSidebar}
                size={14}
              />
            </div>
          </div>

          <div id="content" className="flex-grow flex flex-col p-2 mt-4 gap-2">
            {menuItems.map((item, index) => (
              <div
                key={index}
                className={`p-2  ${activeSection === item.title.toLowerCase()? "active-section ripple bg-white/70 dark:bg-white/10" : "hover:bg-white/50 dark:hover:bg-white/5 cursor-pointer"
                } rounded-md ${rippleActive ? "ripple-active" : ""}`}
              >
                <div
                  id={item.title.toLowerCase()}
                  className={`${
                    isExpanded ? "flex-row" : "flex-col"
                  } flex items-center`}
                  onClick={() => toggleSection(item.title.toLowerCase())}
                >
                  {item.icon}
                  <p
                    className={` ${
                      isExpanded
                        ? "ml-2 text-lg font-semibold"
                        : "mt-2 text-lg font-semibold"
                    } ${
                      activeSection === item.title.toLowerCase()
                        ? "text-blue-500 dark:text-white"
                        : "text-gray-600 text-lg dark:text-white/70 "
                    }`}
                  >
                    {item.title}
                  </p>
                </div>

                <div
                  id={`slide-down-${item.title.toLowerCase()}`}
                  className={`overflow-hidden transition-all duration-300 ${
                    activeSection === item.title.toLowerCase()
                      ? "max-h-42"
                      : "max-h-0"
                  }`}
                >
                  <div className="items-center mt-1 ml-8 space-y-2">
                    {item.subMenuItems.map((subItem, subIndex) => (
                      <Link
                        key={subIndex}
                        to={subItem.link}
                        className={`${
                          isExpanded ? "ml-2 " : "hidden text-lg"
                        } block font-semibold ${
                          activeSubSection === subItem.name.toLowerCase()
                            ? "text-blue-500 dark:text-white"
                            : "text-gray-600 dark:text-white/60 hover:text-blue-500/75 dark:hover:text-white/80"
                        }`}
                        onClick={() =>
                          toggleSubSection(subItem.name.toLowerCase())
                        }
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            <div id='bottom' className='mt-auto'>
              {/* Developer Settings Section */}
              {developerSettings.map((devSetting, devIndex) => (
                <div
                  key={devIndex}
                  className={`p-2 space-y-2 ${
                    activeSection === devSetting.title.toLowerCase()
                      ? "active-section ripple bg-white/70 dark:bg-white/10"
                      : "hover:bg-white/50 dark:hover:bg-white/5 cursor-pointer"
                  } rounded-md ${rippleActive ? "ripple-active" : ""}`}
                >
                  <div
                    id={devSetting.title.toLowerCase()}
                    className={`${
                      isExpanded ? "flex-row" : "flex-col"
                    } flex items-center `}
                    onClick={() => toggleSection(devSetting.title.toLowerCase())}
                  >
                    {devSetting.icon}
                    <p
                      className={`text-center ${
                        isExpanded
                          ? "ml-2 text-lg font-semibold "
                          : "mt-2 text-lg font-semibold"
                      } ${
                        activeSection === devSetting.title.toLowerCase()
                          ? "text-blue-500 dark:text-white"
                          : "text-gray-600 text-lg dark:text-white/70"
                      }`}
                    >
                      {devSetting.title}
                    </p>
                  </div>
                  <div
                    id={`slide-down-${devSetting.title.toLowerCase()}`}
                    className={`overflow-hidden transition-all duration-300  ${
                      activeSection === devSetting.title.toLowerCase()
                        ? "max-h-42 "
                        : "max-h-0"
                    }`}
                  >
                    <div className="items-center mt-1 ml-8 space-y-2">
                      {devSetting.subMenuItems.map((subItem, subIndex) => (
                        <Link
                          key={subIndex}
                          to={subItem.link}
                          className={` ${
                            isExpanded ? "ml-2 " : "hidden text-lg"
                          } block font-semibold   ${
                            activeSubSection === subItem.name.toLowerCase()
                              ? "text-blue-500 dark:text-white"
                              : "text-gray-600 dark:text-white/60 hover:text-blue-500/75 dark:hover:text-white/80"
                          }`}
                          onClick={() => toggleSubSection(subItem.name.toLowerCase())}
                        > 
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <hr className='bg-gradient-to-r from-transparent via-gray-600 to-transparent mx-2 h-[2px]'/>
            
            <div className={`w-full p-2 flex items-center  hover:bg-white/50 dark:hover:bg-white/5 cursor-pointer 
                              ${isExpanded ? "flex-row" : "flex-col text-center"}`}>
            
              <BsFillInfoCircleFill className='size-5 text-gray-600  dark:text-white/70' />
              <div className='ml-2 text-gray-600  dark:text-white/70 '>
                <p className={`font-semibold 
                              ${isExpanded ? "text-sm " : "text-xs my-2"}`}>Version Info</p>
                <p className='text-xs '>Version -v1.0.0-beta</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Side;
