import React, { useState, useEffect } from "react";
import { Tooltip } from "../Tooltip";
import { Fonts, ColorPicker } from "../Modules"
import { Global, Uuid, isMobile } from "../Membrane";
import { Backdrop } from '@mui/material';


export const RaindropsRender = ({ drop }) => {
  return <div onClick={() => { 
        document.getElementById(drop._id).style.display = "none";
  }} id={drop._id} className="drop-parent rain-drop">{drop.text}</div>;
};

reverse = true
export const Rain = () => {

  let globalState = Global({pageName: "{Make it Rain}", description: "{Make it Rain} => Interactive graphical text creation tool. Text memory appears as you write, drawing patterns of letters while playing with the process of time layers." })

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
    // detect if drop.text contain a return carriage
    // if so, split it into multiple drops
    // if not, just return the drop
    //

    return (
      
      <RaindropsRender key={drop._id} drop={drop} />
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

    <div id="main-container">
        <div id="main-container-header">
        <div id="main-container-header-title">
        <h1>It's Raining Text!</h1>
        </div>
                
        <div id="main-container-header-instructions">
          <ul>This is an <b>interactive graphical text</b> creation tool. <br></br>
          Text memory appears as you write, drawing patterns of letters while playing with <b>the process of time layers</b>.<br></br>
          </ul></div>
          
        <div className="main-container-block">
          <ul><li><b>Start typing</b> a text with your keyboard or <b>{isMobile()?"click on":"hover over"} the main central box</b> to make the menu appear.
          </li><li>You can <b>remove</b> drops by clicking on text (bold on hover)
          </li><li>You can also <b>save your creation</b> by clicking on the save button on the top right corner.
          </li><li>The shuffle button trigger a <b>random set of colors</b>
          </li></ul></div>

          <div className="main-container-block" style={{background: "rgb(113 0 255)"}}>
          <ul>Hint games: Try to draw a heart! (it's possible, is it? hint: you can use multiple whitespaces) </ul>

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
        onChange={updateRain}
      />
      

      <div className="rain-buttons-align">
            <button className="rain-button" onClick={() => { 
          let el =  document.getElementById("rainfall") 
          if(el.childElementCount <= 1) {
            console.error("start typing first!") 
          }
          el.style.alignItems = 'flex-start'
          document.getElementById('rain-input-mkir').focus()
          }}>left</button>
                  <button className="rain-button" onClick={() => { 
          let el =  document.getElementById("rainfall") 
          el.style.alignItems = 'center'
          document.getElementById('rain-input-mkir').focus()
          }}>center</button>
                  <button className="rain-button" onClick={() => { 
          let el =  document.getElementById("rainfall") 
          el.style.alignItems = 'flex-end'
          document.getElementById('rain-input-mkir').focus()
          }}>right</button>
      </div>

      <button className="rain-button" onClick={(e) => {
        updateRain(e, true)
        document.getElementById('rain-input-mkir').focus()
      }}>reverse</button>


<button className="rain-button" onClick={() => {
        setPluie([])
        setTdiv(<div>Make it rain</div>);
        document.getElementById('rain-input-mkir').focus()
      }}>clear</button>



      <div><Fonts /></div>
      </div>
        <div id="rainfall" className="rainfall" style={{backgroundColor:  colors[0],  color: colors[1] } 
        }>
          {Tdiv}
        </div>
        
      </Tooltip>

 

      <div id="rain-library"></div>

    </div>
    </div>
  );
};
