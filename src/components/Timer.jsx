import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { finishQuiz } from "../store/quizSlice";

// we are creating a timer component that takes a starting time as a prop
const Timer = ({ initialMinutes = 1 }) => {
  // we are converting the minutes into total seconds to manage the countdown easily
  const [seconds, setSeconds] = useState(initialMinutes * 24);
  // we are checking if the quiz is already finished to know when to stop the clock
  const isFinished = useSelector((state) => state.quiz.isFinished);
  // we are initializing dispatch so we can trigger the auto-submit action when the time runs out
  const dispatch = useDispatch();

  useEffect(() => {
    // If the quiz is finished manually, timer is stopped and it will not auto-submit
    if (isFinished) return;

    // If the time runs out,it will auto-submit
    if (seconds <= 0) {
      dispatch(finishQuiz());
      return;
    }

    // we are setting up an interval to decrease the time by one second every 1 second
    const interval = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
    //this effect runs every time the seconds change or the quiz status updates
  }, [seconds, isFinished, dispatch]);

  // we are calculating the display minutes by dividing total seconds by 60
  const mins = Math.floor(seconds / 60);
  //we are getting the remaining seconds using the remainder operator
  const secs = seconds % 60;

  return (
    // the main container for the timer display with a dark theme and rounded corners
    <div className="bg-slate-900 text-white px-5 py-2 rounded-xl border border-slate-700 shadow-inner">
      {/* a small label to identify the timer for the user */}
      <span className="text-xs uppercase font-bold text-slate-400 mr-3">
        Timer
      </span>
      {/* the actual countdown display that turns red and pulses when time is running out */}
      <span
        className={`font-mono text-xl font-bold ${seconds < 15 ? "text-red-500 animate-pulse" : "text-emerald-400"}`}
      >
        {/*we are making sure that if seconds are less than 10, it adds a '0' so the timer always has two digits.*/}
        {mins}:{secs < 10 ? `0${secs}` : secs}
      </span>
    </div>
  );
};

export default Timer;
