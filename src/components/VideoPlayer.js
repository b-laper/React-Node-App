import React from "react";
import video from "../css/dog.mp4";
const VideoPlayer = () => {
  return (
    <div className="video-box">
      <video
        src={video}
        width="750px"
        height="500px"
        controls
        type="video/mp4"
        alt="video"
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;
