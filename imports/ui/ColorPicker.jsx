import React, { useState } from "react";

export const ColorPicker = (props) => {
    const [color, setColor] = useState([props.values[0], props.values[1] ]);

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
