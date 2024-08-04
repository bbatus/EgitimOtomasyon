// src/components/ClockComponent.js
import React, { useState, useEffect } from 'react';
import { getCurrentLesson } from '../helpers/scheduleHelpers'; // Importing scheduleHelpers.js
import '../assets/styles/ClockComponent.css'; // Importing ClockComponent CSS
import calendarIcon from '../assets/images/calendar.svg'; // Calendar icon
import timerIcon from '../assets/images/timer.svg'; // Timer icon

const ClockComponent = () => {
  const [time, setTime] = useState(new Date());
  const [currentLesson, setCurrentLesson] = useState(getCurrentLesson());

  useEffect(() => {
    const tick = () => {
      setTime(new Date());
      setCurrentLesson(getCurrentLesson());
    };

    const interval = setInterval(tick, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="clock-component">
      <div className="date-time">
        <img src={calendarIcon} alt="Calendar Icon" className="icon" />
        <span>{time.toLocaleDateString()}</span>
      </div>
      <div className="date-time">
        <img src={timerIcon} alt="Timer Icon" className="icon" />
        <span>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        <span> ({currentLesson.lesson})</span>
      </div>
    </div>
  );
};

export default ClockComponent;
