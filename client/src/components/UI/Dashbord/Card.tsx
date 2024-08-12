import DashboardCard from '../../comman/Card/DashboardCard';

import { PiStudentBold } from "react-icons/pi";
import { MdOutlinePeopleAlt } from "react-icons/md";
// import { FaPeopleGroup } from 'react-icons/fa';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { FaBookOpenReader } from "react-icons/fa6";
import { FaCalendarCheck } from "react-icons/fa";
import { TbCircleDashedPlus } from "react-icons/tb";

const Card = () => {
  const [studentCount, setStudentCount] = useState<number>(0);
  const [EmployeeCount, setEmployeeCount] = useState<number>(0);
  useEffect(() => {
    fetchStudentCount();
    fetchEmployeCount();
  }, []);

  const fetchStudentCount = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/dashboard/studentcount'); // Adjust URL as per your backend setup
      setStudentCount(response.data.count);
    } catch (error) {
      console.error('Error fetching student count:', error);
    }
  };
  const fetchEmployeCount = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/dashboard/employeecount'); // Adjust URL as per your backend setup
      setEmployeeCount(response.data.count);
    } catch (error) {
      console.error('Error fetching student count:', error);
    }
  };
  return (
    <div>
         <div className="pb-4 bg-gray-[#a0a0a0a] ">
      <div id="conatain" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardCard icon={<PiStudentBold size={34} />} count={studentCount} text="Total Studnet" addicon={<TbCircleDashedPlus />} add="Add Student"/>
        <DashboardCard icon={<MdOutlinePeopleAlt  size={34} />} count={EmployeeCount} text="Total Employee" addicon={<TbCircleDashedPlus />} add="Add Employee"/>
        <DashboardCard icon={<FaBookOpenReader  size={34} />} count={75} text="Total Class" addicon={<TbCircleDashedPlus />} add="Add Class"/>
        <DashboardCard icon={<FaCalendarCheck  size={34} />} count={75} text="Total Holidays" addicon={<TbCircleDashedPlus />} add="Add Holidays"/>
      </div>
    </div>
    </div>
  )
}

export default Card