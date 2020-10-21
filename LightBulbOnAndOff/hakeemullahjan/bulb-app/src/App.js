import React, { useState } from "react";

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
              src="https://www.industrytap.com/wp-content/uploads/2016/02/incandescent-e1456179151174.jpg"
              width="300px"
              height="400px"
            />
          )}

          {bulb === "on" && (
            <img
              alt="Glow Bulb"
              src="https://toppng.com/uploads/preview/light-bulb-on-off-png-11553940186lbyqngqg1y.png"
              width="400px"
              height="400px"
            />
          )}

          {bulb === "off" && (
            <img
              alt="Off Bulb"
              src="https://www.industrytap.com/wp-content/uploads/2016/02/incandescent-e1456179151174.jpg"
              width="300px"
              height="400px"
            />
          )}

          {bulb === "break" && (
            <img
              alt="Break Bulb"
              src="https://media.istockphoto.com/vectors/brokendown-light-bulb-vector-id164446736"
              width="300px"
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
            <button type="button" class="btn btn-secondary" onClick={()=>setBulb("on")}>
              ON
            </button>
            <button type="button" class="btn btn-secondary" onClick={()=>setBulb("off")}>
              OFF
            </button>
            <button type="button" class="btn btn-secondary" onClick={()=>setBulb("break")}>
              BREAK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
