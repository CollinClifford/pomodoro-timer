import React from "react";
import { secondsToDuration } from "../utils/duration";

// component to display the Time Elapsed and Time Remaining with Timer is started.
const ProgressTimeDisplay = ({ session, breakTimeRemaining }) => {
  // doesn't return if the timer isn't started
  if (!session) {
    return null;
  } else {
    return (
      <>
        <div className="row mb-2">
          <div className="col">
            {/* displays the session label and the time chosen */}
            <h2 data-testid="session-title">
              {session?.label} for {breakTimeRemaining} minutes
            </h2>
            {/* displays count down */}
            <p className="lead" data-testid="session-sub-title">
              {session
                ? secondsToDuration(session?.timeRemaining)
                : breakTimeRemaining}{" "}
              remaining
            </p>
          </div>
        </div>
      </>
    );
  }
};

export default ProgressTimeDisplay;
