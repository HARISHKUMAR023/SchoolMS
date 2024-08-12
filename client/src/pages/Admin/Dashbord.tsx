import { useState } from "react";
import Card from "../../components/UI/Dashbord/Card";
import Calendar from "../../components/UI/Dashbord/Calendar";
import NotificationCard from"../../components/comman/Card/NotificationCard";
import Charts from "../../components/comman/Charts/Charts"
// import SubCard from "../../components/UI/Dashbord/SubCard";
// import { FaUserGraduate, FaChalkboardTeacher, FaSchool } from 'react-icons/fa';
// import { useSelector } from "react-redux";
// import { RootState } from "../../Store";
import { addMonths, subMonths } from 'date-fns';
import { useSelector } from 'react-redux';
import { RootState } from '../../Store/index';
// interface CardData {
//   icon: ReactElement;
//   text: string;
//   count: number;
// }
// const cardData: CardData[] = [
//   { icon: <FaUserGraduate className="text-blue-500 w-10 h-10 text-center"/>, text: 'Add Students', count: 1200 },
//   { icon:< FaChalkboardTeacher className="text-blue-500 w-10 h-10 text-center"/>, text: 'Add Employess', count: 75 },
//   { icon:< FaSchool className="text-blue-500 w-10 h-10 text-center"/>, text: 'Send Message', count: 30 },
//   { icon:< FaSchool className="text-blue-500 w-10 h-10 text-center"/>, text: 'Send Message', count: 30 },
// ];
const Dashbord = () => {
//   const authState = useSelector((state: RootState) => state.auth);
//  console.log(authState.user)
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const teacherId = useSelector((state: RootState) => state.auth.teacherId);
  console.log(teacherId)
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };
  return (
    <div className="">
      <Card />
      
      <div className="flex flex-row">
        <div className="basis-7/12">
        <Calendar 
          currentMonth={currentMonth} 
          onNextMonth={nextMonth} 
          onPrevMonth={prevMonth} />
          
        </div>
     
        <div className="basis-5/12 h-full ml-4">
          {/* <div className="flex justify-between bg-blue-500/20 px-2 dark:bg-darkbg2
                          cursor-pointer ml-2 py-2 rounded-lg dark:text-black">
            {cardData.map((data, index) => (
              <SubCard key={index} icon={data.icon} text={data.text} count={data.count}/>

            ))}
          </div> */}
          <div id="1" className="h-full space-y-4 ">
            <div className="bg-white/50 h-1/2 rounded-md shadow-md w-full  p-4 overflow-auto">
              <p className="text-xl font-bold ">Recent Notifications</p>
              <NotificationCard />
            </div>
            <div id="2" className="">
              <Charts />
            </div>
          </div>
        </div>
      </div>
     
    </div>
  )
}

export default Dashbord