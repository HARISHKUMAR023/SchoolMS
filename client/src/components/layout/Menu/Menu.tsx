// src/components/Menu.tsx
import React from 'react';
import MenuItem from '../../comman/Menuitem/MenuItem';
import { FaUserLock } from "react-icons/fa";
import { IoMdPersonAdd } from "react-icons/io";
import { MdGroupAdd } from "react-icons/md";
import { IoIosPeople } from "react-icons/io";
import { FaPeopleGroup } from "react-icons/fa6";
// import { Link } from 'react-router-dom';
const Menu: React.FC = () => {
  const menuItems = [
    {
      title: 'Administration',
      icone: <FaUserLock className='w-5 h-5' />, // main icon for this menu item
      subMenuItems: [
        { name: 'Dashboard', link: 'Dashboard', icone: <FaUserLock className='w-5 h-5'/> },
        { name: 'Add Student', link: 'AddStudent', icone: <IoMdPersonAdd className='w-5 h-5' /> },
        { name: 'Add Employee', link: 'AddEmployee', icone: <MdGroupAdd className='w-5 h-5' /> },
        { name: 'Student Details', link: 'StudentDetails', icone: <IoIosPeople className='w-5 h-5' /> },
        { name: 'Employee Details', link: 'EmployeeDetails', icone: <FaPeopleGroup className='w-5 h-5' /> },
      ],
    },
    {
      title: 'Students',
      icone: <IoMdPersonAdd  className='w-5 h-5'/>, // main icon for this menu item
      subMenuItems: [
        { name: 'Overview', link: '#/students/overview' },
        { name: 'Attendance', link: '#/students/attendance' },
        { name: 'Grades', link: '#/students/grades' },
      ],
    },
    {
      title: 'Teachers',
      icone: <MdGroupAdd className='w-5 h-5' />, // main icon for this menu item
      subMenuItems: [
        { name: 'Overview', link: '#/teachers/overview' },
        { name: 'Schedule', link: '#/teachers/schedule' },
        { name: 'Performance', link: '#/teachers/performance' },
      ],
    },
    {
      title: 'Classes',
      icone: <IoIosPeople className='w-5 h-5' />, // main icon for this menu item
      subMenuItems: [
        { name: 'Overview', link: '#/classes/overview' },
        { name: 'Schedule', link: '#/classes/schedule' },
        { name: 'Resources', link: '#/classes/resources' },
      ],
    },
    {
        title: 'Time Table',
        icone: <IoIosPeople className='w-5 h-5' />, // main icon for this menu item
        subMenuItems: [
          { name: 'Overview', link: '#/classes/overview' },
          { name: 'Schedule', link: '#/classes/schedule' },
          { name: 'Resources', link: '#/classes/resources' },
        ],
      },
      {
        title: 'Settings',
        icone: <IoIosPeople className='w-5 h-5' />, // main icon for this menu item
        subMenuItems: [
          { name: 'Overview', link: '#/classes/overview' },
          { name: 'Schedule', link: '#/classes/schedule' },
          { name: 'Resources', link: '#/classes/resources' },
        ],
      },
  ];

  return (
   
    // bg-gray-800 text-white w-64 h-screen

  <div className="w-64 bg-gray-800  overflow-y-auto ">
  {/* <Link to="#" className=' bg-red-500 text-white p-4 px-[90px]'>School MS</Link> */}
      <ul className=" p-4 overflow-y-auto">
        {menuItems.map((menuItem, index) => (
          <MenuItem
            key={index}
            title={menuItem.title}
            subMenuItems={menuItem.subMenuItems}
            icone={menuItem.icone}
          />
        ))}
      </ul>
  </div>

   
  
    
    
  );
};

export default Menu;
