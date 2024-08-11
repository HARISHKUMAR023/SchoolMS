import DashboardCard from '../../comman/Card/DashboardCard';

import { PiStudentBold } from "react-icons/pi";
import { MdOutlinePeopleAlt } from "react-icons/md";
// import { FaPeopleGroup } from 'react-icons/fa';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { FaBookOpenReader } from "react-icons/fa6";
import { FaCalendarCheck } from "react-icons/fa";
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchSettings  } from '../../../slices/visibilitySlice';
// import { RootState, AppDispatch } from '../../../Store/index';
const Card = () => {
  // const dispatch: AppDispatch = useDispatch();
  // const visibility = useSelector((state: RootState) => state.visibility);
  // useEffect(() => {
  //   dispatch(fetchSettings());
  // }, [dispatch]);
  // const handleToggleVisibility = (component: string) => {
  //   const isVisible = !visibility[component];
  //   dispatch(updateSetting({ component, isVisible }));
  // };
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* {visibility.SudentCoutn && <DashboardCard icon={<PiStudentBold size={34} />} count={studentCount} text="Total Studnet" />} */}
        <DashboardCard icon={<PiStudentBold size={34} />} count={studentCount} text="Total Studnet" />
        <DashboardCard icon={<MdOutlinePeopleAlt  size={34} />} count={EmployeeCount} text="Total Employee" />
        <DashboardCard icon={<FaBookOpenReader  size={34} />} count={75} text="Total Class" />
        <DashboardCard icon={<FaCalendarCheck  size={34} />} count={75} text="Total Holidays" />
      </div>
    </div>
    </div>
  )
}

export default Card