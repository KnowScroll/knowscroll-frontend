// Activity types
const ACTIVITY_TYPES = [
    'learning',
    'productive scrolling',
    'reading',
    'coding',
    'research'
  ];
  
  // Generate dummy data for the last 30 days
  export function generateDummyData() {
    const data = {};
    const today = new Date();
    
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      // 70% chance of having activity on any given day
      if (Math.random() > 0.3) {
        const activities = [];
        const numActivities = Math.floor(Math.random() * 3) + 1; // 1-3 activities per day
        
        // Generate random activities
        const shuffledTypes = [...ACTIVITY_TYPES].sort(() => Math.random() - 0.5);
        
        for (let j = 0; j < numActivities; j++) {
          const activityType = shuffledTypes[j];
          const minutes = Math.floor(Math.random() * 120) + 15; // 15-135 minutes
          
          activities.push({
            type: activityType,
            minutes: minutes
          });
        }
        
        const totalMinutes = activities.reduce((sum, activity) => sum + activity.minutes, 0);
        
        data[dateStr] = {
          totalMinutes,
          activities
        };
      } else {
        // No activity day
        data[dateStr] = {
          totalMinutes: 0,
          activities: []
        };
      }
    }
    
    return data;
  }
  
  // Get 7 days centered around a specific date
  export function getWeekAroundDate(centerDate, activityData) {
    const weekData = [];
    
    // Get 3 days before, the center date, and 3 days after
    for (let i = -3; i <= 3; i++) {
      const date = new Date(centerDate);
      date.setDate(centerDate.getDate() + i);
      const dateStr = date.toISOString().split('T')[0];
      
      const dayData = activityData[dateStr] || { totalMinutes: 0, activities: [] };
      
      weekData.push({
        date,
        totalMinutes: dayData.totalMinutes,
        activities: dayData.activities
      });
    }
    
    return weekData;
  }
  
  // Helper function to format date for display
  export function formatDate(date) {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  }
  
  // Helper function to get time of day greeting
  export function getGreeting() {
    const hour = new Date().getHours();
    
    if (hour < 12) {
      return 'Good morning';
    } else if (hour < 17) {
      return 'Good afternoon';
    } else {
      return 'Good evening';
    }
  }