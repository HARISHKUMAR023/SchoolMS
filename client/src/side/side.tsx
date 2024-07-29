import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Squeeze as Hamburger } from 'hamburger-react';
// import { AiFillHome, AiFillSetting } from "react-icons/ai";
// import { PiStudentFill } from "react-icons/pi";
// import { FaChalkboardTeacher } from "react-icons/fa";
// import { MdOutlineMiscellaneousServices } from "react-icons/md";
// import { SiGoogleclassroom } from "react-icons/si";
// import { BiSolidReport } from "react-icons/bi";
import { TbHexagonLetterSFilled } from "react-icons/tb";
import { RiCodeBoxFill } from "react-icons/ri";
import { BsFillInfoCircleFill } from "react-icons/bs";
import axios from 'axios';
import './side.css';

// Define types for menu items
interface SubMenuItem {
  name: string;
  link: string;
}

interface MenuItem {
  title: string;
  icon: JSX.Element;
  subMenuItems: SubMenuItem[];
  roles: string[];
}

interface DeveloperSetting extends MenuItem {}

const Side = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [activeSubSection, setActiveSubSection] = useState<string | null>(null);
  const [rippleActive, setRippleActive] = useState(false);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/menu');
      setMenuItems(response.data); // Set the state with response data
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching menu items:', error);
      // Optionally, you can set some error state here
    }
  };

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

  const developerSettings: DeveloperSetting[] = [
    {
      title: 'Developer Settings',
      icon: <RiCodeBoxFill className={`w-5 h-5 ${activeSection === 'developer settings' ? 'text-blue-500 dark:text-white' : 'text-gray-600 text-lg dark:text-white/70'}`} />,
      subMenuItems: [
        { name: '• Overview', link: 'user-overview' },
        { name: '• Menuoptions', link: 'Menuoptions' },
      ],
      roles: ['admin'],
    },
  ];

  return (
    <div className="overflow-y-auto overflow-x-hidden h-full rounded-md bg-primary/70 dark:bg-darkbg1">
      <div
        className={`h-full ${isExpanded ? "w-64" : "w-28"} rounded-md transition-all duration-300`}
      >
        <div className="h-full flex flex-col">
          <div id="top" className="flex items-center pt-2 backdrop-blur sticky top-0">
            <div className={`w-full flex items-center justify-center`}>
              <TbHexagonLetterSFilled className="size-8 text-blue-500 dark:text-white" />
              <p className={`ml-3 text-2xl font-bold text-blue-500 dark:text-white ${isExpanded ? null : "hidden"}`}>
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
                className={`p-2 ${activeSection === item.title.toLowerCase() ? "active-section ripple bg-white/70 dark:bg-white/10" : "hover:bg-white/50 dark:hover:bg-white/5 cursor-pointer"} rounded-md ${rippleActive ? "ripple-active" : ""}`}
              >
                <div
                  id={item.title.toLowerCase()}
                  className={`${isExpanded ? "flex-row" : "flex-col"} flex items-center`}
                  onClick={() => toggleSection(item.title.toLowerCase())}
                >
                  {/* {item.icon} */}
                  <p className={` ${isExpanded ? "ml-2 text-lg font-semibold" : "mt-2 text-lg font-semibold"} ${activeSection === item.title.toLowerCase() ? "text-blue-500 dark:text-white" : "text-gray-600 text-lg dark:text-white/70"}`}>
                    {item.title}
                  </p>
                </div>

                <div
                  id={`slide-down-${item.title.toLowerCase()}`}
                  className={`overflow-hidden transition-all duration-300 ${activeSection === item.title.toLowerCase() ? "max-h-42" : "max-h-0"}`}
                >
                  <div className="items-center mt-1 ml-8 space-y-2">
                    {item.subMenuItems.map((subItem, subIndex) => (
                      <Link
                        key={subIndex}
                        to={subItem.link}
                        className={`${isExpanded ? "ml-2 " : "hidden text-lg"} block font-semibold ${activeSubSection === subItem.name.toLowerCase() ? "text-blue-500 dark:text-white" : "text-gray-600 dark:text-white/60 hover:text-blue-500/75 dark:hover:text-white/80"}`}
                        onClick={() => toggleSubSection(subItem.name.toLowerCase())}
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
                  className={`p-2 space-y-2 ${activeSection === devSetting.title.toLowerCase() ? "active-section ripple bg-white/70 dark:bg-white/10" : "hover:bg-white/50 dark:hover:bg-white/5 cursor-pointer"} rounded-md ${rippleActive ? "ripple-active" : ""}`}
                >
                  <div
                    id={devSetting.title.toLowerCase()}
                    className={`${isExpanded ? "flex-row" : "flex-col"} flex items-center `}
                    onClick={() => toggleSection(devSetting.title.toLowerCase())}
                  >
                    {devSetting.icon}
                    <p className={`text-center ${isExpanded ? "ml-2 text-lg font-semibold " : "mt-2 text-lg font-semibold"} ${activeSection === devSetting.title.toLowerCase() ? "text-blue-500 dark:text-white" : "text-gray-600 text-lg dark:text-white/70"}`}>
                      {devSetting.title}
                    </p>
                  </div>
                  <div
                    id={`slide-down-${devSetting.title.toLowerCase()}`}
                    className={`overflow-hidden transition-all duration-300  ${activeSection === devSetting.title.toLowerCase() ? "max-h-42 " : "max-h-0"}`}
                  >
                    <div className="items-center mt-1 ml-8 space-y-2">
                      {devSetting.subMenuItems.map((subItem, subIndex) => (
                        <Link
                          key={subIndex}
                          to={subItem.link}
                          className={`${isExpanded ? "ml-2 " : "hidden text-lg"} block font-semibold   ${activeSubSection === subItem.name.toLowerCase() ? "text-blue-500 dark:text-white" : "text-gray-600 dark:text-white/60 hover:text-blue-500/75 dark:hover:text-white/80"}`}
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

            <hr className='bg-gradient-to-r from-transparent via-gray-600 to-transparent mx-2 h-[2px]' />

            <div className={`w-full p-2 flex items-center  hover:bg-white/50 dark:hover:bg-white/5 cursor-pointer ${isExpanded ? "flex-row" : "flex-col text-center"}`}>
              <BsFillInfoCircleFill className='size-5 text-gray-600  dark:text-white/70' />
              <div className='ml-2 text-gray-600  dark:text-white/70 '>
                <p className={`font-semibold ${isExpanded ? null : "hidden"}`}>
                  Help & Support
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Side;
