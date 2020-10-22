import React, { useState } from "react";
import bulbOnImage from "./assets/on.jpeg";
import bulbOffImage from'./assets/off.jpg'
import bulbBrokenImage from './assets/broken.jpg'

const App = () => {
  const [bulb, setBulb] = useState("bulb");

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div style={{ flexDirection: "column" }}>
        <div>
          {bulb === "bulb" && (
            <img
              alt="Light Bulb"
              src={bulbOffImage}
              width="300px"
              height="400px"
            />
          )}

          {bulb === "on" && (
            <img
              alt="Glow Bulb"
              src={bulbOnImage}
              width="300px"
              height="400px"
            />
          )}

          {bulb === "off" && (
            <img
              alt="Off Bulb"
              src={bulbOffImage}
              width="300px"
              height="400px"
            />
          )}

          {bulb === "break" && (
            <img
              alt="Break Bulb"
              src={bulbBrokenImage}
              width="260px"
              height="400px"
            />
          )}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div class="btn-group" role="group" aria-label="Basic example">
            <button
              type="button"
              class="btn btn-secondary"
              onClick={() => setBulb("on")}
            >
              ON
            </button>
            <button
              type="button"
              class="btn btn-secondary"
              onClick={() => setBulb("off")}
            >
              OFF
            </button>
            <button
              type="button"
              class="btn btn-secondary"
              onClick={() => setBulb("break")}
            >
              BREAK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
