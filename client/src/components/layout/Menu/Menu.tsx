import React from 'react';
import MenuItem from '../../comman/Menuitem/MenuItem';
import { FaUserLock } from "react-icons/fa";
import { IoMdPersonAdd } from "react-icons/io";
import { MdGroupAdd } from "react-icons/md";
import { IoIosPeople } from "react-icons/io";
import { FaPeopleGroup } from "react-icons/fa6";

interface MenuProps {
  role: string | null;
}

const Menu: React.FC<MenuProps> = ({ role }) => {
  const menuItems = [
    {
      
      title: 'Administration',
      icone: <FaUserLock className='w-5 h-5' />,
      subMenuItems: [
        { name: 'Dashboard', link: 'Dashboard', icone: <FaUserLock className='w-5 h-5'/> },
        { name: 'Add Student', link: 'add-student', icone: <IoMdPersonAdd className='w-5 h-5' /> },
        { name: 'Add Employee', link: 'add-employee', icone: <MdGroupAdd className='w-5 h-5' /> },
        { name: 'Student Details', link: 'student-details', icone: <IoIosPeople className='w-5 h-5' /> },
        { name: 'Employee Details', link: 'employee-details', icone: <FaPeopleGroup className='w-5 h-5' /> },
      ],
      roles: ['admin'],
    },
    {
      title: 'Students',
      icone: <IoMdPersonAdd  className='w-5 h-5'/>,
      subMenuItems: [
        { name: 'Overview', link: '#/students/overview' },
        { name: 'Attendance', link: 'StudentAttendance' },
        { name: 'Grades', link: '#/students/grades' },
      ],
      roles: ['admin', 'teacher'],
    },
    {
      title: 'Teachers',
      icone: <MdGroupAdd className='w-5 h-5' />,
      subMenuItems: [
        { name: 'Overview', link: 'StudentAttendance' },
        { name: 'Schedule', link: '#/teachers/schedule' },
        { name: 'Performance', link: '#/teachers/performance' },
      ],
      roles: ['admin'],
    },
    {
      title: 'Classes',
      icone: <IoIosPeople className='w-5 h-5' />,
      subMenuItems: [
        { name: 'Overview', link: '#/classes/overview' },
        { name: 'Schedule', link: '#/classes/schedule' },
        { name: 'Resources', link: '#/classes/resources' },
      ],
      roles: ['admin', 'teacher', 'student'],
    },
    {
      title: 'Time Table',
      icone: <IoIosPeople className='w-5 h-5' />,
      subMenuItems: [
        { name: 'Overview', link: '#/timetable/overview' },
        { name: 'Schedule', link: '#/timetable/schedule' },
        { name: 'Resources', link: '#/timetable/resources' },
      ],
      roles: ['admin', 'teacher'],
    },
    {
      title: 'Settings',
      icone: <IoIosPeople className='w-5 h-5' />,
      subMenuItems: [
        { name: 'Overview', link: '#/settings/overview' },
        { name: 'Schedule', link: '#/settings/schedule' },
        { name: 'Resources', link: 'add-class' },
      ],
      roles: ['admin'],
    },
  ];

  return (
    <div className="w-72 bg-gray-800  overflow-y-auto ">
      <ul className=" p-4 overflow-y-auto">
        {menuItems.map((menuItem, index) => (
          menuItem.roles.includes(role || '') && (
            <MenuItem
              key={index}
              title={menuItem.title}
              subMenuItems={menuItem.subMenuItems}
              icone={menuItem.icone}
            />
          )
        ))}
      </ul>
    </div>
  );
};

export default Menu;
