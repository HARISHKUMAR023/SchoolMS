import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay, getDay } from 'date-fns';

interface CalendarProps {
  currentMonth: Date;
  onNextMonth: () => void;
  onPrevMonth: () => void;
}

const Calendar: React.FC<CalendarProps> = ({ currentMonth, onNextMonth, onPrevMonth }) => {
  const [view, setView] = useState<'month' | 'week' | 'day'>('month');
  const today = new Date();

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const weekStart = startOfWeek(currentMonth);
  const weekEnd = endOfWeek(currentMonth);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const days = eachDayOfInterval({ start: startDate, end: endDate });

  const renderHeader = () => {
    return (
      <div className="flex justify-between items-center mb-4">
        <button onClick={onPrevMonth} className="text-blue-500 hover:bg-white dark:text-white dark:hover:bg-darkbg1 mx-2 px-2 rounded-lg">
          &lt;
        </button>
        <span className="text-xl font-semibold">
          {format(currentMonth, 'MMMM yyyy')}
        </span>
        <button onClick={onNextMonth} className="text-blue-500 hover:bg-white dark:text-white dark:hover:bg-darkbg1 mx-2 px-2 rounded-lg">
          &gt;
        </button>
      </div>
    );
  };

  const renderDaysOfWeek = () => {
    const dateFormat = 'eeee';
    const daysOfWeek = days.slice(0, 7).map((day, index) => (
      <div className="w-1/7 text-center font-semibold px-6" key={index}>
        {format(day, dateFormat)}
      </div>
    ));
    return <div className="flex">{daysOfWeek}</div>;
  };

  const renderMonthCells = () => {
    const dateFormat = 'dd';
    const rows: React.ReactNode[] = [];
    let daysInRow: React.ReactNode[] = [];

    days.forEach((day, index) => {
      const formattedDate = format(day, dateFormat);
      const isSameMonth = day >= monthStart && day <= monthEnd;
      const isToday = isSameDay(day, today);
      const isSunday = getDay(day) === 0;

      daysInRow.push(
        <div
          className={`w-1/7 text-center px-[46px] py-6 rounded-md shadow dark:hover:bg-white/10 hover:bg-white hover:shadow-md cursor-pointer 
            ${isSameMonth ? (isSunday ? 'text-red-500' : 'text-black dark:text-white') : (isSunday ? 'text-red-300' : 'text-gray-400')} 
            ${isToday ? 'bg-blue-500/20' : ''}`}
          key={index}
        >
          {formattedDate}
        </div>
      );

      if ((index + 1) % 7 === 0) {
        rows.push(<div className="flex" key={index}>{daysInRow}</div>);
        daysInRow = [];
      }
    });

    return <div>{rows}</div>;
  };

  const renderWeekCells = () => {
    const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd });
    const dateFormat = 'dd';
    const daysInRow: React.ReactNode[] = [];

    weekDays.forEach((day, index) => {
      const formattedDate = format(day, dateFormat);
      const isToday = isSameDay(day, today);
      const isSunday = getDay(day) === 0;
      const isSameMonth = day >= monthStart && day <= monthEnd;

      daysInRow.push(
        <div
          className={`w-1/7 text-center px-[46px] py-6 
            ${isSunday ? (isSameMonth ? 'text-red-500' : 'text-red-300') : 'text-black dark:text-white'} 
            ${isToday ? 'bg-blue-500/20' : ''}`}
          key={index}
        >
          {formattedDate}
        </div>
      );
    });

    return <div className="flex">{daysInRow}</div>;
  };

  const renderDayCell = () => {
    const formattedDate = format(currentMonth, 'dd');
    const isToday = isSameDay(currentMonth, today);

    return (
      <div
        className={`text-center px-[46px] py-6 text-black dark:text-white ${isToday ? 'bg-blue-500/20' : ''}`}
      >
        {formattedDate}
      </div>
    );
  };

  return (
    <div className="p-4 dark:bg-white/10 bg-white/50 shadow rounded-lg dark:text-white">
      <h2 className="text-xl font-bold mb-4 text-black dark:text-white">Academic Calendar</h2>
      <div className="mb-4">
        <button className={`px-4 py-2 mr-2 rounded ${view === 'month' ? 'bg-red-500 text-white' : 'bg-gray-300 dark:text-black'}`} onClick={() => setView('month')}>Month</button>
        <button className={`px-4 py-2 mr-2 rounded ${view === 'week' ? 'bg-red-500 text-white' : 'bg-gray-300 dark:text-black'}`} onClick={() => setView('week')}>Week</button>
        <button className={`px-4 py-2 rounded ${view === 'day' ? 'bg-red-500 text-white' : 'bg-gray-300 dark:text-black'}`} onClick={() => setView('day')}>Day</button>
      </div>
      {renderHeader()}
      {renderDaysOfWeek()}
      {view === 'month' && renderMonthCells()}
      {view === 'week' && renderWeekCells()}
      {view === 'day' && renderDayCell()}
    </div>
  );
};

export default Calendar;
