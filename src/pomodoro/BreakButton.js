import React from "react";

//component for the Break Button
function BreakButton({
  session,
  minutesToDuration,
  breakDuration,
  decreaseBreakDurationByOneMinute,
  increaseBreakDurationByOneMinute,
}) {
  return (
    <div className="col">
      <div className="float-right">
        <div className="input-group input-group-lg mb-2">
          <span className="input-group-text" data-testid="duration-break">
            {/* displays the Break Duration and the amount, in minutes, the user chooses */}
            Break Duration: {minutesToDuration(breakDuration)}
          </span>
          <div className="input-group-append">
            <button
              type="button"
              className="btn btn-secondary"
              data-testid="decrease-break"
              // decreases the break timer by one minute or disables it when in session
              onClick={decreaseBreakDurationByOneMinute}
              disabled={session}
            >
              <span className="oi oi-minus" />
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              data-testid="increase-break"
              // increases the break timer by one minute or disables it when in session
              onClick={increaseBreakDurationByOneMinute}
              disabled={session}
            >
              <span className="oi oi-plus" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BreakButton;
