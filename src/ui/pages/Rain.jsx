import React, { useState, useEffect, createContext   } from "react";
import html2canvas from "html2canvas";
import { Fonts, ColorPicker } from "../Modules"
import { Global, Uuid, isMobile } from "../Membrane";
import { Zoom, ToggleButton, Slider, Button } from '@mui/material';
import ClickAwayListener from '@mui/base/ClickAwayListener';


export const RaindropsRender = ({ drop }) => {
  return <div onClick={() => {
    document.getElementById(drop._id).style.display = "none";
  }} id={drop._id} className="drop-parent rain-drop">{drop.text}</div>;
};

export const Rain = (props) => {

  let globalState = Global({ pageName: "{Make it Rain}", description: "{Make it Rain} => Interactive graphical text creation tool. Text memory appears as you write, drawing patterns of letters while playing with the process of time layers." })

  const [Tdiv, setTdiv] = useState(<div>Make it rain</div>);
  const [colors, setColors] = useState([getRandomColor(), getRandomColor()])
  const [pluie, setPluie] = useState([]);
  const [crop, setCrop] = useState(true);
  const [reverse, setReverse] = useState(false);
  const [allcanvas, setallCanvas] = useState([]);

  useEffect(() => {
  }, [reverse])

  async function saveScreenshot() {

    setallCanvas([await html2canvas(
        crop? document.getElementById('rainfall'):  document.getElementById("rain"),
        {scale: 1, backgroundColor:null}
      ).then(canvas => canvas.toDataURL("image/png"))
    , ...allcanvas]);
  }

  const updateRain = (e, setreverse) => {
    if (setreverse) {
      setReverse(!reverse);
      // reverse = !reverse;
    }

    setPluie(pluie => {
      let pluieArray = pluie
      pluieArray.push({ _id: Uuid(), text: e.target.value });
      let rain = pluie.map((drop, i) => {
        return (
          <RaindropsRender key={drop._id} drop={drop} />
        )
      });

      if (reverse) {
        console.log("sa, ", reverse)
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

  function clickAwayMenu() {
    document.getElementById('rain-controls').classList.remove('disparition');
  }
  

  return (

    <div id="main-container" className="rain-container">
      <div id="main-header-wrapper">
      <div id="main-container-header">
        
        <div id="main-container-header-title">
          <h1>It's Raining Text!</h1>
        </div>

        <div id="main-container-header-instructions">
          <ul>This is an <b>interactive graphical text</b> creation tool. <br></br>
            Text memory appears as you write, drawing patterns of letters while playing with <b>the process of time layers</b>.<br></br>
          </ul></div>

        <div className="main-container-block">
          <ul><li><b>Start typing</b> a text with your keyboard or <b>{isMobile() ? "click on" : "hover over"} the main central box</b> to make the menu appear.
          </li><li>You can <b>remove</b> drops by clicking on text (bold on hover)
            </li><li>You can also <b>save your creation</b> by clicking on the save button on the top right corner.
            </li><li>The shuffle button trigger a <b>random set of colors</b>
            </li></ul></div>

        <div className="main-container-block" style={{ background: "rgb(113 0 255)" }}>
          <ul>Hint games: Try to draw a heart! (it's possible, is it? hint: you can use multiple whitespaces) </ul>

        </div>
        </div>
      </div>

   
          
          <ClickAwayListener onClickAway={clickAwayMenu}>
          <div className="disparition" id="rain-controls" onClick={(e) => {
          }}>
            <ColorPicker values={colors} />
            <input id="rain-input-mkir" className="rain-input" autoComplete="off" type="text" placeholder="Make it rain" onChange={updateRain} />
           
            <div className="rain-buttons-align">
              <Button variant="text" className="rain-button" onClick={() => {
                let el = document.getElementById("rainfall");
                el.style.alignItems = 'flex-start';
                if (el.childElementCount <= 1) { console.error("start typing first!"); }
              }}>left</Button>
              <Button variant="text" className="rain-button" onClick={() => {
                let el = document.getElementById("rainfall")
                el.style.alignItems = 'center'

              }}>center</Button>
              <Button variant="text" className="rain-button" onClick={() => {
                let el = document.getElementById("rainfall")
                el.style.alignItems = 'flex-end'

              }}>right</Button>
            </div>

            <div className="rain-buttons-align">
              <Button variant="text" className="rain-button" onClick={(e) => {
                updateRain(e, true)
              }}>reverse</Button>

              <Button variant="text" className="rain-button" onClick={() => {
                  setPluie([])
                  setTdiv(<div>Make it rain</div>);
                }}>clear</Button>
            </div>

            <Fonts saveScreenshot={saveScreenshot} crop={crop} setCrop={setCrop}/>
          </div>
          </ClickAwayListener>

          <div id="rain">

          <div id="rainfall" style={{ backgroundColor: colors[0], color: colors[1], fontWeight: 500, fontSize: 35}}  >
            {Tdiv}
          </div>


        </div>

        <div id="rain-library">
          <div className="rain-frontispice">RAIN-LIBRARY</div>
          {allcanvas.map((canvas, i) => {
            return <div key={i} className={"rain-book"}>
              <a href={canvas} download={`rain-${new Date().getDate()}-${new Date().getHours()}-${new Date().getMinutes()}-${allcanvas.length}`}>
                <img key={`img-${i}`} src={canvas} />
                </a>
                </div>
          })
          }
          {allcanvas.length>=1? null: "Start creating and saving your rains!"}
        </div>

      </div>

  );
};
