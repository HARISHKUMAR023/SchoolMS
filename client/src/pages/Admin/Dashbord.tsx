import { useState } from "react";
import Card from "../../components/UI/Dashbord/Card";
import Calendar from "../../components/UI/Dashbord/Calendar";
import { addMonths, subMonths } from 'date-fns';
const Dashbord = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };
  return (
    <div className="overscroll-y-auto">
      <Card />
      <div className="flex flex-row">
        <div className="basis-7/12">
        <Calendar currentMonth={currentMonth} onNextMonth={nextMonth} onPrevMonth={prevMonth} />
        </div>
     
      <div className="basic-5/12">
        <h1>Calendar</h1>
      </div>
      </div>
     
    </div>
  )
}

export default Dashbord