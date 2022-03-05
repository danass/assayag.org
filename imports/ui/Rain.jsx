import React, { useState, useEffect } from "react";
import { TaskRender } from "./TaskRender";
import { Uuid } from "./Uuid";
import { Tooltip } from "./Tooltip";
import { ColorPicker } from "./ColorPicker";
import { isMobile } from "./Menu";
import { Fonts } from "./Modules"


reverse = false
export const Rain = () => {
  const [Tdiv, setTdiv] = useState(<div>Make it rain</div>);
  const [colors, setColors] = useState([getRandomColor(), getRandomColor() ])
  const [pluie, setPluie] = useState([]);


const updateRain = (e, setreverse) => {
if(setreverse) {
  reverse = !reverse;
}



setPluie(pluie => {
  let pluieArray = pluie
  pluieArray.push({ _id: Uuid(), text: e.target.value });
  let rain = pluie.map((drop) => <TaskRender key={drop._id} task={drop} />);
  if (reverse) {
    rain = rain.reverse();
  }
  setTdiv(rain)
  return pluieArray;
})

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
    <div className="rain">
     
      <Tooltip
        action="createimg"
        clickforsave={true}
        caption="Screenshot"
        atselector="rain-library"
      >
        <div id="rainfall" className="rainfall" style={{backgroundColor:  colors[0],  color: colors[1] } 
        }>
          {Tdiv}
        </div>
      </Tooltip>
      {console.log(document.getElementById('font-selector')? document.getElementById('font-selector').value: "walou")}
      <div id="rain-controls" style={(isMobile()? ({ margin: '0px' }): {}) }>
      <ColorPicker values={colors} />
      <input className="rain-input"
        type="text"
        placeholder="Make it rain"
        onChange={updateRain}
      />
      
      <button className="rain-button" onClick={() => {
        setPluie([])
        setTdiv(<div>Make it rain</div>);

      }}>x</button>
      <button className="rain-button" onClick={e=> updateRain(e, true)}>reverse</button>
      <div><Fonts /></div>
      





      
      </div>

      
      <div id="rain-library"></div>
      
    </div>
  );
};
