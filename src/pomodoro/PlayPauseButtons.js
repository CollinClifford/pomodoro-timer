import React from "react";

//component in for the Buttons that Start/Pause timer
const PlayPauseButtons = ({ playPause, isTimerRunning, classNames }) => {
  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        data-testid="play-pause"
        title="Start or pause timer"
        // starts and pauses timer when pressed
        onClick={playPause}
      >
        <span
          className={classNames({
            oi: true,
            "oi-media-play": !isTimerRunning,
            "oi-media-pause": isTimerRunning,
          })}
        />
      </button>
    </>
  );
};

export default PlayPauseButtons;
