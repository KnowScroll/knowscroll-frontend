'use client';

export default function ActivityStats({ selectedDayData }) {
  const { totalMinutes, activities } = selectedDayData;
  
  // Convert minutes to readable format
  const formatTime = (minutes) => {
    if (minutes < 60) {
      return `${minutes} mins`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    if (remainingMinutes === 0) {
      return `${hours}h`;
    }
    return `${hours}h ${remainingMinutes}m`;
  };

  // Get message based on time spent
  const getMessage = (minutes) => {
    const timeStr = formatTime(minutes);
    
    if (minutes === 0) {
      return {
        title: "NO ACTIVITY TODAY",
        subtitle: "Time to start learning!",
        timeDisplay: "0 mins"
      };
    } else if (minutes < 30) {
      return {
        title: "OH NO!",
        subtitle: `YOU ONLY SPENT ${timeStr.toUpperCase()} LEARNING`,
        message: "Please do learn more!",
        timeDisplay: timeStr
      };
    } else if (minutes < 60) {
      return {
        title: "GOOD START!",
        subtitle: `YOU SPENT ${timeStr.toUpperCase()} LEARNING TODAY`,
        message: "Keep it up!",
        timeDisplay: timeStr
      };
    } else if (minutes < 120) {
      return {
        title: "GREAT JOB!",
        subtitle: `YOU SPENT ${timeStr.toUpperCase()}`,
        message: "IN PRODUCTIVE LEARNING",
        timeDisplay: timeStr
      };
    } else {
      return {
        title: "CONGRATS!",
        subtitle: "YOU HAVE SPENT",
        message: `${timeStr.toUpperCase()} IN PRODUCTIVE SCROLLING`,
        timeDisplay: timeStr
      };
    }
  };

  const messageData = getMessage(totalMinutes);

  return (
    <div className="mb-8">
      <div className="text-left">
        <h1 className="text-4xl font-bold leading-tight mb-2">
          {messageData.title}
        </h1>
        <h2 className="text-4xl font-bold leading-tight">
          {messageData.subtitle}
        </h2>
        {messageData.message && (
          <h2 className="text-4xl font-bold leading-tight">
            {messageData.message}
          </h2>
        )}
      </div>

      {/* Activity breakdown */}
      {activities.length > 0 && (
        <div className="mt-8 space-y-2">
          <h3 className="text-lg font-semibold text-gray-300 mb-3">Today's Activities</h3>
          {activities.map((activity, index) => (
            <div key={index} className="flex justify-between items-center py-2 border-b border-gray-700/50">
              <span className="text-gray-300 capitalize">{activity.type}</span>
              <span className="text-white font-medium">{formatTime(activity.minutes)}</span>
            </div>
          ))}
          
          <div className="flex justify-between items-center py-2 pt-4 font-semibold text-lg">
            <span className="text-white">Total</span>
            <span className="text-white">{formatTime(totalMinutes)}</span>
          </div>
        </div>
      )}
    </div>
  );
}