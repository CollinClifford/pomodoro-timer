import React, { useState } from "react";
import classNames from "../utils/class-names";
import useInterval from "../utils/useInterval";
import { minutesToDuration } from "../utils/duration";
import BreakButton from "./BreakButton";
import FocusButton from "./FocusButton";
import ProgressBar from "./ProgressBar";
import PlayPauseButtons from "./PlayPauseButtons";
import ProgressTimeDisplay from "./ProgressTimeDisplay";
import Pause from "./Pause";
import StopButton from "./StopButton";

// These functions are defined outside of the component to insure they do not have access to state
// and are, therefore more likely to be pure.

/**
 * Update the session state with new state after each tick of the interval.
 * @param prevState
 *  the previous session state
 * @returns
 *  new session state with timing information updated.
 */
function nextTick(prevState) {
  const timeRemaining = Math.max(0, prevState.timeRemaining - 1);
  return {
    ...prevState,
    timeRemaining,
  };
}

/**
 * Higher order function that returns a function to update the session state with the next session type upon timeout.
 * @param focusDuration
 *    the current focus duration
 * @param breakDuration
 *    the current break duration
 * @returns
 *  function to update the session state.
 */
function nextSession(focusDuration, breakDuration) {
  return (currentSession) => {
    if (currentSession.label === "Focusing") {
      return {
        label: "On Break",
        timeRemaining: breakDuration * 60,
      };
    }
    return {
      label: "Focusing",
      timeRemaining: focusDuration * 60,
    };
  };
}

function Pomodoro() {
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [session, setSession] = useState(null);
  const [focusDuration, setFocusDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);
  const [aria, setAria] = useState(0);

  // descreases the Focus Duration by One Minute
  const decreaseFocusDurationByOneMinute = () => {
    const newFocusDuration = focusDuration - 1;
    if (newFocusDuration < 5) {
      setFocusDuration(5);
    } else {
      setFocusDuration(focusDuration - 5);
    }
  };
  // increased the Focus Duration by Five Minutes
  const increaseFocusDurationByFiveMinutes = () => {
    const newFocusDuration = focusDuration + 5;
    if (newFocusDuration >= 60) {
      setFocusDuration(60);
    } else {
      setFocusDuration(focusDuration + 5);
    }
  };
  // decreases the Break Duration by One Minute
  const decreaseBreakDurationByOneMinute = () => {
    const newBreakDuration = breakDuration - 1;
    if (newBreakDuration <= 1) {
      setBreakDuration(1);
    } else {
      setBreakDuration(breakDuration - 1);
    }
  };
  // increases the Break Duration by One Minute
  const increaseBreakDurationByOneMinute = () => {
    const newBreakDuration = breakDuration + 1;
    if (newBreakDuration > 15) {
      setBreakDuration(15);
    } else {
      setBreakDuration(breakDuration + 1);
    }
  };

  useInterval(
    () => {
      if (session.timeRemaining === 0) {
        new Audio("https://bigsoundbank.com/UPLOAD/mp3/1482.mp3").play();
        return setSession(nextSession(focusDuration, breakDuration));
      }
      setSession(nextTick);
      const left = session.timeRemaining;
      // determines whether the session is Focussing or Breaking and adjusts the Timer Display to represent the time passing
      if (session.label === "Focusing") {
        setAria((100 * (focusDuration * 60 - left)) / (focusDuration * 60));
      } else {
        setAria((100 * (breakDuration * 60 - left)) / (breakDuration * 60));
      }
    },
    isTimerRunning ? 1000 : null
  );

  function playPause() {
    setIsTimerRunning((prevState) => {
      const nextState = !prevState;
      if (nextState) {
        setSession((prevStateSession) => {
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

  // simple Stop Button that clears session and Timer Running
  const stopButton = () => {
    setIsTimerRunning(false);
    setSession(null);
  };

  // for Time Display purposes
  const timeRemaining =
    session?.label === "Focusing"
      ? minutesToDuration(breakDuration)
      : minutesToDuration(focusDuration);

  // for Time Display purposes
  const breakTimeRemaining =
    session?.label === "Focusing"
      ? minutesToDuration(focusDuration)
      : minutesToDuration(breakDuration);

  return (
    <div className="pomodoro">
      <div className="row">
        {/* focus component */}
        <FocusButton
          minutesToDuration={minutesToDuration}
          focusDuration={focusDuration}
          decreaseFocusDurationByOneMinute={decreaseFocusDurationByOneMinute}
          increaseFocusDurationByFiveMinutes={
            increaseFocusDurationByFiveMinutes
          }
          session={session}
        />
        {/* break component */}
        <BreakButton
          minutesToDuration={minutesToDuration}
          breakDuration={breakDuration}
          decreaseBreakDurationByOneMinute={decreaseBreakDurationByOneMinute}
          increaseBreakDurationByOneMinute={increaseBreakDurationByOneMinute}
          session={session}
        />
      </div>
      <div className="row">
        <div className="col">
          <div
            className="btn-group btn-group-lg mb-2"
            role="group"
            aria-label="Timer controls"
          >
            {/* PlayPause Button */}
            <PlayPauseButtons
              playPause={playPause}
              isTimerRunning={isTimerRunning}
              classNames={classNames}
            />
            {/* Stop Button */}
            <StopButton session={session} stopButton={stopButton} />
          </div>
        </div>
      </div>
      {/* Progress Time Display component */}
      <div className="ProgressBar">
        <ProgressTimeDisplay
          session={session}
          breakTimeRemaining={breakTimeRemaining}
        />
        {/* Pause session display component */}
        <Pause session={session} isTimerRunning={isTimerRunning} />
        {/* Progress Bar Display component */}
        <ProgressBar
          session={session}
          isTimerRunning={isTimerRunning}
          timeRemaining={timeRemaining}
          aria={aria}
        />
      </div>
    </div>
  );
}

export default Pomodoro;
