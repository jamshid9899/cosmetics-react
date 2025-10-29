import React from "react";
export default function Advertisement() {
  return (
    <div className="ads-cosmetics-frame">
      <video
        className={"ads-video"}
        autoPlay={true}
        loop
        muted
        playsInline
        data-video-media=""
      >
        <source type="video/mp4" src="/video/skincarebanner1.mp4"></source>
      </video>
    </div>
  );
}
