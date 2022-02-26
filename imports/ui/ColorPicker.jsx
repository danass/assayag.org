import React, { useState } from "react";

export const ColorPicker = (props) => {
    const [color, setColor] = useState([props.values[0], props.values[1] ]);

    function getRandomColor() {
      var letters = '0123456789ABCDEF';
      var color = '#';
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }
  
    
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
      <input type="reset" value="shuffle" onClick={() => {
        let colors = [getRandomColor(), getRandomColor()];
        document.getElementById("rainfall").style.backgroundColor = colors[0];
        document.getElementById("rainfall").style.color = colors[1];
        setColor(colors);
      }} />

    </div>
  );
};
