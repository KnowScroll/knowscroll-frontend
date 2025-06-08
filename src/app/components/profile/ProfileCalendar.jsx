'use client';

import { useRef, useEffect } from 'react';

export default function ProfileCalendar({ selectedDate, onDateSelect, activityData }) {
  const scrollContainerRef = useRef(null);
  
  // Get current month data
  const currentMonth = selectedDate.getMonth();
  const currentYear = selectedDate.getFullYear();
  const monthName = selectedDate.toLocaleString('default', { month: 'long' });
  
  // Get days in month
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  
  // Generate array of dates for the month
  const monthDates = Array.from({ length: daysInMonth }, (_, i) => {
    const date = new Date(currentYear, currentMonth, i + 1);
    return {
      date,
      day: i + 1,
      dayName: date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase(),
      hasActivity: activityData[date.toISOString().split('T')[0]]?.totalMinutes > 0,
      isSelected: date.toDateString() === selectedDate.toDateString()
    };
  });

  // Auto scroll to selected date on mount and when selectedDate changes
  useEffect(() => {
    if (scrollContainerRef.current) {
      const selectedIndex = monthDates.findIndex(d => d.isSelected);
      if (selectedIndex !== -1) {
        const container = scrollContainerRef.current;
        const itemWidth = 60; // approximate width of each date item
        const scrollPosition = selectedIndex * itemWidth - container.clientWidth / 2 + itemWidth / 2;
        container.scrollTo({ left: Math.max(0, scrollPosition), behavior: 'smooth' });
      }
    }
  }, [selectedDate]);

  const handleDateClick = (dateObj) => {
    onDateSelect(dateObj.date);
  };

  return (
    <div className="mb-8">
      {/* Month header */}
      <h2 className="text-3xl font-bold mb-6">{monthName}</h2>
      
      {/* Scrollable calendar */}
      <div 
        ref={scrollContainerRef}
        className="flex space-x-4 overflow-x-auto scrollbar-hide pb-2"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {monthDates.map((dateObj) => (
          <div
            key={dateObj.day}
            onClick={() => handleDateClick(dateObj)}
            className={`
              flex-shrink-0 text-center cursor-pointer transition-all duration-200 min-w-[50px]
              ${dateObj.isSelected 
                ? 'bg-white text-black rounded-full p-3' 
                : 'p-3 hover:bg-white/10 rounded-full'
              }
            `}
          >
            <div className="text-xs font-medium opacity-70 mb-1">
              {dateObj.dayName}
            </div>
            <div className="text-lg font-semibold relative">
              {dateObj.day}
              {/* Activity indicator dot */}
              {dateObj.hasActivity && !dateObj.isSelected && (
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}