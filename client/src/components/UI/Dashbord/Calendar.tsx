// src/components/Calendar.tsx
import React from 'react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, } from 'date-fns';

interface CalendarProps {
  currentMonth: Date;
  onNextMonth: () => void;
  onPrevMonth: () => void;
}

const Calendar: React.FC<CalendarProps> = ({ currentMonth, onNextMonth, onPrevMonth }) => {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const days = eachDayOfInterval({ start: startDate, end: endDate });

  const renderHeader = () => {
    return (
      <div className="flex justify-between items-center mb-4">
        <button onClick={onPrevMonth} className="text-blue-500">
          &lt;
        </button>
        <span className="text-xl font-semibold">
          {format(currentMonth, 'MMMM yyyy')}
        </span>
        <button onClick={onNextMonth} className="text-blue-500">
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

  const renderCells = () => {
    const dateFormat = 'd';
    const rows: React.ReactNode[] = [];
    let daysInRow: React.ReactNode[] = [];

    days.forEach((day, index) => {
      const formattedDate = format(day, dateFormat);
      const isSameMonth = day >= monthStart && day <= monthEnd;

      daysInRow.push(
        <div
          className={`w-1/7 text-center px-[46px] py-6  ${isSameMonth ? 'text-black' : 'text-gray-400'}`}
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

  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <h2 className="text-xl font-bold mb-4">Academic Calendar</h2>
      <div className="mb-4">
        <button className="bg-red-500 text-white px-4 py-2 mr-2 rounded">Month</button>
        <button className="bg-gray-300 px-4 py-2 mr-2 rounded">Week</button>
        <button className="bg-gray-300 px-4 py-2 rounded">Day</button>
      </div>
      {renderHeader()}
      {renderDaysOfWeek()}
      {renderCells()}
    </div>
  );
};

export default Calendar;
