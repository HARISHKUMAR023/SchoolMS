import DashboardCard from '../../comman/Card/DashboardCard';

import { PiStudentBold } from "react-icons/pi";
import { MdOutlinePeopleAlt } from "react-icons/md";
// import { FaPeopleGroup } from 'react-icons/fa';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { FaBookOpenReader } from "react-icons/fa6";
import { FaCalendarCheck } from "react-icons/fa";
const Card = () => {
  const [studentCount, setStudentCount] = useState<number>(0);
  useEffect(() => {
    fetchStudentCount();
  }, []);

  const fetchStudentCount = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/dashboard/studentcount'); // Adjust URL as per your backend setup
      setStudentCount(response.data.count);
    } catch (error) {
      console.error('Error fetching student count:', error);
    }
  };
  return (
    <div>
         <div className="p-8 bg-gray-100 ">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardCard icon={<PiStudentBold size={34} />} count={studentCount} text="Total Studnet" />
        <DashboardCard icon={<MdOutlinePeopleAlt  size={34} />} count={150} text="Total Employee" />
        <DashboardCard icon={<FaBookOpenReader  size={34} />} count={75} text="Total Class" />
        <DashboardCard icon={<FaCalendarCheck  size={34} />} count={75} text="Total Holidays" />
      </div>
    </div>
    </div>
  )
}

export default Card