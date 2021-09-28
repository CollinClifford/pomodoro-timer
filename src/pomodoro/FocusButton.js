import React from "react";

//component for Focus Button
const FocusButton = ({
  session,
  minutesToDuration,
  focusDuration,
  decreaseFocusDurationByOneMinute,
  increaseFocusDurationByFiveMinutes,
}) => {
  return (
    <div className="col">
      <div className="input-group input-group-lg mb-2">
        <span className="input-group-text" data-testid="duration-focus">
          {/* displays Focus Duration and the amount of time, displayed in minutes, that the user chooses */}
          Focus Duration: {minutesToDuration(focusDuration)}
        </span>
        <div className="input-group-append">
          <button
            type="button"
            className="btn btn-secondary"
            data-testid="decrease-focus"
            // decreases the timer by one minute or disables the button is the session is going.
            onClick={decreaseFocusDurationByOneMinute}
            disabled={session}
          >
            <span className="oi oi-minus" />
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            data-testid="increase-focus"
            // increases timer by five minutes or disables the burron when in session
            onClick={increaseFocusDurationByFiveMinutes}
            disabled={session}
          >
            <span className="oi oi-plus" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FocusButton;
