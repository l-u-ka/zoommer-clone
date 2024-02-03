import React from "react";

function ShadowOverlay() {

  console.log("I AM BEING RENDERED")
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.6)", // Adjust the alpha value for transparency
        zIndex: 10, // Adjust the index to ensure it overlays other components
      }}
    >
    </div>
  );
};

export default ShadowOverlay;