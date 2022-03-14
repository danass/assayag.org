import React, { useState, useEffect } from "react";
import { Tooltip } from "./Tooltip";
import { isMobile } from "./Menu";
import { Fonts, ColorPicker } from "./Modules"
import { Global, Uuid } from './Modules'

export const RaindropsRender = ({ drop }) => {
  return <div>{drop.text}</div>;
};

reverse = true
export const Rain = () => {

  let globalState = Global({pageName: "Rain Text!"})

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
  
  let rain = pluie.map((drop, i) => {
    return (
      <div key={drop._id} id={drop._id} className="drop-parent" onClick={(e) => {
        // filter out the clicked drop
        let newPluie = rain.filter((drop, i) => {
          if(drop.key === e.target.parentNode.id) {
            // remove the drop from the array
            delete rain[i]
          }
          return drop.key !== e.target.parentNode.id
        });
        
        setTdiv(newPluie)
        setPluie(newPluie)
      }}>
     
    <RaindropsRender key={drop._id} drop={drop} 

    /></div>
    )
  });

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

    <div>
        <div id="main-container-header">
        <div id="main-container-header-title">
        It's Raining text!
        </div>
                
        <div id="main-container-header-instructions">
          This is an <b>interactive graphical text</b> creation tool. <br></br>
          Text appears as you type and register the <b>process of time</b>.<br></br>
        </div>
        <div className="main-container-block">
          <b>Start typing</b> a text with your keyboard or <b>click on the central box</b> to make the menu appear.
          </div>
        </div>

        <div className="rain">
     
      <Tooltip
        action="createimg"
        clickforsave={true}
        caption="Screenshot"
        atselector="rain-library"
      >
      <div id="rain-controls" style={(isMobile()? ({ margin: '0px' }): {}) }>
      <ColorPicker values={colors} />
      <input id="rain-input-mkir" className="rain-input"
        type="text"
        placeholder="Make it rain" 
        onChange={updateRain} autoFocus
      />
      
      <button className="rain-button" onClick={() => {
        setPluie([])
        setTdiv(<div>Make it rain</div>);
      }}>clear</button>

      <div className="rain-buttons-align">
            <button className="rain-button" onClick={() => { 
          let el =  document.getElementById("rainfall") 
          if(el.childElementCount <= 1) {
            console.error("start typing first!") 

          }
          el.style.alignItems = 'flex-start'
          }}>left</button>
                  <button className="rain-button" onClick={() => { 
          let el =  document.getElementById("rainfall") 
          el.style.alignItems = 'center'
          }}>center</button>
                  <button className="rain-button" onClick={() => { 
          let el =  document.getElementById("rainfall") 
          el.style.alignItems = 'flex-end'
          }}>right</button>
      </div>

      <button className="rain-button" onClick={e=> updateRain(e, true)}>reverse</button>
      <div><Fonts /></div>
      </div>

        <div id="rainfall" className="rainfall" style={{backgroundColor:  colors[0],  color: colors[1] } 
        }>
          {Tdiv}
        </div>
        
      </Tooltip>

 

      <div id="rain-library"></div>

      
      <div id="main-container-footer"></div>
      
    </div>
    </div>
  );
};
