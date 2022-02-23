import React, { useState } from "react";

export const ColorPicker = (e) => {

    const [color, setColor] = useState(["#7fffd4", "#000000"]);

  return (
    <div className="rain-pickers">
      <input
        type="color"
        value={color[0]}
        onChange={(e) => {
          document.getElementById("rainfall").style.backgroundColor = e.target.value;
            setColor([e.target.value, color[1]]);
        }}
      />
      <input
        type="color"
        value={color[1]}
        onChange={(e) => {
          document.getElementById("rainfall").style.color = e.target.value;
          setColor([color[0], e.target.value]);
        }}
      />
    </div>
  );
};
