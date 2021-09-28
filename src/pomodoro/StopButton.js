import React from "react";

//component for Stop Button
const StopButton = ({ session, stopButton }) => {
  return (
    <>
      <button
        //disables if not in a session
        disabled={!session}
        type="button"
        className="btn btn-secondary"
        data-testid="stop"
        title="Stop the session"
        //stops session
        onClick={stopButton}
      >
        <span className="oi oi-media-stop" />
      </button>
    </>
  );
};

export default StopButton;
