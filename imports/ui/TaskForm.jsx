import React, { useState, useEffect } from "react";
import { TaskRender } from "./TaskRender";
import { Uuid } from "./Uuid";
import { Tooltip } from "./Tooltip";
import { ColorPicker } from "./ColorPicker";

pluie = [];

export const TaskForm = () => {
  const [text, setText] = useState("");
  const [Tdiv, setTdiv] = useState(<div>Make it rain</div>);
  const [colors, setColors] = useState([getRandomColor(), getRandomColor() ])

const updateRain = (e) => {
pluie.push({ _id: Uuid(), text: e.target.value });
rain = pluie.map((drop) => <TaskRender key={drop._id} task={drop} />);
setTdiv(rain)

}

  function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }


  
  return (
    <div>
      <ColorPicker values={colors} />
      <Tooltip
        action="createimg"
        clickforsave={true}
        caption="Screenshot"
        atselector="rain-library"
      >
        <div id="rainfall" className="rainfall" style={{backgroundColor:  colors[0],  color: colors[1]}}>
          {Tdiv}
        </div>
      </Tooltip>

      <input className="rain-input"
        type="text"
        placeholder="Make it rain"
        onChange={updateRain}

      />
      
      <button className="rain-button" onClick={() => {
        setText("");
        pluie = [];
        rain = [];
        setTdiv(<div>Make it rain</div>);
      }}>x</button>


      
      <div id="rain-library"></div>
    </div>
  );
};
