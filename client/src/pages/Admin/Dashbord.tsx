import { useState ,ReactElement  } from "react";
import Card from "../../components/UI/Dashbord/Card";
import Calendar from "../../components/UI/Dashbord/Calendar";
import SubCard from "../../components/UI/Dashbord/SubCard";
import { FaUserGraduate, FaChalkboardTeacher, FaSchool } from 'react-icons/fa';
// import { useSelector } from "react-redux";
// import { RootState } from "../../Store";
import { addMonths, subMonths } from 'date-fns';
import { useSelector } from 'react-redux';
import { RootState } from '../../Store/index';
interface CardData {
  icon: ReactElement;
  text: string;
  count: number;
}
const cardData: CardData[] = [
  { icon: <FaUserGraduate className="text-blue-500 w-10 h-10"/>, text: 'Add Students', count: 1200 },
  { icon:< FaChalkboardTeacher className="text-blue-500 w-10 h-10"/>, text: 'Add Employess', count: 75 },
  { icon:< FaSchool className="text-blue-500 w-10 h-10"/>, text: 'Send Message', count: 30 },
  { icon:< FaSchool className="text-blue-500 w-10 h-10"/>, text: 'Send Message', count: 30 },
];
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
     
      <div className="basis-5/12 ml-2">
        <div className="grid grid-cols-2 gap-2 bg-[#262626] mx-2 py-2 rounded-lg dark:text-black">
          {cardData.map((data, index) => (
            <SubCard key={index} icon={data.icon} text={data.text} count={data.count}/>

          ))}
        </div>
      
        </div>
      </div>
     
    </div>
  )
}

export default Dashbord