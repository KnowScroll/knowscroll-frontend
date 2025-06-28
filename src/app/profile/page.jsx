'use client';

import { useState } from 'react';
import { Home, Bell } from 'lucide-react';
import ProfileCalendar from '../components/profile/ProfileCalendar';
import ActivityStats from '../components/profile/ActivityStats';
import ActivityChart from '../components/profile/ActivityChart';
import { generateDummyData, getWeekAroundDate, getGreeting } from '../utils/profileUtils';
import { LearningUniverse } from '../components/sections';
import ExploreSection from '../components/sections/ExploreSection';

export default function ProfilePage() {
  // Generate dummy data for the last 30 days
  const activityData = generateDummyData();

  // Current selected date (default to today)
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Get selected day's data
  const selectedDateStr = selectedDate.toISOString().split('T')[0];
  const selectedDayData = activityData[selectedDateStr] || { totalMinutes: 0, activities: [] };

  // Get 7 days centered around selected date
  const weekData = getWeekAroundDate(selectedDate, activityData);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const learningCategories = [
    'Indian History',
    'Fashion History',
    'Artificial Intelligence',
    'Coding'
  ];

  // Handle when user clicks on a learning topic
  const handleTopicClick = (topic, index) => {
    console.log(`Clicked on: ${topic} at index: ${index}`);
    // You can navigate to topic page, show modal, etc.
    // Example: router.push(`/learn/${topic.toLowerCase().replace(' ', '-')}`);
  };

  return (
    <div className="min-h-screen text-white p-4">
      {/* Header */}
      <div className="fixed top-0 left-0 p-3 right-0 w-full flex items-center justify-between  z-50 bg-transparent backdrop-blur-sm border-b border-white/10">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-white rounded-full"></div>
          <div>
            <p className="text-gray-300 text-sm">{getGreeting()}</p>
            <h1 className="text-xl font-semibold">Owie</h1>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Friends toggle */}
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1">
              <div className="w-6 h-6 bg-gray-400 rounded-full"></div>
              <div className="w-6 h-6 bg-gray-500 rounded-full"></div>
              <div className="w-6 h-6 bg-gray-600 rounded-full"></div>
            </div>
            <span className="text-sm text-gray-300">friends</span>
          </div>

          <Home className="w-6 h-6 text-white" />
          <Bell className="w-6 h-6 text-white" />
        </div>
      </div>

      {/* Calendar */}
      <ProfileCalendar
        selectedDate={selectedDate}
        onDateSelect={handleDateSelect}
        activityData={activityData}
      />

      {/* Activity Stats */}
      <ActivityStats selectedDayData={selectedDayData} />

      {/* Activity Chart */}
      <ActivityChart weekData={weekData} selectedDate={selectedDate} />

      <div className='w-full'>
        <LearningUniverse
          categories={learningCategories}
          onTopicClick={handleTopicClick}
          className="min-h-screen" // Optional additional styling
        />
      </div>
      <ExploreSection heading="Saved" />
    </div>
  );
}