'use client';

export default function ActivityChart({ weekData, selectedDate }) {
  // Find max minutes for scaling
  const maxMinutes = Math.max(...weekData.map(day => day.totalMinutes), 1);
  
  // Convert minutes to readable format
  const formatTime = (minutes) => {
    if (minutes < 60) {
      return `${minutes}m`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    if (remainingMinutes === 0) {
      return `${hours}h`;
    }
    return `${hours}h ${remainingMinutes}m`;
  };

  const totalWeekMinutes = weekData.reduce((sum, day) => sum + day.totalMinutes, 0);

  return (
    <div className="bg-gray-800/50 rounded-2xl p-6 backdrop-blur-sm">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-medium text-gray-300">daily</h3>
          <h4 className="text-lg font-medium text-gray-300">time watch</h4>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold">{formatTime(totalWeekMinutes)}</div>
          <div className="text-sm text-gray-400">this week</div>
        </div>
      </div>

      {/* Chart */}
      <div className="flex items-end justify-between space-x-2 h-32 mb-4">
        {weekData.map((day, index) => {
          const isSelected = day.date.toDateString() === selectedDate.toDateString();
          const heightPercentage = maxMinutes > 0 ? (day.totalMinutes / maxMinutes) * 100 : 0;
          
          return (
            <div key={index} className="flex flex-col items-center flex-1">
              {/* Bar */}
              <div className="w-full flex flex-col justify-end h-24 relative">
                <div
                  className={`
                    w-full rounded-full transition-all duration-300
                    ${isSelected 
                      ? 'bg-white' 
                      : day.totalMinutes > 0 
                        ? 'bg-gray-300' 
                        : 'bg-gray-600'
                    }
                  `}
                  style={{ 
                    height: `${Math.max(heightPercentage, 4)}%`,
                    minHeight: '8px'
                  }}
                ></div>
              </div>
              
              {/* Day label */}
              <div className="mt-2 text-xs text-gray-400 text-center">
                {day.date.getDate()}
              </div>
            </div>
          );
        })}
      </div>

      {/* Week range */}
      <div className="flex justify-between mt-4 text-xs text-gray-500">
        <span>
          {weekData[0]?.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
        </span>
        <span>
          {weekData[6]?.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
        </span>
      </div>

      {/* Selected day info */}
      {weekData.find(day => day.date.toDateString() === selectedDate.toDateString())?.totalMinutes > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-700/50">
          <div className="text-sm text-gray-400 mb-2">
            Selected day: {selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </div>
          <div className="text-lg font-semibold">
            {formatTime(weekData.find(day => day.date.toDateString() === selectedDate.toDateString())?.totalMinutes || 0)}
          </div>
        </div>
      )}
    </div>
  );
}