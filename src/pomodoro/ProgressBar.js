import React from "react";

//Component that displays the progress bar
const ProgressBar = ({ session, isTimerRunning, aria }) => {
  //if the session is null it doesn't display.
  if (!session) {
    return null;
  } else {
    //displays progress bar
    return (
      <>
        <div className="row mb-2">
          <div className="col">
            <div className="progress" style={{ height: "20px" }}>
              <div
                className="progress-bar"
                role="progressbar"
                aria-valuemin="0"
                aria-valuemax="100"
                aria-valuenow={aria}
                style={{ width: `${aria}%` }}
              />
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default ProgressBar;
