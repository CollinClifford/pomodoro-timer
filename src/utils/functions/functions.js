import React from "react";
import {useState} from "react"

 // Timer starts out paused
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  // The current session - null where there is no session running
  const [session, setSession] = useState(null);
  const [focusDuration, setFocusDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);
  const [progBar, setProgBar] = useState([]);
  // ToDo: Allow the user to adjust the focus and break duration.

  //functions to increase and decrease focusDuartion by 60 seconds
  const decreaseFocusDurationByOneMinute = () => {
    const newFocusDuration = focusDuration - 1;
    if (newFocusDuration < 5) {
      setFocusDuration(5);
    } else {
      setFocusDuration(focusDuration - 5);
    }
  };
  const increaseFocusDurationByOneMinute = () => {
    const newFocusDuration = focusDuration + 5;
    if (newFocusDuration >= 60) {
      setFocusDuration(60);
    } else {
      setFocusDuration(focusDuration + 5);
    }
  };

  //fucntions to increase and decrease breakDuration by 60 seconds
  const decreaseBreakDurationByOneMinute = () => {
    const newBreakDuration = breakDuration - 1;
    if (newBreakDuration <= 1) {
      setBreakDuration(1);
    } else {
      setBreakDuration(breakDuration - 1);
    }
  };

  const increaseBreakDurationByOneMinute = () => {
    const newBreakDuration = breakDuration + 1;
    if (newBreakDuration > 15) {
      setBreakDuration(15);
    } else {
      setBreakDuration(breakDuration + 1);
    }
  };

  //This is going to help the progress bar.  Right now it does it by creating an array and adding to the array each time the timechanges.
  const progressBar = (value) => {
    value = timeRemaining;
    setProgBar({ ...progBar, value });
  };

  /**
   *
   * Custom hook that invokes the callback function every second
   *
   * NOTE: You will not need to make changes to the callback function
   */
  useInterval(
    () => {
      if (session.timeRemaining === 0) {
        new Audio("https://bigsoundbank.com/UPLOAD/mp3/1482.mp3").play();
        return setSession(nextSession(focusDuration, breakDuration));
      }
      return setSession(nextTick);
    },
    isTimerRunning ? 1000 : null
  );

  /**
   * Called whenever the play/pause button is clicked.
   */
  function playPause() {
    setIsTimerRunning((prevState) => {
      const nextState = !prevState;
      if (nextState) {
        setSession((prevStateSession) => {
          // If the timer is starting and the previous session is null,
          // start a focusing session.
          if (prevStateSession === null) {
            return {
              label: "Focusing",
              timeRemaining: focusDuration * 60,
            };
          }
          return prevStateSession;
        });
      }
      return nextState;
    });
  }

  //stopButton returns everythign to initial state
  const stopButton = () => {
    setIsTimerRunning(false);
    setSession(null);
  };

  //not totally useless but short hand for the rest of the code
  const timeRemaining =
    session?.label === "Focusing"
      ? minutesToDuration(breakDuration)
      : minutesToDuration(focusDuration);

  //catch in case something is broken
  const breakTimeRemaining =
    session?.label === "Focusing"
      ? minutesToDuration(focusDuration)
      : minutesToDuration(breakDuration);