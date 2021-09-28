import React from "react";

//component to display PAUSE when timer is paused
const Pause = ({ session, isTimerRunning }) => {
  //if the session is null the Pause doesn't display
  if (!session) {
    return null;
  } else {
    //if the timer is running PAUSE doesn't display
    return (
      <>{!isTimerRunning ? <p style={{ fontSize: "20px" }}>PAUSED</p> : null}</>
    );
  }
};

export default Pause;
